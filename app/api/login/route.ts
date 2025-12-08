import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '')
const USER = {
  email: 'test',
  password: '1234',
}

async function createToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET)
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email !== USER.email || password !== USER.password) {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
      { status: 401 },
    )
  }

  const token = await createToken({ email })
  const res = NextResponse.json({ message: 'ok' })
  res.cookies.set('accessToken', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
  })
  return res
}
