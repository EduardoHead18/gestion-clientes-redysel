"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getServerCookie } from "@/services/services-api";
import { useRouter } from "next/navigation";

export default function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCookie = async () => {
      const response = await getServerCookie();
      if (typeof response === "boolean") {
        if (response === true) {
          setToken(true);
        } else {
          router.push("/auth/login");
        }
      }
    };

    getCookie();
  }, [router]);

  return token ? (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ) : null;
}
