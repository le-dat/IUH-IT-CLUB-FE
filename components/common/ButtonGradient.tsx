import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hasArrow?: boolean;
};

const ButtonGradient: React.FC<Props> = ({ hasArrow, children, ...rest }) => {
  return (
    <Button {...rest} className={`w-full group relative overflow-hidden ${rest.className}`}>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
      <div className="relative flex items-center justify-center">
        {children}
        {hasArrow && (
          <>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            <motion.div
              className="absolute right-0 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <div className="w-1 h-1 bg-primary-foreground rounded-full" />
            </motion.div>
          </>
        )}
      </div>
    </Button>
  );
};

export default ButtonGradient;