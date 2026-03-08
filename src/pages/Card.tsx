import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import SplashScreen from "@/components/SplashScreen";

const Card = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [qrRevealed, setQrRevealed] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Trigger QR reveal sequence after splash
    setTimeout(() => setQrRevealed(true), 600);
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <ThemeToggle />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay }}
      >
        {/* Name with cinematic entrance */}
        <motion.div
          className="text-center space-y-1"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl font-bold text-foreground">Bashayer Noury</h1>
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">Product Manager</p>
        </motion.div>

        {/* Premium QR Code Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5, rotateX: 40 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ perspective: 800 }}
        >
          {/* Outer holographic ring */}
          <motion.div
            className="absolute -inset-4 rounded-3xl"
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--muted-foreground) / 0.1), hsl(var(--foreground) / 0.15), hsl(var(--muted-foreground) / 0.05), hsl(var(--foreground) / 0.2), hsl(var(--muted-foreground) / 0.1))",
              filter: "blur(12px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner glow pulse */}
          <motion.div
            className="absolute -inset-2 rounded-2xl"
            style={{
              background: "radial-gradient(circle, hsl(var(--foreground) / 0.08) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* QR Card */}
          <motion.div
            className="relative p-6 bg-white rounded-2xl shadow-2xl overflow-hidden"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
          >
            {/* Scan line effect */}
            <AnimatePresence>
              {qrRevealed && (
                <motion.div
                  className="absolute inset-x-0 h-1 z-20"
                  style={{
                    background: "linear-gradient(180deg, transparent, rgba(0,200,255,0.6), transparent)",
                    boxShadow: "0 0 20px rgba(0,200,255,0.4), 0 0 60px rgba(0,200,255,0.2)",
                  }}
                  initial={{ top: 0, opacity: 1 }}
                  animate={{ top: "100%", opacity: [1, 1, 0] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>

            {/* Corner accents */}
            {[
              "top-1 left-1",
              "top-1 right-1 rotate-90",
              "bottom-1 left-1 -rotate-90",
              "bottom-1 right-1 rotate-180",
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-4 h-4 z-10`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: delay + 1.2 + i * 0.1 }}
              >
                <div className="w-full h-px bg-black/30" />
                <div className="w-px h-full bg-black/30 absolute top-0 left-0" />
              </motion.div>
            ))}

            <QRCodeSVG
              value={siteUrl}
              size={220}
              level="H"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </motion.div>
        </motion.div>

        {/* Scan text with typing feel */}
        <motion.p
          className="text-muted-foreground text-xs tracking-[0.2em] uppercase"
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 0.7, letterSpacing: "0.2em" }}
          transition={{ delay: delay + 1.2, duration: 0.8 }}
        >
          Scan to connect
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3 w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 1.4, duration: 0.6, ease: "easeOut" }}
        >
          <motion.button
            onClick={handleSaveContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-primary/70 text-primary-foreground font-medium transition-opacity bg-primary"
            whileHover={{ scale: 1.02, opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} />
            Save Contact
          </motion.button>
          <motion.a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-foreground/40 text-foreground font-medium hover:bg-secondary hover:border-foreground/60 transition-colors text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Go to Portfolio
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Card;
