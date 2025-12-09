import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

type JwtPayload = {
  sub: string // user id or email
  type: 'access' | 'refresh'
}

export async function createAccessToken(sub: string) {
  const payload: JwtPayload = { sub, type: 'access' }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m') // 15분
    .sign(SECRET)
}

export async function createRefreshToken(sub: string) {
  const payload: JwtPayload = { sub, type: 'refresh' }

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7일
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as JwtPayload
  } catch {
    return null
  }
}
