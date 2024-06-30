import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Switzerland Trip',
  description: 'Countdown to Switzerland trip',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-palette="winter" data-shade="glassy">
      <body>{children}</body>
    </html>
  )
}
