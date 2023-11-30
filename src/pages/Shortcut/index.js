import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import FloydWarshall from './methodF';
import DijkstraWarshall from './methodD';
import CompareShortcut from './Compare';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ShortcutMethod = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/shortcut');

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
      <h1>{t('Finding the shortest path in a graph')}</h1>
      <div className='nav-section'>
        <Link
          to='/shortcut'
          className={`button link-button ${
            activeLink === '/shortcut' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/shortcut')}
        >
          {t("Floyd's algorithm")}
        </Link>
        <Link
          to='/shortcut/methodD'
          className={`button link-button ${
            activeLink === '/shortcut/methodD' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/shortcut/methodD')}
        >
          {t("Dijkstree's algorithm")}
        </Link>
        <Link
          to='/shortcut/compare'
          className={`button link-button ${
            activeLink === '/shortcut/compare' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/shortcut/compare')}
        >
          {t('Compare')}
        </Link>
      </div>
      <Routes>
        <Route
          path='/'
          element={<FloydWarshall onDataUpdate={handleChildDataDP} />}
        />
        <Route
          path='/methodD'
          element={<DijkstraWarshall onDataUpdate={handleChildDataGA} />}
        />
        <Route
          path='/compare'
          element={
            <CompareShortcut
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

export default React.memo(ShortcutMethod);
