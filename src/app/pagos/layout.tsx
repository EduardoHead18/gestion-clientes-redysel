import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LayoutHome from "../inicio/layout/layout";

export default async function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return redirect("/auth/login");
  }

  return <LayoutHome>{children}</LayoutHome>;
}
