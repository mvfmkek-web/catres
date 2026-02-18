import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { getDb } from '@/lib/db'
import { createToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contrasena son requeridos' }, { status: 400 })
    }

    const sql = getDb()
    const result = await sql`
      SELECT id, name, email, password_hash FROM clients WHERE email = ${email}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
    }

    const client = result[0]
    const isValid = await compare(password, client.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
    }

    const token = await createToken({ id: client.id, username: client.email, role: 'client' })

    const cookieStore = await cookies()
    cookieStore.set('client-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json({ success: true, client: { id: client.id, name: client.name, email: client.email } })
  } catch (error) {
    console.error('Client login error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
