"use client";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import authService from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import Error from "../../error";
import Loading from "../../loading";

const VerifySuccessPage: React.FC = () => {
  const params = useSearchParams();
  const token = params?.get("token") || "";

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [`verify-email-${token}`],
    queryFn: () => authService.verifyEmail({ token }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} reset={() => refetch()} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Xác Minh Thành Công</h1>
        <p className="text-gray-700 mb-4">Email của bạn đã được xác minh thành công.</p>
        <Button asChild>
          <Link href={ROUTES.LOGIN} className='cursor-pointer'>Về Trang Đăng Nhập</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default VerifySuccessPage;
