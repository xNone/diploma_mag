import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import GlobeIcon from './languageSVG';

const navLinks = ['Home', 'Rucksack', 'Salesman', 'Shortcut', 'Recognition'];

const Nav = () => {
  const { t } = useTranslation();
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  const toggleLanguageSelector = () => {
    setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
  };

  useEffect(() => {
    const path = location.pathname.split('/')[1] || '';
    setActiveLink(path);
  }, [location.pathname]);

  return (
    <>
      <div className='GlobeIcon-div' onClick={toggleLanguageSelector}>
        {GlobeIcon()}
      </div>
      {isLanguageSelectorOpen && <LanguageSelector></LanguageSelector>}
      <div className='nav'>
        <ul className='nav-list'>
          {navLinks.map((navLink, index) => (
            <li
              key={index}
              className={`${
                (activeLink === '' && navLink === 'Home') ||
                activeLink === navLink.toLowerCase()
                  ? 'active'
                  : ''
              }`}
            >
              <NavLink
                to={navLink === 'Home' ? '/' : `/${navLink.toLowerCase()}`}
                activeClassName='active'
              >
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
