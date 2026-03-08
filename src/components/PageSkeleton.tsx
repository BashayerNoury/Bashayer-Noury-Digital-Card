import { motion, AnimatePresence } from "framer-motion";

const HomeSkeleton = () => (
  <div className="max-w-2xl w-full px-4 sm:px-6">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted-foreground/10 animate-pulse flex-shrink-0" />
      <div className="space-y-2">
        <div className="h-2.5 w-20 rounded bg-muted-foreground/10 animate-pulse" />
        <div className="h-6 w-32 rounded bg-muted-foreground/10 animate-pulse" />
      </div>
    </div>
    <div className="h-3 w-64 rounded bg-muted-foreground/10 animate-pulse mb-6" />
    <div className="flex gap-2 mb-8">
      {[20, 14, 18, 14].map((w, i) => (
        <div key={i} className="h-8 rounded-full bg-muted-foreground/10 animate-pulse" style={{ width: `${w * 4}px` }} />
      ))}
    </div>
    <div className="flex gap-3 mb-10">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-muted-foreground/10 animate-pulse" />
      ))}
    </div>
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
    <div className="w-24 h-24 rounded-full bg-muted-foreground/10 animate-pulse" />
    <div className="flex flex-col items-center gap-2 -mt-2">
      <div className="h-5 w-40 rounded bg-muted-foreground/10 animate-pulse" />
      <div className="h-6 w-28 rounded-full bg-muted-foreground/10 animate-pulse" />
    </div>
    <div className="w-[220px] h-[220px] rounded-lg bg-muted-foreground/10 animate-pulse" />
    <div className="flex flex-col items-center gap-3 w-full mt-2">
      <div className="h-11 w-full rounded-full bg-muted-foreground/10 animate-pulse" />
      <div className="h-11 w-full rounded-full bg-muted-foreground/10 animate-pulse" />
      <div className="h-5 w-32 rounded bg-muted-foreground/10 animate-pulse mt-1" />
    </div>
  </div>
);

const NotFoundSkeleton = () => (
  <div className="flex flex-col items-center text-center px-4">
    <div className="h-3 w-16 rounded bg-muted-foreground/10 animate-pulse mb-4" />
    <div className="h-16 sm:h-20 w-40 rounded bg-muted-foreground/10 animate-pulse mb-4" />
    <div className="h-3 w-56 rounded bg-muted-foreground/10 animate-pulse mb-8" />
    <div className="h-11 w-36 rounded-lg bg-muted-foreground/10 animate-pulse" />
  </div>
);

const skeletons = {
  home: HomeSkeleton,
  card: CardSkeleton,
  notfound: NotFoundSkeleton,
};

interface PageSkeletonProps {
  variant?: keyof typeof skeletons;
  loading: boolean;
}

const PageSkeleton = ({ variant = "home", loading }: PageSkeletonProps) => {
  const Skeleton = skeletons[variant];
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="skeleton"
          className="fixed inset-0 z-[90] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Skeleton />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageSkeleton;
