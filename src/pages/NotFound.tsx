import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import SmokeBackground from "@/components/SmokeBackground";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";

const NotFound = () => {
  
  const [showSplash, setShowSplash] = useState(() => {
    if (sessionStorage.getItem("splashShown")) return false;
    sessionStorage.setItem("splashShown", "true");
    return true;
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);


  return (
    <div className="h-screen overflow-hidden bg-background flex items-center justify-center px-4 sm:px-6 py-4 relative">
      {showSplash && <SplashScreen variant="notfound" onComplete={handleSplashComplete} />}
      <ThemeToggle />
      <SmokeBackground />
      <motion.div
        className="max-w-2xl w-full relative z-10 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: showSplash ? 2.2 : 0.4, ease: "easeOut" }}
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2 sm:mb-4">
          OOPS!
        </p>
        <h1 className="text-6xl sm:text-8xl font-bold mb-2 sm:mb-4 text-foreground">
          4<span className="text-muted-foreground/80">0</span>4
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-foreground/40 text-foreground text-sm sm:text-base font-medium hover:bg-secondary hover:border-foreground/60 transition-colors"
        >
          <Home size={16} className="sm:w-[18px] sm:h-[18px]" />
          Back Home
        </Link>
      </motion.div>
      <div className="absolute bottom-3 flex flex-col items-center gap-0.5">
        <p className="text-muted-foreground text-[10px] sm:text-xs">
          Made with <img src="https://lovable.dev/favicon.ico" alt="Lovable" className="inline w-3.5 h-3.5 sm:w-4 sm:h-4 align-middle mx-0.5" /> In{" "}
          <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Lovable
          </a>
        </p>
        <p className="text-muted-foreground/40 text-[8px] sm:text-[10px]">v1.0.0</p>
      </div>
    </div>
  );
};

export default NotFound;
