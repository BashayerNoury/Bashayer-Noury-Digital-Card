import { useState, useCallback } from "react";
import { QrcodeSVG } from "react-qrcode-pretty";
import { Download, Send, Check, Link } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import SmokeBackground from "@/components/SmokeBackground";
import SplashScreen from "@/components/SplashScreen";
import profileImg from "@/assets/profile.jpeg";

const Card = () => {
  const [copied, setCopied] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    if (sessionStorage.getItem("splashShown")) return false;
    sessionStorage.setItem("splashShown", "true");
    return true;
  });

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
      {showSplash && <SplashScreen variant="card" onComplete={handleSplashComplete} />}
      <ThemeToggle />
      <SmokeBackground />

      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: showSplash ? 2.2 : 0.4, ease: "easeOut" }}
      >
        {/* Profile photo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/20 absolute inset-0 blur-xl" />
          <img
            src={profileImg}
            alt="Bashayer Noury"
            className="relative w-24 h-24 rounded-full object-cover ring-2 ring-foreground/10 shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.4)]"
          />
        </div>

        {/* Name & title */}
        <div className="text-center -mt-2">
          <h1 className="text-2xl font-bold text-foreground mb-1">Bashayer Noury</h1>
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide">
            Product Manager
          </span>
        </div>

        {/* QR */}
        <div className="relative">
          <div className="w-[220px] h-[220px] overflow-hidden flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
            <QrcodeSVG
              value={siteUrl}
              variant={{ eyes: "gravity", body: "dots" }}
              color="hsl(var(--foreground))"
              bgColor="transparent"
              padding={0}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs mt-2">
          <div
            className={`flex items-center w-full rounded-full transition-all duration-300 ${
              copied
                ? "bg-accent"
                : "bg-foreground/10 border border-foreground/20"
            }`}
          >
            <span className={`flex-1 pl-5 py-3 text-sm font-medium ${copied ? "text-accent-foreground" : "text-foreground"}`}>
              {copied ? "Copied!" : "bybash.lovable.app"}
            </span>
            <button
              onClick={handleShare}
              className={`flex items-center justify-center w-10 h-10 rounded-full mr-1 transition-all ${
                copied
                  ? "bg-accent-foreground/20 text-accent-foreground"
                  : "bg-foreground text-background hover:opacity-90"
              }`}
              aria-label="Share"
            >
              {copied ? <Check size={16} /> : <Send size={16} />}
            </button>
          </div>
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
      </motion.div>
    </div>
  );
};

export default Card;
