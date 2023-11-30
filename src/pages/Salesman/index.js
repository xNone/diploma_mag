import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import TravelingSalesman from './methodBAB/index';
import BruteForceTSP from './methodBF';
import CompareSalesman from './Compare';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Salesman = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/salesman');

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
        <Link
          to='/salesman/compare'
          className={`button link-button ${
            activeLink === '/salesman/compare' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/salesman/compare')}
        >
          {t('Compare')}
        </Link>
      </div>
      <Routes>
        <Route
          path='/'
          element={<TravelingSalesman onDataUpdate={handleChildDataDP} />}
        />
        <Route
          path='/methodBF'
          element={<BruteForceTSP onDataUpdate={handleChildDataGA} />}
        />
        <Route
          path='/compare'
          element={
            <CompareSalesman
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

export default React.memo(Salesman);
