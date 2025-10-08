"use client"

import { NavLink, useLocation } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {useAuth} from "../../providers/AuthProvider.jsx";

export function NavMain({ items }) {
  const { pathname } = useLocation();

    const { userData } = useAuth();

    const isActive = (url) => pathname === url || pathname === `${url}/`;
  const hasActiveChild = (subItems) => subItems?.some((sub) => isActive(sub.url));

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;
          const activeParent = isActive(item.url);
          const activeChild = hasActiveChild(item.items);
          const expanded = activeParent || activeChild;

          if (hasSubItems) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={expanded}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      data-active={expanded}
                      className={`flex items-center gap-2 w-full p-2 rounded ${
                        expanded ? "bg-muted font-medium" : ""
                      }`}
                    >
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = isActive(subItem.url);
                        return (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className={isSubActive ? "bg-muted font-medium rounded" : ""}
                          >
                            <SidebarMenuSubButton asChild data-active={isSubActive}>
                              <NavLink
                                to={subItem.url}
                                className="block w-full px-2 py-1 rounded"
                              >
                                {subItem.title}
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (

                (!item.allowRoles || item.allowRoles.includes(userData.role)) ? (
                  <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          data-active={activeParent}
                          className={`w-full p-2 rounded ${activeParent ? "bg-muted font-medium" : ""}`}
                      >
                          <NavLink to={item.url} className="flex items-center gap-2 w-full">
                              {item.icon && <item.icon className="size-4" />}
                              <span>{item.title}</span>
                          </NavLink>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              ) : null
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
