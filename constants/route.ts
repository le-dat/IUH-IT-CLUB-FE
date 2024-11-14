export const ROUTES = Object.freeze({
  LANDING_PAGE: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const);

export const publicRoutes = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.LANDING_PAGE,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
];
