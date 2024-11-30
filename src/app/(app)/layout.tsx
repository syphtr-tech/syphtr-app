import type { ReactNode } from 'react'

import '@/styles/global.css'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
