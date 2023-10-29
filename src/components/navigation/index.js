import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import GlobeIcon from './languageSVG';

const navLinks = ['Home', 'Rucksack', 'Battle'];

const Nav = () => {
  const { t } = useTranslation();
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  const toggleLanguageSelector = () => {
    setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
  };

  return (
    <>
      <div className="nav">
        <ul className="nav-list">
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <NavLink to={navLink === 'Home' ? '/' : navLink.toLowerCase()}>
                {t(navLink)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
