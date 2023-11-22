import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import FloydWarshall from './methodF';
import DijkstraWarshall from './methodD';

const ShortcutMethod = () => {
  return (
    <div className='home-container'>
      <h1>Recognition task</h1>
      <Link to='/shortcut' className='button link-button'>
        Алгоритм Флойда
      </Link>
      <Link to='methodD' className='button link-button'>
        Метод грубої сили
      </Link>

      <Routes>
        <Route path='/' element={<FloydWarshall />} />
        <Route path='methodD' element={<DijkstraWarshall />} />
      </Routes>
    </div>
  );
};

export default React.memo(ShortcutMethod);
