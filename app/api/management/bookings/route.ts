import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const body = await req.json()

  const { data, error } = await supabase.from('bookings').insert(body).select().single()
  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 })
  }
  return NextResponse.json({ ok: true, id: data.id }, { status: 201 })
}
