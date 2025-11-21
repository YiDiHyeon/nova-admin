// app/(protected)/layout.tsx
import type { ReactNode } from 'react'
import Header from '@/app/components/common/layout/Header'
// import Sidebar from '@/app/components/common/layout/Sidebar'
import RightPanel from '@/app/components/common/layout/RightPanel'
import Footer from '@/app/components/common/layout/Footer'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarNav } from '@/app/components/common/layout/SidebarNav'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset className="bg-slate-100">
        <Header />
        <main className="flex-1 overflow-auto">
          <SidebarTrigger />
          {children}
        </main>
        <RightPanel />
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
