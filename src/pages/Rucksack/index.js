import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import KnapsackProblem from './methodDP';
import KnapsackSolver from './methodGA';
import CompareRucksack from './Compare';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Rucksack = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/rucksack');

  const [dpExecutionTimeDP, setDPExecutionTimeDP] = useState(0);
  const [dpIterationsDP, setDPIterationsDP] = useState(0);
  const [memoryUsedDP, setMemoryUsedDP] = useState(0);

  const [dpExecutionTimeGA, setDPExecutionTimeGA] = useState(0);
  const [dpIterationsGA, setDPIterationsGA] = useState(0);
  const [memoryUsedGA, setMemoryUsedGA] = useState(0);

  // Функция-колбэк для получения значений из дочернего компонента
  const handleChildDataDP = (executionTime, iterations, usedMemory) => {
    setDPExecutionTimeDP(executionTime);
    setDPIterationsDP(iterations);
    setMemoryUsedDP(usedMemory);
  };

  const handleChildDataGA = (executionTime, iterations, usedMemory) => {
    setDPExecutionTimeGA(executionTime);
    setDPIterationsGA(iterations);
    setMemoryUsedGA(usedMemory);
  };

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
        <Link
          to='/rucksack/compare'
          className={`button link-button ${
            activeLink === '/rucksack/compare' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/rucksack/compare')}
        >
          {t('Compare')}
        </Link>
      </div>
      <Routes>
        <Route
          path='/'
          element={<KnapsackProblem onDataUpdate={handleChildDataDP} />}
        />
        <Route
          path='/methodGA'
          element={<KnapsackSolver onDataUpdate={handleChildDataGA} />}
        />
        <Route
          path='/compare'
          element={
            <CompareRucksack
              dpExecutionTimeDP={dpExecutionTimeDP}
              dpIterationsDP={dpIterationsDP}
              memoryUsedDP={memoryUsedDP}
              dpExecutionTimeGA={dpExecutionTimeGA}
              dpIterationsGA={dpIterationsGA}
              memoryUsedGA={memoryUsedGA}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default React.memo(Rucksack);
