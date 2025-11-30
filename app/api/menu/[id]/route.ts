import { NextRequest, NextResponse } from 'next/server'
import { deleteMenu } from '@/app/api/menu/data' // 경로 주의 (../data 일 수도 있음)

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
