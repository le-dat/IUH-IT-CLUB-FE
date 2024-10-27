"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import DeviceModal from "@/components/modals/DeviceModal";
import DeviceRequestModal from "@/components/modals/DeviceRequestModal";
import DeviceDetailsModal from "@/components/modals/DeviceDetailsModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import ApprovalModal from "@/components/modals/ApprovalModal";
import DeviceTable from "./devices/DeviceTable";
import Pagination from "@/components/common/Pagination";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DevicesSectionProps {
  isAdmin: boolean;
}

const devices = [
  {
    id: 1,
    name: "MacBook Pro",
    type: "Laptop",
    status: "Available",
    assignedTo: "-",
    lastChecked: "2024-02-20",
    condition: "Excellent",
    specifications: '16" M1 Pro, 16GB RAM, 512GB SSD',
  },
  {
    id: 2,
    name: "Arduino Kit",
    type: "Development Board",
    status: "Pending Approval",
    assignedTo: "Le Dat",
    lastChecked: "2024-02-18",
    condition: "Good",
    specifications: "Arduino Uno R3 with Sensor Kit",
    request: {
      requester: "Le Dat",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      purpose: "IoT project development",
    },
  },
  {
    id: 3,
    name: "Arduino Kit",
    type: "Development Board",
    status: "Pending Approval",
    assignedTo: "Alex Johnson",
    lastChecked: "2024-02-18",
    condition: "Good",
    specifications: "Arduino Uno R3 with Sensor Kit",
    request: {
      requester: "Alex Johnson",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      purpose: "IoT project development",
    },
  },
  {
    id: 4,
    name: "Arduino Kit",
    type: "Development Board",
    status: "Pending Approval",
    assignedTo: "Alex Johnson",
    lastChecked: "2024-02-18",
    condition: "Good",
    specifications: "Arduino Uno R3 with Sensor Kit",
    request: {
      requester: "Alex Johnson",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      purpose: "IoT project development",
    },
  },
  {
    id: 5,
    name: "Arduino Kit",
    type: "Development Board",
    status: "Pending Approval",
    assignedTo: "Alex Johnson",
    lastChecked: "2024-02-18",
    condition: "Good",
    specifications: "Arduino Uno R3 with Sensor Kit",
    request: {
      requester: "Alex Johnson",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      purpose: "IoT project development",
    },
  },
];

const ITEMS_PER_PAGE = 2;

export default function DevicesSection({ isAdmin }: DevicesSectionProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All Statuses" || device.status === selectedStatus;
    const matchesCondition =
      selectedCondition === "All Conditions" || device.condition === selectedCondition;

    return matchesSearch && matchesStatus && matchesCondition;
  });

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDevices = filteredDevices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleView = (device: any) => {
    setSelectedDevice(device);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDelete = (device: any) => {
    setSelectedDevice(device);
    setIsDeleteModalOpen(true);
  };

  const handleRequest = (device: any) => {
    setSelectedDevice(device);
    setIsRequestModalOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting device:", selectedDevice?.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("devices.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {isAdmin && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Statuses">Tất cả trạng thái</SelectItem>
              <SelectItem value="Available">Có sẵn</SelectItem>
              <SelectItem value="Pending Approval">Đang chờ phê duyệt</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo tình trạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Conditions">Tất cả tình trạng</SelectItem>
              <SelectItem value="Excellent">Xuất sắc</SelectItem>
              <SelectItem value="Good">Tốt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={Math.min(startIndex + ITEMS_PER_PAGE, filteredDevices.length)}
          totalItems={filteredDevices.length}
          itemName="devices"
          onPageChange={setCurrentPage}
        />
      </div>

      <DeviceTable
        devices={paginatedDevices}
        isAdmin={isAdmin}
        onView={handleView}
        onEdit={(device) => {
          setSelectedDevice(device);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDelete}
        onRequest={handleRequest}
      />

      {selectedDevice && (
        <>
          <DeviceDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            device={selectedDevice}
            isAdmin={isAdmin}
            onEdit={handleEdit}
          />

          <DeviceModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            mode="edit"
            device={selectedDevice}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Delete Device"
            description={`Are you sure you want to delete "${selectedDevice.name}"? This action cannot be undone.`}
          />

          <DeviceRequestModal
            isOpen={isRequestModalOpen}
            onClose={() => setIsRequestModalOpen(false)}
            deviceName={selectedDevice.name}
          />

          {selectedDevice.status === "Pending Approval" && (
            <ApprovalModal
              isOpen={isApprovalModalOpen}
              onClose={() => setIsApprovalModalOpen(false)}
              type="device"
              item={{
                id: selectedDevice.id,
                deviceName: selectedDevice.name,
                requester: selectedDevice.request?.requester,
                startDate: selectedDevice.request?.startDate,
                endDate: selectedDevice.request?.endDate,
                purpose: selectedDevice.request?.purpose,
              }}
            />
          )}
        </>
      )}

      <DeviceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
      />
    </div>
  );
}
