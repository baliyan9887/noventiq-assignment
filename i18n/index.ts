import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      email: "Email",
      password: "Password",
      hide: "Hide",
      show: "Show",
      language: "Select Language",
      "languages.en": "English",
      "languages.hi": "Hindi",
      "languages.ta": "Tamil",
      "languages.te": "Telugu",
      successMessage: "You've logged in successfully",
      logout: "Logout",
    },
  },
  hi: {
    translation: {
      login: "लॉगिन करें",
      email: "ईमेल",
      password: "पासवर्ड",
      hide: "छुपाएं",
      show: "दिखाएँ",
      language: "भाषा चुनें",
      "languages.en": "अंग्रेज़ी",
      "languages.hi": "हिन्दी",
      "languages.ta": "தமிழ்",
      "languages.te": "తెలుగు",
      successMessage: "आपने सफलतापूर्वक लॉगिन किया है",
      logout: "लॉगआउट",
    },
  },
  ta: {
    translation: {
      login: "உள்நுழை",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      hide: "மறை",
      show: "காட்டு",
      language: "மொழியை தேர்ந்தெடு",
      "languages.en": "ஆங்கிலம்",
      "languages.hi": "இந்தி",
      "languages.ta": "தமிழ்",
      "languages.te": "తెలుగు",
      successMessage: "நீங்கள் வெற்றிகரமாக உள்நுழைந்துவிட்டீர்கள்",
      logout: "வெளியேறு",
    },
  },
  te: {
    translation: {
      login: "ప్రవేశించండి",
      email: "ఇమెయిల్",
      password: "పాస్‌వర్డ్",
      hide: "దాచు",
      show: "చూపించు",
      language: "భాషను ఎంచుకోండి",
      "languages.en": "ఆంగ్లం",
      "languages.hi": "హిందీ",
      "languages.ta": "తమిళం",
      "languages.te": "తెలుగు",
      successMessage: "మీరు విజయవంతంగా లాగిన్ అయ్యారు",
      logout: "లాగౌట్",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
