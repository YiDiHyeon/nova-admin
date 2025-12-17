'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ThemeMode, FontScale, useSettingsStore } from '@/lib/store/settings'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

function RightPanel() {
  const open = useSettingsStore((s) => s.panelOpen)
  const close = useSettingsStore((s) => s.closePanel)

  const theme = useSettingsStore((s) => s.theme)
  const setTheme = useSettingsStore((s) => s.setTheme)

  const fontScale = useSettingsStore((s) => s.fontScale)
  const setFontScale = useSettingsStore((s) => s.setFontScale)

  const reset = useSettingsStore((s) => s.reset)

  return (
    <Sheet open={open} onOpenChange={(v) => (v ? null : close())}>
      <SheetContent side="right" className="w-[320px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>설정</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-2">
          <section className="space-y-2">
            <div className="text-sm font-medium">테마</div>
            <ToggleGroup
              type="single"
              value={theme}
              variant="outline"
              onValueChange={(v) => v && setTheme(v as ThemeMode)}
              className="justify-start"
            >
              <ToggleGroupItem value="light">Light</ToggleGroupItem>
              <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
              <ToggleGroupItem value="system">System</ToggleGroupItem>
            </ToggleGroup>
          </section>
          <hr className="my-2" />
          <section className="space-y-2">
            <div className="text-sm font-medium">폰트 크기</div>
            <ToggleGroup
              type="single"
              value={fontScale}
              variant="outline"
              onValueChange={(v) => v && setFontScale(v as FontScale)}
            >
              <ToggleGroupItem value="sm">S</ToggleGroupItem>
              <ToggleGroupItem value="md">M</ToggleGroupItem>
              <ToggleGroupItem value="lg">L</ToggleGroupItem>
            </ToggleGroup>
          </section>
          <hr className="my-4" />

          <Button variant="outline" onClick={reset} className="w-full">
            기본값으로
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default RightPanel
