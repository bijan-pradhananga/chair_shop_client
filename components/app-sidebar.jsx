"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Shapes,
  ShoppingBag,
  SquareTerminal,
  TabletSmartphone,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  teams: [
    {
      name: "China Electronics",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: TabletSmartphone,
      isActive: true,
      items: [
        {
          title: "Add Product",
          url: "/admin/product/add-product",
        },
        {
          title: "View Product",
          url: "/admin/product/",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: Shapes,
      items: [
        {
          title: "Add Category",
          url: "/admin/category/add-category",
        },
        {
          title: "View Category",
          url: "/admin/category",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "View Orders",
          url: "#",
        },

      ],
    },
    
  ],

}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
