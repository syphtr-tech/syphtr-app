import type { ReactNode } from 'react'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
