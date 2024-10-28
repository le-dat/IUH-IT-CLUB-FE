import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, Edit, Trash2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface TeamCardProps {
  team: {
    id: number;
    name: string;
    members: number;
    projects: number;
    lead: string;
    status: string;
    description: string;
  };
  isAdmin: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onJoin: () => void;
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
            <h3 className="font-semibold text-lg">{team.name}</h3>
            <p className="text-sm text-muted-foreground">Trưởng nhóm: {team.lead}</p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {team.status}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{team.members} thành viên</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{team.projects} dự án</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{team.description}</p>
        </div>

        <div className="mt-6 flex gap-2">
          {!isAdmin && (
            <Button
              className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
              variant={hasJoinRequest ? "secondary" : "outline"}
              onClick={onJoin}
              disabled={hasJoinRequest}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {hasJoinRequest ? "Đã gửi yêu cầu" : "Tham gia nhóm"}
            </Button>
          )}
          {/* <Button variant="ghost" size="sm" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button> */}
          {isAdmin && (
            <>
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
