"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="bg-destructive/10 p-4 rounded-full w-fit mx-auto">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold">Đã xảy ra lỗi!</h2>
        <p className="text-muted-foreground">
          {error.message || "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại."}
        </p>
        <Button onClick={reset} className="mx-auto">
          Thử lại
        </Button>
      </div>
    </div>
  );
}
