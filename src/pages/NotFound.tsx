import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import SmokeBackground from "@/components/SmokeBackground";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";

const NotFound = () => {
  const location = useLocation();
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
      <div className="max-w-2xl w-full relative z-10 animate-fade-in text-center" style={{ animationDuration: '0.8s', animationDelay: showSplash ? '1.5s' : '0s', animationFillMode: 'both' }}>
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
      </div>
    </div>
  );
};

export default NotFound;
