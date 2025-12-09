import { NextRequest, NextResponse } from 'next/server'
import { createAccessToken, createRefreshToken } from '@/lib/jwt'

const USER = {
  email: 'test',
  password: '1234',
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email !== USER.email || password !== USER.password) {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
      { status: 401 },
    )
  }

  const accessToken = await createAccessToken(email)
  const refreshToken = await createRefreshToken(email)

  const res = NextResponse.json({ message: 'ok' })
  res.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
  })

  res.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })

  return res
}
