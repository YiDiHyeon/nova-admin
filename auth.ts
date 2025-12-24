import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: 'jwt', // 또는 "database"
    // 여기서 만료 시간을 초 단위로 설정합니다.
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, // 24시간마다 갱신
  },
  callbacks: {
    // 2. 로그인 시 이메일 체크 (Supabase RLS/Trigger 대신 여기서 막음)
    async signIn({ user }) {
      const allowedEmails = ['leedmswl123@gmail.com']

      // 허용된 이메일이면 true, 아니면 false 리턴 (로그인 거부)
      if (user.email && allowedEmails.includes(user.email)) {
        return true
      }

      return false // 로그인 실패 처리 (AccessDenied 페이지로 이동)
    },
    // 3. 클라이언트에서 세션 정보 쓸 때 필요한 데이터 추가
    async session({ session, token }) {
      // JWT에 저장된 정보를 세션 객체로 넘겨줌
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
