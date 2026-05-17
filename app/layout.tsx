import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Braindump — Your Personal AI Workspace',
  description: 'A Mem.ai-style personal AI workspace with notes, calendar, and smart search.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
