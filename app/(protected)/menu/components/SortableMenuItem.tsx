import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MenuItem } from '@/app/shared/types/menu'
import { Button } from '@/components/ui/button'
import { ChevronRight, GripVertical, MoreVertical } from 'lucide-react'

interface SortableMenuItemProps {
  item: MenuItem
  childrenMenus: MenuItem[]
  onSelect: (menu: MenuItem) => void
}

export function SortableMenuItem({ item, childrenMenus, onSelect }: SortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-2 touch-none">
      {/* 대메뉴 아이템 */}
      <div
        className="hover:bg-primary/10 flex cursor-pointer items-center justify-between rounded-md border p-3"
        onClick={() => onSelect(item)}
      >
        <div className="flex items-center gap-2">
          {/* 드래그 핸들 */}
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <span className="font-medium">{item.name}</span>
          <span className="text-xs text-gray-400">({item.slug})</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* 서브메뉴 아이템 (대메뉴에 종속됨, 드래그 불가) */}
      {childrenMenus.length > 0 && (
        <div className="mt-1 ml-6 space-y-1 border-l-2 border-gray-100 pl-2">
          {childrenMenus.map((childItem) => (
            <div
              key={childItem.id}
              className="hover:bg-primary/10 flex cursor-pointer items-center justify-between rounded-md p-2 text-sm"
              onClick={(e) => {
                e.stopPropagation() // 부모 클릭 이벤트 방지
                onSelect(childItem)
              }}
            >
              <div className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3 text-gray-400" />
                <span>{childItem.name}</span>
                <span className="text-xs text-gray-400">({childItem.slug})</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
