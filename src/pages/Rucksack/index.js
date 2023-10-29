import { Link, Route, Routes } from 'react-router-dom';
import KnapsackProblem from './methodDP';
import KnapsackSolver from './methodGA';
import React from 'react';

const Rucksack = () => {
  return (
    <div className='home-container'>
      <h1>Title Rucksack</h1>
      <Link to='/rucksack' className='button'>
        Method 123
      </Link>
      <Link to='methodB' className='button'>
        Method B
      </Link>

      <Routes>
        <Route path='/' element={<KnapsackProblem />} />
        <Route path='methodB' element={<KnapsackSolver />} />
      </Routes>
    </div>
  );
};

export default React.memo(Rucksack);
