"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import ServiceWorkerRegistration from "./service-worker-registration";

const NotificationPermission = dynamic<object>(
  () => import('@/components/ui/notification-permission').then(mod => mod.NotificationPermission),
  { ssr: false }
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
    <ServiceWorkerRegistration />
    <NotificationPermission />
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-all duration-200 hover:scale-110"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    </>
  );
}