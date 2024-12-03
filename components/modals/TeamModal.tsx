"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FORM_TEAM } from "@/constants/team";
import { validationTeamSchema } from "@/lib/validate";
import teamService from "@/services/team-service";
import { ITeam } from "@/types/team-type";
import { IUser } from "@/types/user-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import MemberModal from "./MemberModal";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  team: ITeam;
  refetch?: () => void;
  isAdmin: boolean;
}

export default function TeamModal({
  isOpen,
  onClose,
  mode,
  team,
  refetch,
  isAdmin,
}: TeamModalProps) {
  const isCreateMode = mode === "create";
  const [selectedMember, setSelectedMember] = useState<IUser | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [modeDelete, setModeDelete] = useState<"member" | "request">("member");

  const {
    data,
    isLoading,
    error,
    refetch: refetchTeamId,
  } = useQuery({
    queryKey: [`team-${team._id}`],
    queryFn: () => teamService.getTeamById({ id: team?._id as string }),
    refetchOnWindowFocus: false,
  });

  const teamData = data?.data || team;

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: teamService.createTeam,
  });
  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: teamService.updateTeamById,
  });

  const { mutate: handleDeleteMember, isPending: isPendingDeleteMember } = useMutation({
    mutationFn: teamService.deleteMemberInTeamById,
  });

  const { mutate: handleAcceptMemberJoinTeam, isPending: isPendingAcceptMemberJoinTeam } =
    useMutation({
      mutationFn: teamService.acceptMemberJoinTeam,
    });

  const { mutate: handleRejectMemberJoinTeam, isPending: isPendingRejectMemberJoinTeam } =
    useMutation({
      mutationFn: teamService.rejectMemberJoinTeam,
    });

  const handleDeleteMemberById = async (memberId: string) => {
    handleDeleteMember(
      { id: team._id, userId: memberId },
      {
        onSuccess: (response) => {
          refetchTeamId && refetchTeamId();
          toast.success(response?.message);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during deleteMemberInTeamById");
        },
      }
    );
  };

  const handleAcceptMemberJoinTeamById = async (user: IUser) => {
    handleAcceptMemberJoinTeam(
      { id: teamData?._id as string, user },
      {
        onSuccess: (response) => {
          refetchTeamId && refetchTeamId();
          toast.success(response?.message);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during acceptMemberJoinTeam");
        },
      }
    );
  };

  const handleRejectMemberJoinTeamById = async (user: IUser) => {
    handleRejectMemberJoinTeam(
      { id: teamData?._id as string, user },
      {
        onSuccess: (response) => {
          refetchTeamId && refetchTeamId();
          toast.success(response?.message);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "An error occurred during acceptMemberJoinTeam");
        },
      }
    );
  };

  const methods = useForm({
    resolver: yupResolver(validationTeamSchema),
    defaultValues: {
      [FORM_TEAM.teamName]: teamData?.teamName || "",
      [FORM_TEAM.description]: teamData?.description || "",
      [FORM_TEAM.teamLeader]: teamData?.teamLeader?.username || "",
    },
  });

  const {
    watch,
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = methods;

  const isFormValid = watch(FORM_TEAM.teamName) && watch(FORM_TEAM.description);
  const isSubmitDisabled = isPendingCreate || isPendingUpdate || !isFormValid;

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (isSubmitDisabled) return;

    if (isCreateMode) {
      handleCreate(data, {
        onSuccess: (response) => {
          console.log("response: ", response);
          refetch && refetch();
          toast.success(response?.message);
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error(error?.message || "Đã có lỗi xảy ra");
        },
      });
    } else {
      handleUpdate(
        { id: team?._id as string, data },
        {
          onSuccess: (response) => {
            console.log("response: ", response);
            refetch && refetch();
            toast.success(response?.message);
            onClose();
          },
          onError: (error) => {
            console.error(error);
            toast.error(error?.message || "Đã có lỗi xảy ra");
          },
        }
      );
    }
  };
  const onErrors = (errors: any) => console.error(errors);

  const handleAction = (member: IUser, mode: "view" | "edit") => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleOpenModalDelete = (member: any, mode: "member" | "request") => {
    setSelectedMember(member);
    setModeDelete(mode);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogCloseButton onClick={onClose} />
          <DialogHeader>
            <DialogTitle>{isCreateMode ? "Tạo Nhóm Mới" : "Chỉnh Sửa Nhóm"}</DialogTitle>
            <DialogDescription>
              {isCreateMode
                ? "Tạo một nhóm mới cho câu lạc bộ công nghệ"
                : "Cập nhật thông tin nhóm"}
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={FORM_TEAM.teamName}>Tên Nhóm</Label>
                <Input
                  id={FORM_TEAM.teamName}
                  {...register(FORM_TEAM.teamName)}
                  placeholder="Nhập tên nhóm"
                  required
                />
                {errors[FORM_TEAM.teamName] && (
                  <div className="text-red-500 !mt-2">
                    {errors?.[FORM_TEAM.teamName]?.message?.toString()}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={FORM_TEAM.description}>Mô Tả</Label>
                <Textarea
                  id={FORM_TEAM.description}
                  {...register(FORM_TEAM.description)}
                  placeholder="Nhập mô tả nhóm"
                  required
                />
                {errors[FORM_TEAM.description] && (
                  <div className="text-red-500 !mt-2">
                    {errors?.[FORM_TEAM.description]?.message?.toString()}
                  </div>
                )}
              </div>

              {!isCreateMode && Number(teamData?.members?.length) > 0 && (
                <div className="space-y-2">
                  <Label htmlFor={FORM_TEAM.teamLeader}>Trưởng Nhóm</Label>
                  <Controller
                    name={FORM_TEAM.teamLeader}
                    control={control}
                    defaultValue=""
                    rules={{ required: "Trưởng nhóm là bắt buộc" }}
                    render={({ field }) => (
                      <Select {...field} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn trưởng nhóm" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamData?.members.map((member) => (
                            <SelectItem key={member._id} value={member._id}>
                              {member.username}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors[FORM_TEAM.teamLeader] && (
                    <div className="text-red-500 !mt-2">
                      {errors?.[FORM_TEAM.teamLeader]?.message?.toString()}
                    </div>
                  )}
                </div>
              )}

              {/* List of Members */}
              {!isCreateMode &&
                (Number(teamData?.members?.length) > 0 ||
                  Number(teamData?.joinRequests?.length) > 0) && (
                  <Tabs defaultValue="members" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger className="lg:text-[14px]" value="members">
                        Thành viên ({teamData?.members?.length})
                      </TabsTrigger>
                      <TabsTrigger className="lg:text-[14px]" value="request">
                        Duyệt yêu cầu ({teamData?.joinRequests?.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="members">
                      <ul className="max-h-48 space-y-2 overflow-y-auto pl-3">
                        {teamData?.members.map((member, index) => (
                          <li
                            key={index}
                            className="flex justify-between transition-all items-center"
                          >
                            <span>{member?.username}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleOpenModalDelete(member, "member")}
                                type="button"
                                variant="ghost"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                              <Button
                                onClick={() => handleAction(member, "view")}
                                type="button"
                                variant="ghost"
                                size="sm"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="request">
                      <ul className="max-h-48 space-y-2 overflow-y-auto pl-3">
                        {teamData?.joinRequests?.map((member, index) => (
                          <li
                            key={index}
                            className="flex justify-between transition-all items-center"
                          >
                            <span>{member?.username}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleRejectMemberJoinTeamById(member)}
                                type="button"
                                variant="ghost"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                              <Button
                                onClick={() => handleAcceptMemberJoinTeamById(member)}
                                type="button"
                                variant="ghost"
                                size="sm"
                              >
                                <Check className="h-4 w-4 text-green-800" />
                              </Button>
                              <Button
                                onClick={() => handleAction(member, "view")}
                                type="button"
                                variant="ghost"
                                size="sm"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                )}

              {/* <div className="space-y-2">
              <Label htmlFor={FORM_TEAM.status}>Trạng Thái</Label>
              <Controller
                name={FORM_TEAM.status}
                control={control}
                defaultValue=""
                rules={{ required: "Trạng thái là bắt buộc" }}
                render={({ field }) => (
                                        <Select {...field} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Hoạt Động</SelectItem>
                      <SelectItem value="On Hold">Tạm Dừng</SelectItem>
                      <SelectItem value="Completed">Hoàn Thành</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors[FORM_TEAM.status] && (
                <div className="text-red-500 !mt-2">
                  {errors?.[FORM_TEAM.status]?.message?.toString()}
                </div>
              )}
            </div> */}

              <DialogFooter>
                <Button type="submit">{isCreateMode ? "Tạo Nhóm" : "Lưu Thay Đổi"}</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={"view"}
        member={selectedMember!}
        isAdmin={isAdmin}
        refetch={refetch}
      />

      {selectedMember && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteMemberById(selectedMember._id)}
          title={modeDelete === "member" ? "Xóa thành viên" : "Xóa yêu cầu tham gia"}
          description={`Bạn có chắc chắn muốn xóa ${
            modeDelete === "member" ? "thành viên" : "yêu cầu"
          } ${selectedMember.username} khỏi nhóm? Hành động này không thể hoàn tác.`}
        />
      )}
    </>
  );
}
