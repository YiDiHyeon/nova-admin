import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: '로그아웃되었습니다.' })

  // 쿠키 삭제
  res.cookies.set('accessToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  res.cookies.set('refreshToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  return res
}
