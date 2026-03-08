import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SkeletonCard = ({ delay }: { delay: number }) => (
  <motion.div
    className="flex flex-col gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay }}
  >
    <div className="w-full aspect-video rounded-lg bg-muted-foreground/10 animate-pulse" />
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-muted-foreground/10 animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-2.5 w-4/5 rounded bg-muted-foreground/10 animate-pulse" />
        <div className="h-2 w-3/5 rounded bg-muted-foreground/10 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

const SplashScreen = ({
  onComplete,
}: {
  onComplete: () => void;
  variant?: string;
}) => {
  const [phase, setPhase] = useState<"welcome" | "loading" | "exit">("welcome");

  useEffect(() => {
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("loading"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "loading") {
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(onComplete, 500);
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase === "welcome" && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.p
            className="text-lg font-medium text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Welcome ✨
          </motion.p>
        </motion.div>
      )}

      {phase === "loading" && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-6 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
