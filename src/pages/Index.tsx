import { Mail, Phone, Linkedin } from "lucide-react";
import SmokeBackground from "@/components/SmokeBackground";

const skills = ["Web Development", "Music Production", "VR", "Robotics", "AI"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative">
      <SmokeBackground />
      <div className="max-w-2xl w-full py-20 relative z-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Hey there
        </p>

        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-foreground">
          I'm <span className="text-primary">Cameron</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
          I build websites and webapps, and love teaching others to do the same.
          By day, I work at{" "}
          <a href="#" className="text-foreground font-semibold underline underline-offset-4 hover:text-muted-foreground transition-colors">
            Xano
          </a>
          . On the side, I'm building{" "}
          <a href="#" className="text-foreground font-semibold underline underline-offset-4 hover:text-muted-foreground transition-colors">
            ChatClipThat
          </a>
          , an AI-powered highlight generator for gamers.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="mailto:cameron@example.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Mail size={18} />
            Email me
          </a>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            <Phone size={18} />
            Call me
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground text-sm italic">
            Thanks to my favorite clients at{" "}
            <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Yes Theory
            </a>
            , I've made it a tradition to seek and embrace discomfort! Have you?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
