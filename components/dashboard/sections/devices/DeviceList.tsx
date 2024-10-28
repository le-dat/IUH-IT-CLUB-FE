"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

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

interface DeviceListProps {
  devices: Device[];
  isAdmin: boolean;
  onView: (device: Device) => void;
  onEdit: (device: Device) => void;
  onDelete: (device: Device) => void;
  onRequest: (device: Device) => void;
}

export default function DeviceList({
  devices,
  isAdmin,
  onView,
  onEdit,
  onDelete,
  onRequest,
}: DeviceListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {devices.map((device, index) => (
        <motion.div
          key={device.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4 items-start mb-4">
              <div>
                <h3 className="font-semibold">{device.name}</h3>
                <p className="text-sm text-muted-foreground">{device.type}</p>
              </div>
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
                {device.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Assigned To:</span>
                <span>{device.assignedTo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Checked:</span>
                <span>{device.lastChecked}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Condition:</span>
                <span>{device.condition}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={() => onView(device)}>
                <Eye className="h-4 w-4" />
              </Button>
              {isAdmin ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(device)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(device)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </>
              ) : (
                device.status === "Available" && (
                  <Button variant="default" size="sm" onClick={() => onRequest(device)}>
                    Yêu cầu mượn
                  </Button>
                )
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
