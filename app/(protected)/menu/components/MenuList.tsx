'use client'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface MenuListProps {
  menus: MenuItem[] // props로 받음
  onSelect: (menu: MenuItem) => void
}

export default function MenuList({ menus, onSelect }: MenuListProps) {
  const [rootMenus, setRootMenus] = useState<MenuItem[]>([])
  const [isDirty, setIsDirty] = useState(false)
  const queryClient = useQueryClient()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const { mutate: saveOrder, isPending } = useMutation({
    mutationFn: (list: MenuItem[]) =>
      fetch('/api/menu/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          list.map((item, index) => ({
            id: item.id,
            order: index + 1,
          })),
        ),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] })
    },
  })

  // props로 받은 menus가 변경되면 rootMenus 업데이트
  useEffect(() => {
    if (menus.length > 0) {
      const roots = menus
        .filter((item) => item.parentId === null)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRootMenus(roots)
    }
    setIsDirty(false)
  }, [menus])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setRootMenus((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        setIsDirty(true)
        return newItems
      })
    }
  }

  return (
    <div className="w-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">메뉴 목록</h2>
        <Button variant="outline" size="sm" onClick={() => onSelect({} as MenuItem)}>
          + 메뉴 추가
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
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={!isDirty || isPending} onClick={() => saveOrder(rootMenus)}>
          수정
        </Button>
      </div>
    </div>
  )
}
