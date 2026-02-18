import { NextResponse } from 'next/server'
import { getClientSession } from '@/lib/auth'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
    const session = await getClientSession()
    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    const sql = getDb()
    const result = await sql`SELECT id, name, email FROM clients WHERE id = ${session.id}`

    if (result.length === 0) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ authenticated: true, client: result[0] })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
