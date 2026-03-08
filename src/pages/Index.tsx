import { useState, useCallback } from "react";
import { Mail, Linkedin, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import SmokeBackground from "@/components/SmokeBackground";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";
import signatureDark from "@/assets/signature-dark.png";
import signatureLight from "@/assets/signature-light.png";

const skills = ["Product Management", "AI", "MVP / MLP", "GTM"];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background flex items-center justify-center px-4 sm:px-6 py-4 relative">
      {showSplash && <SplashScreen variant="home" onComplete={handleSplashComplete} />}
      <ThemeToggle />
      <SmokeBackground />
      <div className="max-w-2xl w-full relative z-10 animate-fade-in" style={{ animationDuration: '0.8s', animationDelay: showSplash ? '1.5s' : '0s', animationFillMode: 'both' }}>
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2 sm:mb-4">
          HEY THERE!
        </p>

        <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4 text-foreground">
          I'm <span className="text-muted-foreground/80">Bash.</span>
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 sm:mb-6 max-w-xl">{"Bashayer Noury is a Product Manager based in 🇰🇼"}</p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-8">
          {skills.map((skill) => <span
            key={skill}
            className="px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-foreground/30 text-xs sm:text-sm text-foreground/70 font-medium backdrop-blur-sm">
              {skill}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <a
            href="https://wa.me/96597304442"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/70 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} className="sm:w-[22px] sm:h-[22px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/bashayernoury/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-foreground/40 text-foreground hover:bg-secondary hover:border-foreground/60 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="sm:w-[22px] sm:h-[22px]" />
          </a>
          <a
            href="mailto:bashayernoury@gmail.com"
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-foreground/40 text-foreground hover:bg-secondary hover:border-foreground/60 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} className="sm:w-[22px] sm:h-[22px]" />
          </a>
          <Link
            to="/card"
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-foreground/40 text-foreground hover:bg-secondary hover:border-foreground/60 transition-colors"
            aria-label="My Card"
          >
            <QrCode size={20} className="sm:w-[22px] sm:h-[22px]" />
          </Link>
        </div>

        <div className="border-t border-border pt-4 sm:pt-6 flex items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs sm:text-sm italic whitespace-pre-line">{"Inspired by James Clear's 1% rule, I've made small improvement a daily ritual.\n"}</p>
          <img src={signatureDark} alt="BN Signature" className="h-10 sm:h-16 w-auto opacity-60 dark:hidden flex-shrink-0" />
          <img src={signatureLight} alt="BN Signature" className="h-10 sm:h-16 w-auto opacity-60 hidden dark:block flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default Index;
