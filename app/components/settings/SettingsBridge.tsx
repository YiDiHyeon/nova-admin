'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useSettingsStore } from '@/lib/store/settings'

export function SettingsBridge() {
  const theme = useSettingsStore((s) => s.theme)
  const fontScale = useSettingsStore((s) => s.fontScale)

  const { setTheme } = useTheme()

  // 1) 테마는 next-themes로 위임 (html class 적용)
  useEffect(() => {
    setTheme(theme)
  }, [theme, setTheme])

  // 2) 폰트/밀도는 html dataset에 박아서 전역 스타일에 쓰기
  useEffect(() => {
    const el = document.documentElement
    el.dataset.font = fontScale
  }, [fontScale])

  return null
}
