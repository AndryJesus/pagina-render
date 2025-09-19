// Manejar errores globales de la conexión para evitar que detengan el script
client.on('error', (err) => {
  console.error('Error global de cliente:', err);
});
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString:
    'postgresql://postgres.uyydpfujgtvnqhjtzbnr:Andry1721%$$@aws-0-us-east-2.pooler.supabase.com:5432/postgres',
});

client
  .connect()
  .then(() => {
    console.log('¡Conexión exitosa! Esperando 5 segundos antes de cerrar...');
    setTimeout(() => {
      client
        .end()
        .then(() => console.log('Conexión cerrada correctamente.'))
        .catch((err) => console.error('Error al cerrar la conexión:', err));
    }, 5000);
  })
  .catch((err) => {
    console.error('Error de conexión:', err);
  });
