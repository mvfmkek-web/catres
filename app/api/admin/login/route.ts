import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { createToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { compare } from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Credenciales requeridas' }, { status: 400 })
    }

    const sql = getDb()
    const result = await sql`
      SELECT id, username, password_hash FROM admin_users WHERE username = ${username}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
    }

    const admin = result[0]
    const isValid = await compare(password, admin.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
    }

    const token = await createToken({ id: admin.id, username: admin.username, role: 'admin' })

    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
