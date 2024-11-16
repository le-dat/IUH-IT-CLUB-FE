"use client";

import { useEffect, useState } from "react";
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
import ApprovalModal from "@/components/modals/ApprovalModalDevice";
import { useDebounce } from "@uidotdev/usehooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import deviceService from "@/services/device-service";
import { toast } from "sonner";
import { useDeviceStore } from "@/store/device-store";
import { IDevice } from "@/types/device-type";

interface DevicesSectionProps {
  isAdmin: boolean;
}

export default function DevicesSection({ isAdmin }: DevicesSectionProps) {
  const { t } = useTranslation();
  const { setDevices } = useDeviceStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [selectedType, setSelectedType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm?.trim(), 700);
  const debouncedStatus = useDebounce(selectedStatus?.trim(), 500);
  const debouncedSelectedCondition = useDebounce(selectedCondition?.trim(), 500);
  const debouncedCurrentPage = useDebounce(currentPage, 500);

  const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      `device-manager-${debouncedSearchTerm}-${debouncedStatus}-${debouncedSelectedCondition}-${debouncedCurrentPage}`,
    ],
    queryFn: () =>
      deviceService.getDevices({
        search: debouncedSearchTerm,
        status: debouncedStatus,
        page: 1,
        limit: 10,
      }),
    enabled: true,
  });

  const { mutate: handleDeleteById, isPending } = useMutation({
    mutationFn: deviceService.deleteDeviceById,
  });

  const totalPages = Number(data?.data?.pagination?.totalPages) || 1;

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
    handleDeleteById(
      { id: selectedDevice?._id as string },
      {
        onSuccess: (response) => {
          toast.success(response?.message);
          setIsDeleteModalOpen(false);
          refetch();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      }
    );
  };

  useEffect(() => {
    setDevices(data?.data?.equipment || []);
  }, [data, setDevices]);

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
            Thêm thiết bị
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
              <SelectItem value=" ">Tất cả trạng thái</SelectItem>
              <SelectItem value="available">Có sẵn</SelectItem>
              <SelectItem value="in use">Đang sử dụng</SelectItem>
              <SelectItem value="unavailable">Không có sẵn</SelectItem>
              <SelectItem value="pending approval">Đang chờ phê duyệt</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo tình trạng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Conditions">Tất cả tình trạng</SelectItem>
              <SelectItem value="good">Tốt</SelectItem>
              <SelectItem value="fair">Khá</SelectItem>
              <SelectItem value="poor">Kém</SelectItem>
            </SelectContent>
          </Select>

          {/* <Select value={selectedType} onValueChange={setSelectedType}>
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
          </Select> */}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeviceTable
        devices={data?.data?.equipment || []}
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
            refetch={refetch}
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

          {/* {selectedDevice.status === "pending approval" && (
            <ApprovalModal
              isOpen={isApprovalModalOpen}
              onClose={() => setIsApprovalModalOpen(false)}
              type="device"
              item={{
                id: selectedDevice._id,
                deviceName: selectedDevice.name,
                requester: selectedDevice.request?.requester,
                startDate: selectedDevice.request?.startDate,
                endDate: selectedDevice.request?.endDate,
                purpose: selectedDevice.request?.purpose,
              }}
            />
          )} */}
        </>
      )}

      <DeviceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
        refetch={refetch}
      />
    </div>
  );
}
