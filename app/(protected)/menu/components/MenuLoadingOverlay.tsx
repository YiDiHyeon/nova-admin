'use client'

import { useIsMutating } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

export function MenuLoadingOverlay() {
  // menu 관련 mutation만 잡고 싶으면 mutationKey 맞춰주면 됨
  const mutatingCount = useIsMutating({ mutationKey: ['menu'] })
  const isMutating = mutatingCount > 0

  if (!isMutating) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background flex items-center gap-2 rounded-lg px-5 py-3 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </div>
  )
}
