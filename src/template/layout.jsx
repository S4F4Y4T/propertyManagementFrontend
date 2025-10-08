import { AppSidebar } from "@/template/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { NavLink } from "react-router-dom"


import { Outlet } from "react-router-dom"

import AppHeader from "@/template/app-header"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
          <main className="px-4 py-6 flex grow flex-col overflow-hidden w-full max-w-7xl mx-auto">
            <Outlet />
          </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
