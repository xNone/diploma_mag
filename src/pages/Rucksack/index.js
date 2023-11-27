import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import KnapsackProblem from './methodDP';
import KnapsackSolver from './methodGA';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Rucksack = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/rucksack');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (to) => {
    navigate(to);
    setActiveLink(to);
  };

  return (
    <div className='home-container'>
      <h1>{t('The knapsack problem')}</h1>
      <div className='nav-section'>
        <Link
          to='/rucksack'
          className={`button link-button ${
            activeLink === '/rucksack' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/rucksack')}
        >
          {t('Dynamic Programming')}
        </Link>
        <Link
          to='/rucksack/methodGA'
          className={`button link-button ${
            activeLink === '/rucksack/methodGA' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/rucksack/methodGA')}
        >
          {t('Greedy Algorithm')}
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<KnapsackProblem />} />
        <Route path='/methodGA' element={<KnapsackSolver />} />
      </Routes>
    </div>
  );
};

export default React.memo(Rucksack);
