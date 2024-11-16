"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { conditionsMap, statusMap } from "@/constants/device";
import { IDevice } from "@/types/device-type";

interface DeviceTableProps {
  devices: IDevice[];
  isAdmin: boolean;
  onView: (device: IDevice) => void;
  onEdit: (device: IDevice) => void;
  onDelete: (device: IDevice) => void;
  onRequest: (device: IDevice) => void;
  onApprove: (device: IDevice) => void;
}

export default function DeviceTable({
  devices,
  isAdmin,
  onView,
  onEdit,
  onDelete,
  onRequest,
  onApprove,
}: DeviceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên Thiết Bị</TableHead>
          <TableHead>Loại</TableHead>
          <TableHead>Trạng Thái</TableHead>
          <TableHead>Được Giao Cho</TableHead>
          <TableHead>Lần Kiểm Tra Cuối</TableHead>
          <TableHead>Tình Trạng</TableHead>
          <TableHead>Hành Động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device._id}>
            <TableCell className="font-medium">{device.name}</TableCell>
            <TableCell>{device.type}</TableCell>
            <TableCell>
              <Badge
                variant={
                  device.status === "available"
                    ? "default"
                    : device.status === "pending approval"
                    ? "secondary"
                    : "outline"
                }
                className="shrink-0"
              >
                {statusMap[device.status as keyof typeof statusMap] || "available"}
              </Badge>
            </TableCell>
            <TableCell>{device?.currentBorrower?.username}</TableCell>
            <TableCell>
              {/* {device.lastChecked} */}
              </TableCell>
            <TableCell>
              {/* {conditionsMap[(device.condition as keyof typeof conditionsMap) || "Good"]} */}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onView(device)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {isAdmin ? (
                  <>
                    {device.status === "pending approval" ? (
                      <Button variant="ghost" size="sm" onClick={() => onApprove(device)}>
                        Xem yêu cầu
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => onEdit(device)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDelete(device)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  device.status === "available" && (
                    <Button variant="ghost" size="sm" onClick={() => onRequest(device)}>
                      Yêu cầu mượn
                    </Button>
                  )
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
