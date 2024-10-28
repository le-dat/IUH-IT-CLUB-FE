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

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  assignedTo: string;
  lastChecked: string;
  condition: string;
  specifications?: string;
}

interface DeviceTableProps {
  devices: Device[];
  isAdmin: boolean;
  onView: (device: Device) => void;
  onEdit: (device: Device) => void;
  onDelete: (device: Device) => void;
  onRequest: (device: Device) => void;
  onApprove: (device: Device) => void;

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
          <TableRow key={device.id}>
            <TableCell className="font-medium">{device.name}</TableCell>
            <TableCell>{device.type}</TableCell>
            <TableCell>
              <Badge
                variant={
                  device.status === "Available"
                    ? "default"
                    : device.status === "Pending Approval"
                    ? "secondary"
                    : "outline"
                }
                className="shrink-0"
              >
                {statusMap[device.status as keyof typeof statusMap] || "OutofService"}
              </Badge>
            </TableCell>
            <TableCell>{device.assignedTo}</TableCell>
            <TableCell>{device.lastChecked}</TableCell>
            <TableCell>
              {conditionsMap[(device.condition as keyof typeof conditionsMap) || "Good"]}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onView(device)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {isAdmin ? (
                  <>
                    {device.status === "Pending Approval" ? (
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
                  device.status === "Available" && (
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
