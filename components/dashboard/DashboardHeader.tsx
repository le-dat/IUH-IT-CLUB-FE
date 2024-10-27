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

interface DashboardHeaderProps {
  isAdmin: boolean;
}

export default function DashboardHeader({ isAdmin }: DashboardHeaderProps) {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

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
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Trang Admin
              </Button>
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
                <DropdownMenuItem onClick={() => handleClick("/")} className="text-red-600">
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
