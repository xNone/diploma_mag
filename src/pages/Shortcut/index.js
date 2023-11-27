import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import FloydWarshall from './methodF';
import DijkstraWarshall from './methodD';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ShortcutMethod = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/shortcut');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (to) => {
    navigate(to);
    setActiveLink(to);
  };

  return (
    <div className='home-container'>
      <h1>Recognition task</h1>
      <div className='nav-section'>
        <Link
          to='/shortcut'
          className={`button link-button ${
            activeLink === '/shortcut' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/shortcut')}
        >
          Алгоритм Флойда
        </Link>
        <Link
          to='/shortcut/methodD'
          className={`button link-button ${
            activeLink === '/shortcut/methodD' ? 'active' : ''
          }`}
          onClick={() => handleLinkClick('/shortcut/methodD')}
        >
          Алгоритм Дейкстры
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<FloydWarshall />} />
        <Route path='/methodD' element={<DijkstraWarshall />} />
      </Routes>
    </div>
  );
};

export default React.memo(ShortcutMethod);
