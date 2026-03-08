export type Locale = "en" | "ar";

export const translations = {
  en: {
    greeting: "HEY THERE!",
    imBash: "I'm",
    bashDot: "Bash.",
    bio: "Bashayer Noury is a Product Manager based in 🇰🇼",
    letsConnect: "Let's Connect!",
    skills: ["Product Management", "AI", "MVP / MLP", "GTM"],
    madeWith: "Made with",
    inText: "In",
    welcome: "Welcome ✨",
    // Card page
    fullName: "Bashayer Noury",
    title: "Product Manager",
    copied: "Copied!",
    saveContact: "Save Contact",
    backToPortfolio: "← Back to Portfolio",
    share: "Share",
    copy: "Copy",
    // Not found
    oops: "OOPS",
    notFoundTitle: "404",
    notFoundDesc: "The page you're looking for doesn't exist.",
    goHome: "Go Home",
  },
  ar: {
    greeting: "!أهلاً وسهلاً",
    imBash: "أنا",
    bashDot: "بش.",
    bio: "بشاير نوري مديرة منتجات في 🇰🇼",
    letsConnect: "!تواصل معي",
    skills: ["إدارة المنتجات", "الذكاء الاصطناعي", "MVP / MLP", "GTM"],
    madeWith: "صنع بـ",
    inText: "في",
    welcome: "✨ أهلاً",
    // Card page
    fullName: "بشاير نوري",
    title: "مديرة منتجات",
    copied: "!تم النسخ",
    saveContact: "حفظ جهة الاتصال",
    backToPortfolio: "العودة للملف الشخصي →",
    share: "مشاركة",
    copy: "نسخ",
    // Not found
    oops: "عذراً",
    notFoundTitle: "٤٠٤",
    notFoundDesc: "الصفحة التي تبحث عنها غير موجودة.",
    goHome: "الرئيسية",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
