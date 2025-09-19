import { Client } from 'pg';
const connectionString =
  process.env.NODE_ENV === 'dev' ? process.env.DATABASE_DEV_URL : process.env.DATABASE_URL;
console.log('URL de conexión a la base de datos:', connectionString);
const db = new Client({ connectionString });
await db.connect();
export default db;
