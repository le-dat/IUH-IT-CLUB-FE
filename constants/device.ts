export const statusMap = Object.freeze({
  Available: "Có sẵn",
  "Pending Approval": "Đang chờ duyệt",
  Inuse: "Đang sử dụng",
  OutofService: "Không sử dụng",
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
