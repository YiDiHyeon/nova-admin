import { MenuItem } from '@/app/shared/types/menu'

const INITIAL_MENUS = [
  {
    id: 1,
    code: 100,
    name: '대시보드',
    slug: 'dashboard',
    path: '/dashboard',
    parentId: null,
    order: 1,
    visible: true,
    roles: ['ADMIN'],
  },
  {
    id: 2,
    code: 200,
    name: '회원관리',
    slug: 'users',
    path: '/users',
    parentId: null,
    order: 2,
    visible: true,
    roles: ['ADMIN'],
  },
  {
    id: 3,
    code: 210,
    name: '회원 목록',
    slug: 'list',
    path: '/users/list',
    parentId: 2,
    order: 1,
    visible: true,
    roles: ['ADMIN'],
  },
  {
    id: 999,
    code: 900,
    name: '메뉴관리',
    slug: 'menu',
    path: '/menu',
    parentId: null,
    order: 3,
    visible: true,
    roles: ['ADMIN'],
  },
]

let menus: MenuItem[] = INITIAL_MENUS

export function getMenus() {
  return menus
}

type CreateMenuInput = {
  name: string
  slug: string
  parentId: number | null
  visible: boolean
  roles: string[]
}

export function createMenu(input: CreateMenuInput) {
  const newId = menus.length > 0 ? Math.max(...menus.map((m) => m.id)) : 0

  const newPath =
    `${input.parentId ? menus.find((m) => m.id === input.parentId)?.path : ''}/${input.slug}`.replace(
      '//',
      '/',
    )

  const newMenu: MenuItem = {
    ...input,
    id: newId + 1,
    order: menus.length + 1,
    path: newPath,
  }

  menus.push(newMenu)

  return newMenu
}

export function deleteMenu(id: string | number) {
  const targetId = Number(id) // 숫자로 변환

  // 삭제 로직
  menus = menus.filter((m) => m.id !== targetId)
}
