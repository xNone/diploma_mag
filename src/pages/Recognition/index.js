import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import HungarianMethodAssignment from './methodH';
import GeneticAlgorithmAssignment from './methodA';

const HungarianMethod = () => {
  return (
    <div className='home-container'>
      <h1>Recognition task</h1>
      <div class='nav-section'>
        <Link to='/recognition' className='button link-button'>
          Угорський метод
        </Link>
        <Link to='methodA' className='button link-button'>
          Метод грубої сили
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<HungarianMethodAssignment />} />
        <Route path='methodA' element={<GeneticAlgorithmAssignment />} />
      </Routes>
    </div>
  );
};

export default React.memo(HungarianMethod);
