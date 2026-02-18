import { neon } from '@neondatabase/serverless';
import { createHash } from 'crypto';

const sql = neon(process.env.DATABASE_URL);

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) UNIQUE NOT NULL,
      phone VARCHAR(50),
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS quotations (
      id SERIAL PRIMARY KEY,
      client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
      product_name VARCHAR(300) NOT NULL,
      message TEXT,
      status VARCHAR(50) DEFAULT 'pendiente',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  const hash = hashPassword('catresclinicos123');
  await sql`DELETE FROM admin_users WHERE username = 'admin'`;
  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES ('admin', ${hash})
  `;

  console.log('Database setup complete! Admin user created.');
  console.log('Username: admin');
  console.log('Password: catresclinicos123');
}

main().catch(console.error);
