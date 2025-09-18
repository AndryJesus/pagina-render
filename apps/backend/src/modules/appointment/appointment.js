import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../../db/index.js'; // Ruta correcta // 👈 Asegúrate de tener esta importación

const router = express.Router(); // 👈 Define router aquí

// Middleware de autenticación
const authenticateBot = (req, res, next) => {
  // 👈 Define authenticateBot aquí
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'hola123');

    if (decoded.service !== 'whatsapp-bot') {
      return res.status(403).json({ error: 'Token no válido para este servicio' });
    }

    req.botData = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Endpoint para crear citas desde WhatsApp
router.post('/whatsapp', authenticateBot, async (req, res) => {
  try {
    const { patient_name, patient_phone, service_type, appointment_date, service_price } = req.body;

    // Validaciones básicas
    if (!patient_name || !patient_phone || !service_type) {
      return res.status(400).json({
        error: 'Nombre, teléfono y servicio son requeridos',
      });
    }

    console.log('📋 Cita recibida desde WhatsApp:', {
      patient_name,
      patient_phone,
      service_type,
      appointment_date,
      service_price,
    });

    // Insertar en la base de datos PostgreSQL
    const result = await db.query(
      `INSERT INTO appointments 
       (patient_name, patient_phone, service_type, appointment_date, service_price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [patient_name, patient_phone, service_type, appointment_date, service_price],
    );

    console.log('💾 Cita guardada en PostgreSQL:', result.rows[0]);

    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating appointment:', error);

    // Manejar errores específicos de la base de datos
    if (error.code === '23505') {
      // Violación de unique constraint
      return res.status(400).json({
        error: 'Ya existe una cita con estos datos',
      });
    }

    if (error.code === '23502') {
      // Violación de NOT NULL
      return res.status(400).json({
        error: 'Datos incompletos para crear la cita',
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor al crear la cita',
    });
  }
});

// Endpoint para obtener todas las citas (útil para el frontend)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM appointments 
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
      count: result.rowCount,
    });
  } catch (error) {
    console.error('Error getting appointments:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
});

// Endpoint para obtener citas por teléfono
router.get('/phone/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const result = await db.query(
      `SELECT * FROM appointments 
       WHERE patient_phone = $1 
       ORDER BY created_at DESC`,
      [phone],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error getting appointments by phone:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
});

// Exportar el router
export { router as appointmentsRouter };
