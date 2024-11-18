"use client";

import { publicRoutes, ROUTES } from "@/constants/route";
import useAuthStore from "@/store/auth-store";
import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";

const ProtectRouter = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const redirectToHome = () => {
      if (publicRoutes.includes(pathName as (typeof publicRoutes)[number])) {
        router.push(ROUTES.DASHBOARD);
      }
    };

    const redirectToLogin = () => {
      if (pathName === ROUTES.DASHBOARD) {
        router.push(ROUTES.LANDING_PAGE);
      }
    };

    if (isAuthenticated) {
      redirectToHome();
    } else {
      redirectToLogin();
    }
  }, [isAuthenticated, pathName, router]);

  if (isAuthenticated || publicRoutes.includes(pathName as (typeof publicRoutes)[number])) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectRouter;
