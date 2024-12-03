export const statusMap = Object.freeze({
  available: "Có sẵn",
  "in use": "Đang sử dụng",
  unavailable: "Không sử dụng",
  "pending": "Đang chờ duyệt",
});

export const conditionsMap = Object.freeze({
  good: "Tốt",
  normal: "Bình thường",
  poor: "Kém",
});

export const FORM_DEVICE = Object.freeze({
  name: "name",
  type: "type",
  status: "status",
  statusHealth: "statusHealth",
} as const);


export const deviceTypeMap = Object.freeze({
  laptop: "Laptop",
  desktop: "Máy tính để bàn",
  "mobile-device": "Thiết bị di động",
  projector: "Máy chiếu",
  cable: "Dây cáp",
  other: "Khác",
});
