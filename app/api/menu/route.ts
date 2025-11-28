import { NextRequest, NextResponse } from 'next/server'
import { createMenu, getMenus } from '@/app/api/menu/data'

export async function GET() {
  const menus = getMenus()
  return NextResponse.json(menus)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newMenu = createMenu(body) // body는 CreateMenuInput과 같아야 함
  return NextResponse.json(newMenu, { status: 201 })
}
