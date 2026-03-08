import { useState, useCallback } from "react";
import { QrcodeSVG } from "react-qrcode-pretty";
import { Download, Send, Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";
import profileImg from "@/assets/profile.jpeg";

const Card = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [copied, setCopied] = useState(false);

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
        return;
      }
    } catch {
      // Share cancelled or failed, fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(siteUrl);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = siteUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-muted-foreground/20 via-muted-foreground/10 to-muted-foreground/20 animate-[pulse_3s_ease-in-out_infinite] blur-md" />
          <div className="relative bg-card rounded-2xl p-6 pt-10 flex flex-col items-center gap-4 shadow-xl border border-border">
            <div className="w-[200px] h-[200px] overflow-hidden flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
              <QrcodeSVG
                value={siteUrl}
                variant={{ eyes: "gravity", body: "dots" }}
                color="hsl(var(--foreground))"
                bgColor="transparent"
                padding={0}
              />
            </div>
            <h1 className="text-lg font-bold text-foreground tracking-wide uppercase">
              Bashayer Noury
            </h1>
            <p className="text-muted-foreground text-xs tracking-wider -mt-3">
              Product Manager
            </p>
          </div>
        </div>

        {/* URL display */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs mt-2">
          <button
            onClick={handleShare}
            className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-medium transition-all duration-300 text-sm ${
              copied
                ? "bg-accent text-accent-foreground scale-95"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                bybash.lovable.app
                <Share2 size={16} className="ml-1 opacity-70" />
              </>
            )}
          </button>
          <button
            onClick={handleSaveContact}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border-2 border-foreground/40 text-foreground font-medium hover:bg-secondary hover:border-foreground/60 transition-colors text-sm"
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
