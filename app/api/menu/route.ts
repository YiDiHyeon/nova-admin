import { NextRequest, NextResponse } from 'next/server'
import { createMenu, getMenus } from '@/app/api/menu/data'

// Next.js가 이 GET 요청의 결과를 캐싱하지 않도록 강제합니다.
export const dynamic = 'force-dynamic'

export async function GET() {
  const menus = getMenus()
  return NextResponse.json(menus)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newMenu = createMenu(body) // body는 CreateMenuInput과 같아야 함
  return NextResponse.json(newMenu, { status: 201 })
}
