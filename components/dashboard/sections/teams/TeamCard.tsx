import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TEAM_STATUS } from "@/constants/team";
import { ITeam } from "@/types/team-type";
import { motion } from "framer-motion";
import { Edit, Eye, Trash2, UserPlus, Users } from "lucide-react";

interface TeamCardProps {
  team: ITeam;
  isAdmin: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onJoin: () => void;
  onLeave: () => void;
  hasJoin: boolean;
  hasJoinRequest: boolean;
  index: number;
}

export default function TeamCard({
  team,
  isAdmin,
  onView,
  onEdit,
  onDelete,
  onJoin,
  onLeave,
  hasJoin,
  hasJoinRequest,
  index,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="p-6 group hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{team.teamName}</h3>
            {team?.teamLeader && (
              <p className="text-sm text-muted-foreground">
                Trưởng nhóm: {team?.teamLeader?.username}
              </p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">{team.description}</p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {TEAM_STATUS?.[team.status]}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{team?.members?.length} thành viên</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          {!isAdmin && !hasJoin && !hasJoinRequest && (
            <Button
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              variant={"outline"}
              onClick={onJoin}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Tham gia nhóm
            </Button>
          )}

          {!isAdmin && !hasJoin && hasJoinRequest && (
            <Button
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              variant={"secondary"}
              disabled={hasJoinRequest}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Đã gửi yêu cầu
            </Button>
          )}

          {!isAdmin && hasJoin && !hasJoinRequest && (
            <Button
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              variant={"secondary"}
              onClick={onLeave}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Đã tham gia
            </Button>
          )}

          {/* {!isAdmin && !hasJoin && !hasJoinRequest && (
            <Button
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              variant={hasJoinRequest ?  : "outline"}
              onClick={hasJoinRequest ? onLeave : onJoin}
              disabled={hasJoinRequest}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {hasJoinRequest ? "Đã tham gia nhóm" : "Tham gia nhóm"}
            </Button>
          )} */}

          {isAdmin && (
            <>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
