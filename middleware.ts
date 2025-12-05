import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  // 로그인 상태 확인 (req.auth에 세션 정보가 있으면 로그인 된 상태)
  const isLoggedIn = !!req.auth

  // 현재 경로가 /login 인지 확인
  const isOnLoginPage = req.nextUrl.pathname.startsWith('/login')

  // 1. 로그인 상태인데 로그인 페이지에 있다면 -> 대시보드로 리다이렉트
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // 2. 로그인이 안 된 상태인데 로그인 페이지가 아니라면 -> 로그인 페이지로 리다이렉트
  // (단, API 경로나 _next 정적 파일 등은 제외해야 함 -> matcher 설정으로 처리됨)
  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 그 외의 경우는 통과
  return NextResponse.next()
})

// matcher 설정: api, _next/static, _next/image, favicon.ico 등을 제외한 모든 경로에서 미들웨어 실행
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
