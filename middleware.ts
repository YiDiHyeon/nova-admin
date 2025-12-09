import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createAccessToken, verifyToken } from '@/lib/jwt' // verifyJWT 대신 verifyToken 사용 (타입 안전)

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isLoginPage = pathname.startsWith('/login')

  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  // 1. Access Token 검증
  let isLoggedIn = false
  let newAccessToken: string | null = null

  if (accessToken) {
    const payload = await verifyToken(accessToken)
    if (payload && payload.type === 'access') {
      isLoggedIn = true
    }
  }

  // 2. Access Token이 없거나 만료되었지만, Refresh Token이 있는 경우 -> 갱신 시도
  if (!isLoggedIn && refreshToken) {
    const payload = await verifyToken(refreshToken)

    // Refresh Token이 유효하고 타입이 맞으면 갱신
    if (payload && payload.type === 'refresh') {
      const sub = payload.sub
      // 새 Access Token 생성
      newAccessToken = await createAccessToken(sub)
      isLoggedIn = true // 로그인 상태로 간주
    }
  }

  // 3. 리다이렉트 로직
  // 로그인 상태인데 로그인 페이지 접근 시 -> 대시보드
  if (isLoggedIn && isLoginPage) {
    const response = NextResponse.redirect(new URL('/dashboard', req.url))
    // 갱신된 토큰이 있다면 쿠키 설정
    if (newAccessToken) {
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 15, // 15분
      })
    }
    return response
  }

  // 비로그인 상태인데 보호된 페이지 접근 시 -> 로그인 페이지
  if (!isLoggedIn && !isLoginPage) {
    // API 요청인 경우에는 401을 반환하는 것이 맞을 수도 있음 (선택 사항)
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 4. 정상 통과 시 (새 토큰이 있으면 헤더에 추가)
  const response = NextResponse.next()
  if (newAccessToken) {
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 15, // 15분
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
