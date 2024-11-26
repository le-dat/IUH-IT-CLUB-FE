import { Card } from "@/components/ui/card";
import userService from "@/services/user-service";
import { useDeviceStore } from "@/store/device-store";
import useEventStore from "@/store/event-store";
import useTeamStore from "@/store/team-store";
import useUserStore from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { Users, Target, Laptop, Calendar } from "lucide-react";
import { useEffect } from "react";

export default function DashboardStats() {
  const { users } = useUserStore();
  const { teams } = useTeamStore();
  const { events } = useEventStore();
  const { devices } = useDeviceStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`dashboard`],
    queryFn: () => userService.getDashboard(),
    enabled: true,
    refetchOnWindowFocus: false,
  }); 

  useEffect(() => {
    refetch();
  }, [devices, users, teams, events, refetch]);

  return (
    <div className="flex md:grid overflow-scroll md:overflow-hidden gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="flex-shrink-0 p-4 flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Users className="h-6 w-6 text-blue-700 dark:text-blue-300" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex-shrink-0">Tổng số thành viên</p>
          <h3 className="text-2xl font-bold">{data?.data?.users}</h3>
        </div>
      </Card>

      <Card className="flex-shrink-0 p-4 flex items-center gap-4">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <Target className="h-6 w-6 text-green-700 dark:text-green-300" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex-shrink-0">Đội nhóm</p>
          <h3 className="text-2xl font-bold">{data?.data?.teams}</h3>
        </div>
      </Card>

      <Card className="flex-shrink-0 p-4 flex items-center gap-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
          <Calendar className="h-6 w-6 text-purple-700 dark:text-purple-300" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex-shrink-0">Sự kiện sắp tới</p>
          <h3 className="text-2xl font-bold">{data?.data?.events}</h3>
        </div>
      </Card>

      <Card className="flex-shrink-0 p-4 flex items-center gap-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
          <Laptop className="h-6 w-6 text-orange-700 dark:text-orange-300" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex-shrink-0">Thiết bị có sẵn</p>
          <h3 className="text-2xl font-bold">{data?.data?.equipments}</h3>
        </div>
      </Card>
    </div>
  );
}
