import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { getDb } from '@/lib/db'
import { createToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Nombre, email y contrasena son requeridos' }, { status: 400 })
    }

    const sql = getDb()

    const existing = await sql`SELECT id FROM clients WHERE email = ${email}`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Este email ya esta registrado' }, { status: 409 })
    }

    const passwordHash = await hash(password, 10)

    const result = await sql`
      INSERT INTO clients (name, email, phone, password_hash)
      VALUES (${name}, ${email}, ${phone || null}, ${passwordHash})
      RETURNING id, name, email
    `

    const client = result[0]
    const token = await createToken({ id: client.id, username: client.email, role: 'client' })

    const cookieStore = await cookies()
    cookieStore.set('client-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json({ success: true, client })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
