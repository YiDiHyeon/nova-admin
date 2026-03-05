import { getMenus } from '@/app/api/menu/data'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type DynamicMenuPageProps = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function DynamicMenuPage({ params }: DynamicMenuPageProps) {
  const { slug } = await params
  const currentPath = `/${slug.join('/')}`.replace(/\/+/g, '/')
  const menus = getMenus()

  const matchedMenu = menus.find((menu) => menu.path === currentPath && menu.visible)

  if (!matchedMenu) {
    notFound()
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">{matchedMenu.name}</h1>
      <p className="text-muted-foreground mt-2">경로: {matchedMenu.path}</p>
      <p className="text-muted-foreground mt-1">
        이 페이지는 메뉴 경로 기반으로 동적으로 렌더링됩니다.
      </p>
    </section>
  )
}
