"use client"

import {
  Home,
  Users,
  Box,
} from "lucide-react"

import { NavMain } from "@/template/navigation/nav-main"
import { NavUser } from "@/template/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMenu = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "House Owners",
      url: "/house-owners",
      icon: Users,
      allowRoles: ['admin'],
    },
    {
      title: "Tenants",
      url: "/tenants",
      icon: Users,
      allowRoles: ['admin'],
    },
    {
      title: "Tenants",
      url: "/owner-tenants",
      icon: Users,
      allowRoles: ['owner'],
    },
    {
      title: "Flats",
      url: "/flats",
      icon: Users,
      allowRoles: ['owner'],
    },
    {
      title: "Bill Categories",
      url: "/bill-categories",
      icon: Users,
      allowRoles: ['owner'],
    },
    {
      title: "Bills",
      url: "/bills",
      icon: Users,
      allowRoles: ['owner'],
    },
  ]

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Box className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Property Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
