import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Eye, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { IEvent } from "@/types/event-type";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: IEvent;
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
            <h3 className="font-semibold text-lg">{event.eventName}</h3>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          </div>
          <Badge
            variant={
              event.statusEvent === "coming"
                ? "secondary"
                : event.statusEvent === "done"
                ? "default"
                : "destructive"
            }
            className="shrink-0"
          >
            {event.statusEvent === "coming" ? "Sắp tới" : "Đã qua"}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(event.eventDate)}</span>
            <Clock className="h-4 w-4 text-muted-foreground ml-2" />
            <span className="text-sm">{event.startTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {event?.registeredParticipants?.length} {t("events.attendees")}
            </span>
          </div>
          {event.statusRequest === "pending-approval" && event.host && (
            <p className="text-sm text-muted-foreground">
              {t("events.requestedBy")}: {event?.host?.username}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={onView}
          >
            <Eye className="h-4 w-4" />
          </Button> */}
          {isAdmin ? (
            <>
              {event.statusRequest === "pending-approval" ? (
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
              variant={event.statusRequest === "approved" ? "default" : "outline"}
              className="flex-1"
              disabled={event.statusRequest !== "approved" || isRegistered}
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
