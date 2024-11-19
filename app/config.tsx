"use client";
import ProtectRouter from "@/provider/protect-router-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React, { Suspense } from "react";
import { Toaster } from "sonner";

const Config = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <ReactQueryProvider>
        <ProtectRouter>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster
                className='toaster pointer-events-auto [&[data-close-button="true"]]:right-0'
                position="top-right"
                richColors
                closeButton
                duration={3000}
              />
            </ThemeProvider>
          </TooltipProvider>
        </ProtectRouter>
      </ReactQueryProvider>
    </Suspense>
  );
};

export default Config;
