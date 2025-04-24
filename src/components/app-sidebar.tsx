"use client";
import * as React from "react";
import {
  IconBrandCashapp,
  IconList,
  IconSettings,
  IconLogout,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { logoutAuthService } from "@/services/services-api";
import { useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    name: "UserName",
    email: "m@example.com",
    zone: "idk",
  });
  const router = useRouter();

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logOut = async () => {
    try {
      const response = await logoutAuthService();
      if (response.status == 200) {
        localStorage.removeItem("user");
        return router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const data = {
    user,
    navMain: [
      {
        title: "Clientes",
        url: "/clientes/",
        icon: IconUsers,
      },
      {
        title: "Clientes temporales",
        url: "/clientes-temporales/",
        icon: IconUsers,
      },
      {
        title: "Pagos",
        url: "/pagos/",
        icon: IconBrandCashapp,
      },
      {
        title: "Direcciones IP",
        url: "/direcciones-ip/",
        icon: IconList,
      },
    ],

    navSecondary: [
      {
        title: "Configuración",
        url: "#",
        icon: IconSettings,
        function: () => alert("Configuración"),
      },
      {
        title: "Cerrar sesión",
        url: "#",
        icon: IconLogout,
        function: () => logOut(),
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/inicio">
                <span className="text-base font-semibold">
                  Gestión Redysel.
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
