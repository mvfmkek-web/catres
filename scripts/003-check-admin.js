import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function check() {
  try {
    // Check tables exist
    const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("Tables:", tables.map(t => t.table_name));

    // Check admin user exists
    const admins = await sql`SELECT id, username, password_hash FROM admin_users`;
    console.log("Admin users:", admins.map(a => ({ id: a.id, username: a.username, hash_length: a.password_hash?.length })));
  } catch (error) {
    console.error("Error:", error);
  }
}

check();
