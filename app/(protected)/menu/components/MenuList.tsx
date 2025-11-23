import { useEffect, useState } from 'react'
import { MenuItem } from '@/app/shared/types/menu'
import { Button } from '@/components/ui/button'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableMenuItem } from './SortableMenuItem'

interface MenuListProps {
  onSelect: (menu: MenuItem) => void
}

export function MenuList({ onSelect }: MenuListProps) {
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [rootMenus, setRootMenus] = useState<MenuItem[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    fetch('/menus/menu.json')
      .then((res) => res.json())
      .then((data: MenuItem[]) => {
        setMenus(data)
        // 초기 대메뉴 정렬 (order 기준)
        const roots = data
          .filter((item) => item.parentId === null)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setRootMenus(roots)
      })
      .catch((err) => console.error('Failed to fetch menus:', err))
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setRootMenus((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)

        console.log(
          'New Order:',
          newItems.map((item) => item.name),
        )
        return newItems
      })
    }
  }

  return (
    <div className="w-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">메뉴 목록</h2>
        <Button variant="outline" size="sm" onClick={() => onSelect({} as MenuItem)}>
          + 신규 추가
        </Button>
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={rootMenus.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            {rootMenus.length === 0 ? (
              <div className="py-4 text-center text-gray-500">메뉴가 없습니다.</div>
            ) : (
              rootMenus.map((rootItem) => {
                const children = menus.filter((item) => item.parentId === rootItem.id)
                // 서브메뉴 정렬 (order 기준)
                children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

                return (
                  <SortableMenuItem
                    key={rootItem.id}
                    item={rootItem}
                    childrenMenus={children}
                    onSelect={onSelect}
                  />
                )
              })
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
