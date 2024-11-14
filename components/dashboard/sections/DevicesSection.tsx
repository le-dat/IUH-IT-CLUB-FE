"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import DeviceModal from "@/components/modals/DeviceModal";
import DeviceRequestModal from "@/components/modals/DeviceRequestModal";
import DeviceDetailsModal from "@/components/modals/DeviceDetailsModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
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
import ApprovalModal from "@/components/modals/ApprovalModal";
import { useDebounce } from "@uidotdev/usehooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import deviceService from "@/services/device-service";
import { toast } from "sonner";

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
    condition: "Fair",
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

const ITEMS_PER_PAGE = 10;

export default function DevicesSection({ isAdmin }: DevicesSectionProps) {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [selectedType, setSelectedType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const debouncedSelectedYear = useDebounce(selectedStatus, 500);
  const debouncedSelectedSkill = useDebounce(selectedCondition, 500);
  const debouncedSelectedType = useDebounce(selectedType, 500);
  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      `user-manager-${debouncedSearchTerm}-${debouncedSelectedYear}-${debouncedSelectedSkill}-${debouncedCurrentPage}`,
    ],
    queryFn: () => deviceService.getDevices({ page: 1, limit: 10 }),
    enabled: true,
  });

  const { mutate: handleDeleteById, isPending } = useMutation({
    mutationFn: deviceService.deleteDeviceById,
  });

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All Statuses" || device.status === selectedStatus;
    const matchesCondition =
      selectedCondition === "All Conditions" || device.condition === selectedCondition;
    const matchesType = selectedType === "All Types" || device.type === selectedType;

    return matchesSearch && matchesStatus && matchesCondition && matchesType;
  });
  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDevices = filteredDevices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenModalView = (device: any) => {
    setSelectedDevice(device);
    setIsDetailsModalOpen(true);
  };

  const handleApproval = (device: any) => {
    setSelectedDevice(device);
    setIsApprovalModalOpen(true);
  };

  const handleOpenModalEdit = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleOpenModalDelete = (device: any) => {
    setSelectedDevice(device);
    setIsDeleteModalOpen(true);
  };

  const handleRequest = (device: any) => {
    setSelectedDevice(device);
    setIsRequestModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting device:", selectedDevice?.id);

    handleDeleteById(
      { id: selectedDevice?.id },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during login");
        },
      }
    );
  };

  return (
    <div className="space-y-6 overflow-x-auto">
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
              <SelectItem value="Good">Tốt</SelectItem>
              <SelectItem value="Fair">Khá</SelectItem>
              <SelectItem value="Poor">Kém</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo loại thiết bị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">Tất cả loại thiết bị</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Cable">Dây cáp</SelectItem>
              <SelectItem value="Projector">Máy chiếu</SelectItem>
              <SelectItem value="Mobile Device">Thiết Bị Di Động</SelectItem>
              <SelectItem value="Orther">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeviceTable
        devices={paginatedDevices}
        isAdmin={isAdmin}
        onView={handleOpenModalView}
        onEdit={(device) => {
          setSelectedDevice(device);
          setIsEditModalOpen(true);
        }}
        onDelete={handleOpenModalDelete}
        onRequest={handleRequest}
        onApprove={handleApproval}
      />

      {selectedDevice && (
        <>
          <DeviceDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            device={selectedDevice}
            isAdmin={isAdmin}
            onEdit={handleOpenModalEdit}
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
            title="Xóa Thiết Bị"
            description={`Bạn có chắc chắn muốn xóa "${selectedDevice.name}"? Hành động này không thể hoàn tác.`}
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
