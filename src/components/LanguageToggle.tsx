import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="fixed top-4 left-4 z-50 flex items-center justify-center w-9 h-9 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold hover:bg-secondary transition-colors"
      aria-label="Toggle language"
    >
      {locale === "en" ? "ع" : "EN"}
    </button>
  );
};

export default LanguageToggle;
