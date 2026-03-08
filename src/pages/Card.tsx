import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";

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

  const delay = showSplash ? 2.5 : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
      <ThemeToggle />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Bashayer Noury</h1>
          <p className="text-muted-foreground text-sm tracking-wide">Product Manager</p>
        </div>

        {/* QR Code with entrance + idle animation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Pulsing glow ring */}
          <motion.div
            className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-muted-foreground/30 via-foreground/20 to-muted-foreground/30 blur-md"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Gentle floating idle */}
          <motion.div
            className="relative p-6 bg-white rounded-2xl shadow-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
          >
            <QRCodeSVG
              value={siteUrl}
              size={220}
              level="H"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6 }}
        >
          Scan to visit my portfolio
        </motion.p>

        <motion.div
          className="flex flex-col gap-3 w-full max-w-xs"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.8, duration: 0.5 }}
        >
          <button
            onClick={handleSaveContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-primary/70 text-primary-foreground font-medium hover:opacity-90 transition-opacity bg-primary"
          >
            <Download size={18} />
            Save Contact
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-foreground/40 text-foreground font-medium hover:bg-secondary hover:border-foreground/60 transition-colors text-sm"
          >
            ← Go to Portfolio
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Card;
