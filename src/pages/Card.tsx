import { QRCodeSVG } from "qrcode.react";
import ThemeToggle from "@/components/ThemeToggle";

const Card = () => {
  const siteUrl = "https://bybash.lovable.app";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
      <ThemeToggle />

      <div className="flex flex-col items-center gap-8 animate-fade-in">
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <QRCodeSVG
            value={siteUrl}
            size={220}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Scan My Business Card</h2>
          <p className="text-muted-foreground text-sm">
            Point your camera at the QR code to visit my portfolio
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-foreground/40 text-foreground font-medium hover:bg-secondary hover:border-foreground/60 transition-colors text-sm"
        >
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
};

export default Card;
