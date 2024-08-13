"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menubar } from "@/components/ui/menubar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/api";

export const Menu = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [haveToken, setHaveToken] = useState(false);
  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  if (!mounted) return null;

  const { logout } = useAuth();
  const token = localStorage.getItem("token");
  return (
    <>
      {!!token && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              ) : (
                <Moon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              )}
            </div>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </aside>
      )}
    </>
  );
};
