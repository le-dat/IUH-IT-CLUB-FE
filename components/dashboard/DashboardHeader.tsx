"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircuitBoard, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useRouter } from "next/navigation";
import ButtonGradient from "../common/ButtonGradient";
import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/auth-service";
import userService from "@/services/user-service";
import { AuthStorage } from "@/lib/local-storage";
import { toast } from "sonner";
import { useEffect } from "react";
import useAuthStore from "@/store/auth-store";

interface DashboardHeaderProps {
  isAdmin: boolean;
}

export default function DashboardHeader({ isAdmin }: DashboardHeaderProps) {
  const router = useRouter();
  const { login: loginStore } = useAuthStore();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`user-profile`],
    queryFn: () => userService.getMe(),
  });

  console.log("data: ", data);

  const handleClick = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    AuthStorage.clearToken();
    refetch();
  };

  useEffect(() => {
    loginStore(data?.data!);
  }, [data, loginStore]);

  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-6 w-6" />
            <h1 className="text-xl font-bold">Câu lạc bộ lập trình IUH</h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isAdmin && (
              <ButtonGradient>
                <Settings className="h-4 w-4 mr-2" />
                Trang quản trị
              </ButtonGradient>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop"
                    alt="Profile"
                    className="rounded-full absolute inset-0 w-full h-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleClick("/profile")}>
                  Trang cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
