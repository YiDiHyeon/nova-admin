import { NextRequest, NextResponse } from 'next/server'
import { updateMenuOrder } from '@/app/api/menu/data'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()
  updateMenuOrder(body)
  return NextResponse.json({ ok: true })
}
