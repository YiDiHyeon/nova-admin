'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useRouter } from 'next/navigation'
import { ThemeButton } from '@/app/components/ThemeButton'

type User = {
  name: string
  email: string
  image: string
}

export default function Header() {
  const router = useRouter()

  const user = {
    name: 'Easy',
    email: 'leedmswl123@gmail.com',
    image: 'easy.png',
  }

  const handleLogout = () => {
    router.push('/login')
  }
  return (
    <header className="bg-sidebar h-14 w-full shadow">
      <div className="flex h-full items-center justify-between px-6 align-middle">
        <div className="text-lg font-bold tracking-tight">
          Nova <span className="text-slate-500">Admin</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <span className="text-slate-500">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            로그아웃
          </Button>
          <ThemeButton />
        </div>
      </div>
    </header>
  )
}
