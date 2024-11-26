export const FORM_TEAM = Object.freeze({
  teamName: "teamName",
  description: "description",
  status: "status",
} as const);

export const TEAM_STATUS = Object.freeze({
  open: "Đang hoạt động",
  closed: "Dừng hoạt động",
} as const);
