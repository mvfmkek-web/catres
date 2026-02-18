import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { getClientSession } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getClientSession()
    if (!session) {
      return NextResponse.json({ error: 'Debes iniciar sesion para cotizar' }, { status: 401 })
    }

    const { productName, message } = await request.json()

    if (!productName) {
      return NextResponse.json({ error: 'Producto requerido' }, { status: 400 })
    }

    const sql = getDb()
    await sql`
      INSERT INTO quotations (client_id, product_name, message)
      VALUES (${session.id}, ${productName}, ${message || ''})
    `

    return NextResponse.json({ success: true, message: 'Cotizacion enviada correctamente' })
  } catch (error) {
    console.error('Quotation error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getClientSession()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const sql = getDb()
    const quotations = await sql`
      SELECT id, product_name, message, status, created_at
      FROM quotations
      WHERE client_id = ${session.id}
      ORDER BY created_at DESC
    `

    return NextResponse.json(quotations)
  } catch (error) {
    console.error('Get quotations error:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
