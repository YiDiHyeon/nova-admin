// app/(protected)/layout.tsx
import type { ReactNode } from 'react'
import Header from '@/app/components/common/layout/Header'
import Footer from '@/app/components/common/layout/Footer'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SidebarNav } from '@/app/components/common/layout/SidebarNav'
import RightPanel from '@/app/components/common/layout/RightPanel'
import { SettingsBridge } from '@/app/components/settings/SettingsBridge'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto">
          <SidebarTrigger />
          {children}
        </main>
        <SettingsBridge />
        <RightPanel />
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
