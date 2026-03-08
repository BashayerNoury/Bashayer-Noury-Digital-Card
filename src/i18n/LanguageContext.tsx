import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

type LanguageContextType = {
  locale: Locale;
  t: typeof translations.en;
  toggleLocale: () => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectLocale(): Locale {
  const stored = localStorage.getItem("locale");
  if (stored === "ar" || stored === "en") return stored;
  const browserLang = navigator.language || (navigator as any).userLanguage || "";
  return browserLang.startsWith("ar") ? "ar" : "en";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "en" ? "ar" : "en";
      localStorage.setItem("locale", next);
      return next;
    });
  };

  const isRTL = locale === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale, isRTL]);

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggleLocale, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
