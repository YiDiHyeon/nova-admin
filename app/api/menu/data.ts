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

const globalForMenus = globalThis as unknown as {
  __menus__?: MenuItem[]
}

if (!globalForMenus.__menus__) {
  // 최초 1번만 초기화
  globalForMenus.__menus__ = [...INITIAL_MENUS] // 복사본으로 생성
}

let menus = globalForMenus.__menus__!

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

type UpdateMenuInput = {
  name?: string
  slug?: string
  parentId?: number | null
  visible?: boolean
  roles?: string[]
  id: number
  path?: string
  order?: number
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

  menus = menus.filter((m) => m.id !== targetId)
  globalForMenus.__menus__ = menus
}

export function updateMenu(input: UpdateMenuInput): MenuItem | null {
  const targetId = Number(input.id)
  const index = menus.findIndex((m) => m.id === targetId)

  if (index === -1) {
    // 해당 id가 없으면
    return null
  }

  const old = menus[index]

  // parentId나 slug가 바뀌면 path도 다시 계산해줘야 함
  const parentId = input.parentId !== undefined ? input.parentId : old.parentId
  const slug = input.slug !== undefined ? input.slug : old.slug

  const parentPath = parentId ? (menus.find((m) => m.id === parentId)?.path ?? '') : ''

  const newPath = `${parentPath}/${slug}`.replace('//', '/')

  const updated: MenuItem = {
    ...old, // 기존 값들
    ...input, // 변경 요청 값들 덮어쓰기
    path: 'wrwerwer', // path는 우리가 다시 계산한 값으로 강제
  }

  // 🔥 진짜 중요한 부분: 배열에 반영
  menus[index] = updated
  return updated
}

export function updateMenuOrder(orderList: { id: number; order: number }[]) {
  const orderMap = new Map(orderList.map((o) => [o.id, o.order]))

  menus = menus
    .map((m) => ({
      ...m,
      order: orderMap.get(m.id) ?? m.order,
    }))
    .sort((a, b) => a.order - b.order)
}
