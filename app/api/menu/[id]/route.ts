import { NextRequest, NextResponse } from 'next/server'
import { deleteMenu, updateMenu } from '@/app/api/menu/data' // 경로 주의 (../data 일 수도 있음)

export const dynamic = 'force-dynamic'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // params는 Promise입니다.
) {
  // 1. params를 await로 기다려야 합니다.
  const { id } = await params

  // 2. id를 숫자로 변환
  const numericId = Number(id)

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  // 3. 삭제 함수 호출
  deleteMenu(numericId)

  return NextResponse.json({ success: true })
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const body = await req.json()

  // body에 id를 안 넘겼다면, 여기서 합쳐줄 수도 있음
  const input = { ...body }

  const updated = updateMenu(input)

  if (!updated) {
    return NextResponse.json({ error: 'Menu not found' }, { status: 404 })
  }

  return NextResponse.json(updated, { status: 200 })
}
//
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string | number }> },
// ) {
//   const body = await req.json()
//   const newMenu = updateMenu(body) // body는 CreateMenuInput과 같아야 함
//   return NextResponse.json(newMenu, { status: 201 })
// }
