import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const sql = getDb()
    const clients = await sql`
      SELECT id, name, email, phone, created_at
      FROM clients
      ORDER BY created_at DESC
    `

    return NextResponse.json(clients)
  } catch (error) {
    console.error('Get clients error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
