import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { REQUEST_EVENT_TRANSLATE } from "@/constants/event";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDate } from "@/lib/utils";
import { IEvent } from "@/types/event-type";
import { motion } from "framer-motion";
import { Calendar, Clock, Edit, Eye, MapPin, Trash2, Users } from "lucide-react";

interface EventCardProps {
  event: IEvent;
  isAdmin: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRegister: () => void;
  isRegistered: boolean;
  index: number;
  isLoading: boolean;
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
  isLoading,
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
              event.statusEvent === "upcoming"
                ? "secondary"
                : event.statusEvent === "passed"
                ? "default"
                : "destructive"
            }
            className="shrink-0"
          >
            {REQUEST_EVENT_TRANSLATE[event.statusEvent]}
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
          {event?.statusRequest === "pending" && event.host && (
            <p className="text-sm text-muted-foreground">
              {t("events.requestedBy")}: {event?.host?.username}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          {isAdmin ? (
            <>
              {event.statusRequest === "pending" ? (
                <Button onClick={onEdit} className="flex-1" disabled={isLoading}>
                  {t("events.reviewRequest")}
                </Button>
              ) : (
                <>
                  {event?.statusEvent !== "passed" && (
                    <Button variant="ghost" size="sm" onClick={onEdit} disabled={isLoading}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={onDelete} disabled={isLoading}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </>
              )}
            </>
          ) : (
            <Button
              variant={event.statusRequest === "approved" ? "default" : "outline"}
              className="flex-1"
              disabled={event.statusRequest !== "approved" || isRegistered || isLoading}
              onClick={onRegister}
            >
              {isRegistered ? t("events.registered") : t("events.register")}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
