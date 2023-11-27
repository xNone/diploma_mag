import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import TravelingSalesman from './methodBAB/index';
import BruteForceTSP from './methodBF';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Salesman = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/salesman');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (to) => {
    navigate(to);
    setActiveLink(to);
  };

  return (
    <div className='home-container'>
      <h1>{t('The task of a salesman')}</h1>
      <div className='nav-section'>
        <Link
          to='/salesman'
          className={`button link-button ${
            activeLink === '/salesman' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/salesman')}
        >
          {t('Branch and Bound')}
        </Link>
        <Link
          to='/salesman/methodBF'
          className={`button link-button ${
            activeLink === '/salesman/methodBF' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/salesman/methodBF')}
        >
          {t('Brute Force')}
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<TravelingSalesman />} />
        <Route path='/methodBF' element={<BruteForceTSP />} />
      </Routes>
    </div>
  );
};

export default React.memo(Salesman);
