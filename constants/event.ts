export const FORM_EVENT = Object.freeze({
  eventName: "eventName",
  location: "location",
  description: "description",
  eventDate: "eventDate",
  startTime: "startTime",
  host: "host",
  registeredParticipants: "attendees",
  statusEvent: "statusEvent",
  statusRequest: "statusRequest",
} as const);

export const STATUS_EVENT_TRANSLATE = Object.freeze({
  pending: "Đang chờ duyệt",
  passed: "Đã duyệt",
  canceled: "Hủy bỏ",
} as const);

export const REQUEST_EVENT_TRANSLATE = Object.freeze({
  upcoming: "Sắp tới",
  passed: "Đã qua",
  canceled: "Hủy bỏ",
} as const);
