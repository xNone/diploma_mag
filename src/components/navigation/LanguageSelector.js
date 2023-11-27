import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'active-lang' : ''}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('ua')}
        className={i18n.language === 'ua' ? 'active-lang' : ''}
      >
        Українська
      </button>
    </div>
  );
};

export default LanguageSelector;
