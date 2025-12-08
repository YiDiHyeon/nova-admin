import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch (e) {
    return null
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isLoginPage = pathname.startsWith('/login')
  const token = req.cookies.get('accessToken')?.value

  // 로그인 상태
  const isLoggedIn = token && (await verifyJWT(token))

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
