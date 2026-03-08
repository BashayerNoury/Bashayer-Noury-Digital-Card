import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import signatureDark from "@/assets/signature-dark.png";
import signatureLight from "@/assets/signature-light.png";

const SignatureSplash = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 800);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "enter" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle smoke effect */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(0 0% 60% / 0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Signature with reveal animation */}
            <div className="relative overflow-hidden">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              >
                <img
                  src={isDark ? signatureDark : signatureLight}
                  alt="Signature"
                  className="h-24 sm:h-32 w-auto object-contain"
                />
              </motion.div>

              {/* Pen cursor line */}
              <motion.div
                className="absolute top-0 bottom-0 w-[2px] bg-foreground/60"
                style={{ filter: "blur(0.5px)" }}
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              />
            </div>

            {/* Underline */}
            <motion.div
              className="mt-4 h-px bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              style={{ width: "160px" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureSplash;
