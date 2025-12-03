'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'
import { MenuItem } from '@/app/shared/types/menu'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

export function SidebarNav() {
  const { data: menus = [] } = useQuery<MenuItem[]>({
    queryKey: ['menus'],
    queryFn: async () => {
      const res = await fetch('/api/menu')
      if (!res.ok) throw new Error('Failed to fetch menus')
      return res.json()
    },
  })

  // 대메뉴 (parentId가 null인 항목) 필터링 및 정렬
  const rootMenus = menus
    .filter((item) => item.parentId === null && item.visible)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {rootMenus.map((rootItem) => {
                // 현재 대메뉴의 자식 메뉴 찾기
                const children = menus.filter(
                  (child) => child.parentId === rootItem.id && child.visible,
                )

                // 1. 자식 메뉴가 있는 경우: Collapsible + SidebarMenuSub 사용
                if (children.length > 0) {
                  return (
                    <Collapsible
                      key={rootItem.id}
                      asChild
                      defaultOpen={false}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={rootItem.name}>
                            <span>{rootItem.name}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {children.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.path ?? '#'}>
                                    <span>{subItem.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                // 2. 자식 메뉴가 없는 경우: 일반 링크
                return (
                  <SidebarMenuItem key={rootItem.id}>
                    <SidebarMenuButton asChild>
                      <Link href={rootItem.path ?? '#'}>
                        <span>{rootItem.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
