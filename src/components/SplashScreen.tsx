import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeSkeleton = () => (
  <div className="max-w-2xl w-full px-4 sm:px-6">
    {/* Profile row */}
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted-foreground/10 animate-pulse flex-shrink-0" />
      <div className="space-y-2">
        <div className="h-2.5 w-20 rounded bg-muted-foreground/10 animate-pulse" />
        <div className="h-6 w-32 rounded bg-muted-foreground/10 animate-pulse" />
      </div>
    </div>
    {/* Bio */}
    <div className="h-3 w-64 rounded bg-muted-foreground/10 animate-pulse mb-6" />
    {/* Skill pills */}
    <div className="flex gap-2 mb-8">
      {[20, 14, 18, 14].map((w, i) => (
        <div key={i} className="h-8 rounded-full bg-muted-foreground/10 animate-pulse" style={{ width: `${w * 4}px` }} />
      ))}
    </div>
    {/* Social buttons */}
    <div className="flex gap-3 mb-10">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-muted-foreground/10 animate-pulse" />
      ))}
    </div>
    {/* Quote divider */}
    <div className="border-t border-muted-foreground/10 pt-5 flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-2.5 w-4/5 rounded bg-muted-foreground/10 animate-pulse" />
        <div className="h-2 w-24 rounded bg-muted-foreground/10 animate-pulse" />
      </div>
      <div className="h-12 w-20 rounded bg-muted-foreground/10 animate-pulse flex-shrink-0" />
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="flex flex-col items-center gap-8 px-6 w-full max-w-xs mx-auto">
    {/* Profile photo */}
    <div className="w-24 h-24 rounded-full bg-muted-foreground/10 animate-pulse" />
    {/* Name & badge */}
    <div className="flex flex-col items-center gap-2 -mt-2">
      <div className="h-5 w-40 rounded bg-muted-foreground/10 animate-pulse" />
      <div className="h-6 w-28 rounded-full bg-muted-foreground/10 animate-pulse" />
    </div>
    {/* QR placeholder */}
    <div className="w-[220px] h-[220px] rounded-lg bg-muted-foreground/10 animate-pulse" />
    {/* Action buttons */}
    <div className="flex flex-col items-center gap-3 w-full mt-2">
      <div className="h-11 w-full rounded-full bg-muted-foreground/10 animate-pulse" />
      <div className="h-11 w-full rounded-full bg-muted-foreground/10 animate-pulse" />
      <div className="h-5 w-32 rounded bg-muted-foreground/10 animate-pulse mt-1" />
    </div>
  </div>
);

const NotFoundSkeleton = () => (
  <div className="flex flex-col items-center text-center px-4">
    {/* OOPS label */}
    <div className="h-3 w-16 rounded bg-muted-foreground/10 animate-pulse mb-4" />
    {/* 404 */}
    <div className="h-16 sm:h-20 w-40 rounded bg-muted-foreground/10 animate-pulse mb-4" />
    {/* Subtitle */}
    <div className="h-3 w-56 rounded bg-muted-foreground/10 animate-pulse mb-8" />
    {/* Button */}
    <div className="h-11 w-36 rounded-lg bg-muted-foreground/10 animate-pulse" />
  </div>
);

const SplashScreen = ({
  onComplete,
  variant = "home",
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
      }, 1200);
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
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {variant === "card" ? <CardSkeleton /> : variant === "notfound" ? <NotFoundSkeleton /> : <HomeSkeleton />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
