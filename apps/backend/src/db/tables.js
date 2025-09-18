import db from './index.js';

const createContactsTable = async () => {
  await db.query(`
    CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);
  console.log('Tabla de contactos creada');
};

const createUsersTable = async () => {
  await db.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    verify_email BOOLEAN DEFAULT false
    )
  `);
  console.log('Tabla de usuarios creada');
};

const deleteAllTables = async () => {
  await db.query('DROP TABLE IF EXISTS contacts');
  await db.query('DROP TABLE IF EXISTS users');
};

const createTables = async () => {
  await deleteAllTables();
  await createUsersTable();
  await createContactsTable();
  console.log('Tablas creadas correctamente');
  process.exit();
};

createTables();
