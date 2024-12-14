import { ChartArea, Tractor, Grid3X3 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Statistics",
    url: "/statistics",
    icon: ChartArea,
  },
  {
    title: "Farm Conditions",
    url: "/farm-conditions",
    icon: Tractor,
  },
  {
    title: "Field Map",
    url: "/field-map",
    icon: Grid3X3,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="plabs-title-bold-16">
            Application Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="bg-gray-50 p-2 border rounded-md hover:bg-gray-100"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
