import { useState, useCallback } from "react";
import { QR } from "react-qr-rounded";
import { Download, Share2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";
import profileImg from "@/assets/profile.jpeg";

const Card = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const siteUrl = "https://bybash.lovable.app";

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Bashayer Noury
TEL;TYPE=CELL:+96597304442
EMAIL:bashayernoury@gmail.com
URL:https://www.linkedin.com/in/bashayernoury/
URL:${siteUrl}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Bashayer_Noury.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bashayer Noury", url: siteUrl });
      } else {
        await navigator.clipboard.writeText(siteUrl);
        alert("Link copied to clipboard!");
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
      <ThemeToggle />
      {showSplash && <SplashScreen variant="card" onComplete={handleSplashComplete} />}

      <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDuration: '0.8s', animationDelay: showSplash ? '1.5s' : '0s', animationFillMode: 'both' }}>

        {/* Profile photo */}
        <div className="relative -mb-2 z-10">
          <img
            src={profileImg}
            alt="Bashayer Noury"
            className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-lg"
          />
        </div>

        {/* Dark card with QR */}
        <div className="relative animate-scale-in" style={{ animationDuration: '0.6s', animationDelay: showSplash ? '1.8s' : '0.3s', animationFillMode: 'both' }}>
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-muted-foreground/30 via-foreground/20 to-muted-foreground/30 animate-[pulse_3s_ease-in-out_infinite] blur-md" />
          <div className="relative bg-foreground rounded-2xl p-6 pt-10 flex flex-col items-center gap-4 shadow-xl">
            <QR
              color="#ffffff"
              backgroundColor="transparent"
              rounding={100}
              errorCorrectionLevel="H"
              style={{ width: 200, height: 200 }}
            >
              {siteUrl}
            </QR>
            <h1 className="text-lg font-bold text-background tracking-wide uppercase">
              Bashayer Noury
            </h1>
            <p className="text-background/60 text-xs tracking-wider -mt-3">
              Product Manager
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
          >
            Share Link
            <Share2 size={16} />
          </button>
          <button
            onClick={handleSaveContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-foreground/40 text-foreground font-medium hover:bg-secondary hover:border-foreground/60 transition-colors text-sm"
          >
            <Download size={16} />
            Save Contact
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
