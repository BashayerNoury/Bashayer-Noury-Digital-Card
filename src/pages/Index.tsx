import { Mail, MessageCircle, Linkedin } from "lucide-react";
import SmokeBackground from "@/components/SmokeBackground";
import ThemeToggle from "@/components/ThemeToggle";

const skills = ["Product Management", "Vibe Coding", "MVP", "MLP", "GTM"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative">
      <ThemeToggle />
      <SmokeBackground />
      <div className="max-w-2xl w-full py-20 relative z-10 animate-fade-in" style={{ animationDuration: '0.8s', animationFillMode: 'both' }}>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Hey there
        </p>

        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-foreground">
          I'm <span className="text-muted-foreground/80">Bash</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl whitespace-pre-line">{"By day, I am a super star Product Manager.\nBy nature, I'm still a person figuring things out."}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {skills.map((skill) => <span
            key={skill}
            className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
            
              {skill}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="mailto:bashayernoury@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-primary-foreground font-medium hover:opacity-90 transition-opacity bg-primary">
            
            <Mail size={18} />
            Email me
          </a>
          <a
            href="https://wa.me/96597304442"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors">
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a
            href="https://www.linkedin.com/in/bashayernoury/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors">
            
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground text-sm italic whitespace-pre-line">{"Inspired by James Clear's 1% rule, I've made small improvement a daily ritual.\nAre you building yours?"}</p>
        </div>
      </div>
    </div>);

};

export default Index;
