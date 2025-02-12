import React from "react";
import { useTranslation } from "next-i18next";

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="mb-4">
      <label className="block mb-2">{t("language")}:</label>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="w-full border p-2 rounded"
      >
        {Object.keys(i18n.services.resourceStore.data).map((lang) => (
          <option key={lang} value={lang}>
            {t(`languages.${lang}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
