import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Card = () => {
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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative">
      <ThemeToggle />

      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Bashayer Noury</h1>
          <p className="text-muted-foreground text-sm tracking-wide">Product Manager</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <QRCodeSVG
            value={siteUrl}
            size={220}
            level="H"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <p className="text-muted-foreground text-sm">
          Scan to visit my portfolio
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
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
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
