'use client'
import React, { useState } from 'react'
import { MenuItem } from '@/app/shared/types/menu'
import MenuForm from '@/app/(protected)/menu/components/MenuForm'
import MenuList from '@/app/(protected)/menu/components/MenuList'
import MenuProvider from '@/app/(protected)/menu/components/MenuProvider'
import { useQuery } from '@tanstack/react-query'

// API 호출 함수
const fetchMenus = async (): Promise<MenuItem[]> => {
  const res = await fetch('/api/menu')
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

function MenuContent() {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null)

  const {
    data: menus = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  })

  const handleMenuClick = (menu: MenuItem) => {
    if (menu?.id) return setSelectedMenu(menu)
    setSelectedMenu(null)
  }

  if (isLoading) return <div className="p-4">로딩 중...</div>
  if (isError) return <div className="p-4 text-red-500">에러가 발생했습니다.</div>

  return (
    <div className="flex flex-row gap-4 p-4">
      <MenuList menus={menus} onSelect={handleMenuClick} />
      <MenuForm menus={menus} selectedMenu={selectedMenu} />
    </div>
  )
}

export default function MenuPage() {
  return (
    <MenuProvider>
      <MenuContent />
    </MenuProvider>
  )
}
