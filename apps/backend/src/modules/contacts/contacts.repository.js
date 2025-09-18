import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async (payload) => {
  const response = await db.query(
    `
    SELECT * FROM contacts 
    WHERE user_id = $1`,
    [payload.userId],
  );
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO contacts (name, phone, user_id)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.name, payload.phone, payload.userId],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM contacts
    WHERE id = $1 AND user_id = $2  RETURNING *
  `,
    [payload.contactId, payload.userId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto fue no encontrado');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE contacts
    SET name = $1, phone = $2
    WHERE id = $3 AND user_id = $4
    RETURNING *
  `,
    [payload.name, payload.phone, id, payload.userId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El contacto fue no encontrado');
  }
  return response.rows[0];
};

const contactsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default contactsRepository;
