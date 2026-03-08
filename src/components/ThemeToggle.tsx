import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const applyTheme = (theme: Theme) => {
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "system";
    }
    return "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const cycle = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const icon = theme === "dark" ? <Sun size={18} /> : theme === "light" ? <Moon size={18} /> : <Monitor size={18} />;

  return (
    <button
      onClick={cycle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label="Toggle theme"
      title={`Theme: ${theme}`}
    >
      {icon}
    </button>
  );
};

export default ThemeToggle;
