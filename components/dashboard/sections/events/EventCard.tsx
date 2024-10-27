import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Eye, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    status: string;
    description: string;
    requester?: string;
  };
  isAdmin: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRegister: () => void;
  isRegistered: boolean;
  index: number;
}

export default function EventCard({
  event,
  isAdmin,
  onView,
  onEdit,
  onDelete,
  onRegister,
  isRegistered,
  index,
}: EventCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="p-6 group hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          </div>
          <Badge
            variant={
              event.status === "Pending Approval"
                ? "secondary"
                : event.status === "Approved"
                ? "default"
                : "destructive"
            }
          >
            {event.status === "Pending Approval" ? "Chờ duyệt" : "Đã duyệt"}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.date}</span>
            <Clock className="h-4 w-4 text-muted-foreground ml-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {event.attendees} {t("events.attendees")}
            </span>
          </div>
          {event.status === "Pending Approval" && event.requester && (
            <p className="text-sm text-muted-foreground">
              {t("events.requestedBy")}: {event.requester}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onView}
          >
            <Eye className="h-4 w-4" />
          </Button> */}
          {isAdmin ? (
            <>
              {event.status === "Pending Approval" ? (
                <Button onClick={onEdit} className="flex-1">
                  {t("events.reviewRequest")}
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={onEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Button
              variant={event.status === "Approved" ? "default" : "outline"}
              className="flex-1"
              disabled={event.status !== "Approved" || isRegistered}
              onClick={onRegister}
            >
              {isRegistered ? t("events.registered") : t("events.register")}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
