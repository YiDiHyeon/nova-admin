// components/common/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="flex h-10 items-center justify-center border-t bg-white text-xs text-slate-400">
      © {new Date().getFullYear()} Nova Admin. All rights reserved.
    </footer>
  )
}
