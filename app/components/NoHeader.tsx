
"use client";
import { usePathname } from "next/navigation";
import AppHeader from "./Header";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const noHeaderRoutes = ["/auth/login", "/auth/register"];
  if (!pathname) return null;
  return noHeaderRoutes.includes(pathname) ? null : <AppHeader />;
}