import { NextResponse } from 'next/server'
import { compare, hash } from 'bcryptjs'
import { getDb } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'La nueva contrasena debe tener al menos 6 caracteres' }, { status: 400 })
    }

    const sql = getDb()
    const result = await sql`
      SELECT password_hash FROM admin_users WHERE id = ${session.id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const isValid = await compare(currentPassword, result[0].password_hash)
    if (!isValid) {
      return NextResponse.json({ error: 'Contrasena actual incorrecta' }, { status: 401 })
    }

    const newHash = await hash(newPassword, 10)
    await sql`
      UPDATE admin_users SET password_hash = ${newHash} WHERE id = ${session.id}
    `

    return NextResponse.json({ success: true, message: 'Contrasena actualizada correctamente' })
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
