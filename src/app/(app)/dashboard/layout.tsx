import { AppSidebar } from '@/components/organisms/app-sidebar'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
