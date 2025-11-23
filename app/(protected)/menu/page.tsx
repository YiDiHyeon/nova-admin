'use client'
import React, { useState } from 'react'
import { MenuItem } from '@/app/shared/types/menu'
import { MenuForm } from '@/app/(protected)/menu/components/MenuForm'
import { MenuList } from '@/app/(protected)/menu/components/MenuList'

export default function Menu() {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null)

  // 메뉴 리스트에서 항목 클릭 시 호출
  const handleMenuClick = (menu: MenuItem) => {
    setSelectedMenu(menu)
  }

  return (
    <div className="flex flex-row gap-4 p-4">
      <MenuList onSelect={handleMenuClick} />
      <MenuForm selectedMenu={selectedMenu} />
    </div>
  )
}
