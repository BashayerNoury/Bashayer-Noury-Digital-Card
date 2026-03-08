import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Welcome splash — only shown on first-ever visit (localStorage)
const WelcomeSplash = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 1200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
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
    </AnimatePresence>
  );
};

export default WelcomeSplash;

// Hook to check if this is the first-ever visit
export const useIsFirstVisit = (): boolean => {
  const [isFirst] = useState(() => {
    if (localStorage.getItem("visited")) return false;
    localStorage.setItem("visited", "true");
    return true;
  });
  return isFirst;
};
