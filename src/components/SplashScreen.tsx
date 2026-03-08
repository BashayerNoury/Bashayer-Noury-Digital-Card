import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "@/assets/profile.jpeg";

const SplashScreen = ({
  onComplete,
}: {
  onComplete: () => void;
  variant?: string;
}) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-24 h-24 rounded-full bg-primary/20 absolute inset-0 blur-xl" />
            <img
              src={profileImg}
              alt="Bashayer Noury"
              className="relative w-24 h-24 rounded-full object-cover border-4 border-background shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.4)]"
            />
          </motion.div>
          <motion.p
            className="text-lg font-medium text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            Welcome ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;