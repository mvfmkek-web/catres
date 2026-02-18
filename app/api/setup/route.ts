import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const sql = getDb()

    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) UNIQUE NOT NULL,
        phone VARCHAR(50),
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS quotations (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        product_name VARCHAR(300) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    const existing = await sql`SELECT id, password_hash FROM admin_users WHERE username = 'admin'`
    const needsReset = existing.length === 0 || !existing[0].password_hash.startsWith('$2')

    if (needsReset) {
      const passwordHash = await hash('catresclinicos123', 10)
      await sql`DELETE FROM admin_users WHERE username = 'admin'`
      await sql`INSERT INTO admin_users (username, password_hash) VALUES ('admin', ${passwordHash})`
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Error en setup' }, { status: 500 })
  }
}
