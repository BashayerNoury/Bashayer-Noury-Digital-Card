import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SplashVariant = "home" | "card" | "notfound";

const shimmerClass = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent";

const Block = ({ className }: { className: string }) => (
  <div className={`rounded bg-muted-foreground/10 ${shimmerClass} ${className}`} />
);

const HomeSkeleton = () => (
  <div className="h-screen bg-background flex items-center justify-center px-4 sm:px-6 py-4">
    <div className="max-w-2xl w-full">
      <Block className="h-3 w-24 mb-4" />
      <Block className="h-10 sm:h-14 w-48 mb-4" />
      <Block className="h-4 w-72 mb-6" />
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Block key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className="h-11 w-28 rounded-lg" />
        ))}
      </div>
      <div className="border-t border-border/30 pt-6 flex items-center justify-between">
        <Block className="h-3 w-48" />
        <Block className="h-12 w-20" />
      </div>
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
    <div className="flex flex-col items-center gap-6">
      <Block className="h-20 w-20 rounded-full" />
      <Block className="h-[280px] w-[252px] rounded-2xl" />
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Block className="h-12 w-full rounded-full" />
        <Block className="h-12 w-full rounded-full" />
      </div>
    </div>
  </div>
);

const NotFoundSkeleton = () => (
  <div className="h-screen bg-background flex items-center justify-center px-4 sm:px-6 py-4">
    <div className="text-center">
      <Block className="h-3 w-16 mx-auto mb-4" />
      <Block className="h-16 sm:h-20 w-40 mx-auto mb-4" />
      <Block className="h-4 w-64 mx-auto mb-8" />
      <Block className="h-11 w-36 mx-auto rounded-lg" />
    </div>
  </div>
);

const skeletons: Record<SplashVariant, React.FC> = {
  home: HomeSkeleton,
  card: CardSkeleton,
  notfound: NotFoundSkeleton,
};

const SplashScreen = ({
  onComplete,
  variant = "home",
}: {
  onComplete: () => void;
  variant?: SplashVariant;
}) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const Skeleton = skeletons[variant];

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Skeleton />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
