import { useState, useCallback } from "react";
import { QrcodeSVG } from "react-qrcode-pretty";
import { Download, Send, Check, Copy } from "lucide-react";
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

  const handleCopy = () => copyToClipboard();

  const copyToClipboard = async () => {
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

  const handleShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: "Bashayer Noury", url: siteUrl });
    } catch {
      // Share cancelled
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background flex flex-col items-center justify-center px-6 relative">
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
        <div className="flex flex-col items-center gap-3 w-full max-w-sm mt-2">
          <div className="flex items-center w-full rounded-2xl border border-foreground/30 shadow-[0_0_15px_rgba(var(--foreground-rgb),0.15),inset_0_0_15px_rgba(var(--foreground-rgb),0.05)] bg-foreground/5 py-2 pl-7 pr-2 transition-all duration-300 ring-1 ring-foreground/10 ring-offset-2 ring-offset-background">
            <span className={`flex-1 py-2 pr-3 text-sm sm:text-base font-medium tracking-tight ${copied ? "text-primary" : "text-foreground"}`}>
              {copied ? "Copied!" : "bybash.lovable.app"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center w-11 h-11 rounded-full transition-all bg-foreground/10 text-foreground hover:bg-foreground/15"
                aria-label="Copy"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center w-11 h-11 rounded-full transition-all bg-foreground text-background hover:opacity-90"
                aria-label="Share"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <button
            onClick={handleSaveContact}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl border border-foreground/30 shadow-[0_0_15px_rgba(var(--foreground-rgb),0.15),inset_0_0_15px_rgba(var(--foreground-rgb),0.05)] ring-1 ring-foreground/10 ring-offset-2 ring-offset-background text-foreground font-medium hover:bg-foreground/5 transition-all text-sm"
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
      <p className="absolute bottom-3 text-muted-foreground text-[10px] sm:text-xs">
        Made with 🤍 In{" "}
        <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
          Lovable
        </a>
      </p>
    </div>
  );
};

export default Card;
