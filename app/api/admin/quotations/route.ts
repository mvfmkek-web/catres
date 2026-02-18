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
    const quotations = await sql`
      SELECT q.id, q.product_name, q.message, q.status, q.created_at,
             c.name as client_name, c.email as client_email, c.phone as client_phone
      FROM quotations q
      JOIN clients c ON q.client_id = c.id
      ORDER BY q.created_at DESC
    `

    return NextResponse.json(quotations)
  } catch (error) {
    console.error('Get quotations error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id, status } = await request.json()

    const sql = getDb()
    await sql`
      UPDATE quotations SET status = ${status} WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update quotation error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
