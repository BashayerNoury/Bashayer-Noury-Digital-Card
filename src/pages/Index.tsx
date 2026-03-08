import { useState, useCallback } from "react";
import { Mail, Linkedin, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import SmokeBackground from "@/components/SmokeBackground";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";
import signatureDark from "@/assets/signature-dark.png";
import signatureLight from "@/assets/signature-light.png";
import profileImg from "@/assets/profile.jpeg";

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
        <div className="flex items-center gap-4 mb-2 sm:mb-4">
          <img
            src={profileImg}
            alt="Bashayer Noury"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-foreground/20 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.3)]"
          />
          <div>
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-1">
              HEY THERE!
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground">
              I'm <span className="text-muted-foreground/80">Bash.</span>
            </h1>
          </div>
        </div>

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
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-[22px] sm:h-[22px]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
