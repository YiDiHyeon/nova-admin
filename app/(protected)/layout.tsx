// app/(protected)/layout.tsx

import type { ReactNode } from 'react'
// Sidebar, Header 같은걸 쓸 거면 나중에 여기서 import

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* 나중에 Sidebar, Header 추가할 자리 */}
      {/* <Sidebar /> */}
      <div className="flex flex-1 flex-col">
        {/* <Header /> */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
