export const statusMap = Object.freeze({
  available: "Có sẵn",
  "pending approval": "Đang chờ duyệt",
  "in use": "Đang sử dụng",
  unavailable: "Không sử dụng",
});

export const conditionsMap = Object.freeze({
  Excellent: "Tốt",
  Good: "Trung bình",
  Fair: "Yếu",
  Poor: "Kém",
});

export const FORM_DEVICE = Object.freeze({
  name: "name",
  type: "type",
  status: "status",
  condition: "condition",
  note: "note",
} as const);
