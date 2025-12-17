import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'
export type FontScale = 'sm' | 'md' | 'lg'

type SettingsState = {
  panelOpen: boolean
  theme: ThemeMode
  fontScale: FontScale
  togglePanel: () => void
  closePanel: () => void

  setTheme: (t: ThemeMode) => void
  setFontScale: (v: FontScale) => void

  reset: () => void
}

const DEFAULTS = {
  panelOpen: false,
  theme: 'system' as ThemeMode,
  fontScale: 'md' as FontScale,
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,

      togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })),
      closePanel: () => set({ panelOpen: false }),

      setTheme: (t) => set({ theme: t }),
      setFontScale: (v) => set({ fontScale: v }),

      reset: () => set({ ...DEFAULTS, panelOpen: true }),
    }),
    { name: 'nova-admin-settings' },
  ),
)
