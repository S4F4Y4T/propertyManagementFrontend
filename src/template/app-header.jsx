import React from "react"

import { useLocation, NavLink } from "react-router-dom"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"


import { ModeToggle } from "../components/mode-toggle"

export default function AppHeader() {

    const routeNames = {
        "/": "Dashboard",
        "/users": "Users"
    }

    const location = useLocation()
    const pathSegments = location.pathname.split("/").filter(Boolean)

    // Build breadcrumb paths
    const breadcrumbs = [
        { name: "Dashboard", url: "/", isLast: pathSegments.length === 0 },
        ...pathSegments.map((segment, idx) => {
            const url = "/" + pathSegments.slice(0, idx + 1).join("/")
            const name = routeNames[url] || segment
            return { name, url, isLast: idx === pathSegments.length - 1 }
        }),
    ]

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 justify-between">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
        />
        {breadcrumbs?.length > 0 && (
            <Breadcrumb>
                <BreadcrumbList>
                {breadcrumbs.map((bc, idx) =>
                    bc?.isLast ? (
                        <BreadcrumbItem key={idx}>
                            <BreadcrumbPage>{bc.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <React.Fragment key={idx}>
                            <BreadcrumbItem key={idx} className="hidden md:block">
                                <BreadcrumbLink asChild>
                                    <NavLink to={bc.url}>
                                      {bc.name}
                                    </NavLink>
                                </BreadcrumbLink>
                                </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                        </React.Fragment>
                    )
                )}
                </BreadcrumbList>
            </Breadcrumb>
        )}

        </div>

        <div className="ml-auto mr-5">
        <ModeToggle />
        </div>
    </header>
  )
}
