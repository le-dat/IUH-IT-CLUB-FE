// "use client";

// import { useState } from "react";
// import DeviceFilters from "./DeviceFilters";
// import DeviceList from "./DeviceList";
// import DeviceTable from "./DeviceTable";
// import DeviceModal from "@/components/modals/DeviceModal";
// import DeviceRequestModal from "@/components/modals/DeviceRequestModal";
// import DeviceDetailsModal from "@/components/modals/DeviceDetailsModal";
// import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
// import { useViewMode } from "@/hooks/useViewMode";
// import ApprovalModal from "@/components/modals/ApprovalModal";

// interface Device {
//   id: number;
//   name: string;
//   type: string;
//   status: string;
//   assignedTo: string;
//   lastChecked: string;
//   condition: string;
//   specifications?: string;
// }

// const devices = [
//   {
//     id: 1,
//     name: "Device 1",
//     type: "Type 1",
//     status: "Active",
//     assignedTo: "User 1",
//     lastChecked: "2022-01-01",
//     condition: "Good",
//     specifications: "Specifications 1",
//   },
// ];

// export default function DeviceSection({ isAdmin }: { isAdmin: boolean }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedType, setSelectedType] = useState("All Types");
//   const [selectedStatus, setSelectedStatus] = useState("All Statuses");
//   const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
//   const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const { viewMode, toggleViewMode } = useViewMode();

//   const filteredDevices = devices.filter((device) => {
//     const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = selectedType === "All Types" || device.type === selectedType;
//     const matchesStatus = selectedStatus === "All Statuses" || device.status === selectedStatus;
//     return matchesSearch && matchesType && matchesStatus;
//   });

//   const handleView = (device: Device) => {
//     setSelectedDevice(device);
//     setIsDetailsModalOpen(true);
//   };

//   const handleEdit = () => {
//     setIsDetailsModalOpen(false);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (device: Device) => {
//     setSelectedDevice(device);
//     setIsDeleteModalOpen(true);
//   };

//   const handleRequest = (device: Device) => {
//     setSelectedDevice(device);
//     setIsRequestModalOpen(true);
//   };

//   const confirmDelete = () => {
//     // Handle delete logic here
//     console.log("Deleting device:", selectedDevice?.id);
//     setIsDeleteModalOpen(false);
//     setSelectedDevice(null);
//   };

//   return (
//     <div className="space-y-6">
//       <DeviceFilters
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         selectedType={selectedType}
//         onTypeChange={setSelectedType}
//         selectedStatus={selectedStatus}
//         onStatusChange={setSelectedStatus}
//         isAdmin={isAdmin}
//         onAddDevice={() => setIsCreateModalOpen(true)}
//       />

//       {viewMode === "grid" ? (
//         <DeviceList
//           devices={filteredDevices}
//           isAdmin={isAdmin}
//           onView={handleView}
//           onEdit={(device) => {
//             setSelectedDevice(device);
//             setIsEditModalOpen(true);
//           }}
//           onDelete={handleDelete}
//           onRequest={handleRequest}
//         />
//       ) : (
//         <DeviceTable
//           devices={filteredDevices}
//           isAdmin={isAdmin}
//           onView={handleView}
//           onEdit={(device) => {
//             setSelectedDevice(device);
//             setIsEditModalOpen(true);
//           }}
//           onDelete={handleDelete}
//           onRequest={handleRequest}
//         />
//       )}

//       {selectedDevice && (
//         <>
//           <DeviceDetailsModal
//             isOpen={isDetailsModalOpen}
//             onClose={() => setIsDetailsModalOpen(false)}
//             device={selectedDevice}
//             isAdmin={isAdmin}
//             onEdit={handleEdit}
//           />

//           <DeviceModal
//             isOpen={isEditModalOpen}
//             onClose={() => setIsEditModalOpen(false)}
//             mode="edit"
//             device={selectedDevice}
//           />

//           <DeleteConfirmationModal
//             isOpen={isDeleteModalOpen}
//             onClose={() => setIsDeleteModalOpen(false)}
//             onConfirm={confirmDelete}
//             title="Delete Device"
//             description={`Are you sure you want to delete "${selectedDevice.name}"? This action cannot be undone.`}
//           />

//           <DeviceRequestModal
//             isOpen={isRequestModalOpen}
//             onClose={() => setIsRequestModalOpen(false)}
//             deviceName={selectedDevice.name}
//           />

//           {selectedDevice.status === "Pending Approval" && (
//             <ApprovalModal
//               isOpen={isApprovalModalOpen}
//               onClose={() => setIsApprovalModalOpen(false)}
//               type="device"
//               item={{
//                 deviceName: selectedDevice.name,
//                 id: selectedDevice.id,
//                 // Add other required properties
//               }}
//             />
//           )}
//         </>
//       )}

//       <DeviceModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         mode="create"
//       />
//     </div>
//   );
// }
