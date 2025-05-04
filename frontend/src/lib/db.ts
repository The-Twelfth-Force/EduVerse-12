// lib/db.ts
import mysql, { Pool, PoolOptions, RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

// Define a type for your query results if you have specific structures
// This is a basic example, you might want more specific types based on your tables
type DbResult = RowDataPacket[] | OkPacket | RowDataPacket[][] | OkPacket[] | ResultSetHeader;

const poolOptions: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
};

let pool: Pool;

const getPool = (): Pool => {
  if (!pool) {
    pool = mysql.createPool(poolOptions);
  }
  return pool;
};

export async function query<T extends DbResult>({ query, values = [] }: { query: string; values?: (string | number | boolean | null)[] }): Promise<T> {
  const connection = await getPool().getConnection();
  try {
    const [results] = await connection.execute(query, values);
    return results as T;
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

// Optional: Close the pool when the process exits (useful for development)
// In a serverless environment, this might not be strictly necessary as the process can be short-lived,
// but it's good practice for local development or other Node.js environments.
process.on('SIGINT', async () => {
  if (pool) {
    await pool.end();
    console.log('Database pool closed.');
  }
  process.exit();
});