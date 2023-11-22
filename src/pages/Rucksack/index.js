import { Link, Route, Routes } from 'react-router-dom';
import KnapsackProblem from './methodDP';
import KnapsackSolver from './methodGA';
import React from 'react';

const Rucksack = () => {
  return (
    <div className='home-container'>
      <h1>Title Rucksack</h1>
      <Link to='/rucksack' className='button link-button'>
        Метод динамічного програмування 
      </Link>
      <Link to='methodGA' className='button link-button'>
        Метод жадібний алгоритм 
      </Link>

      <Routes>
        <Route path='/' element={<KnapsackProblem />} />
        <Route path='methodGA' element={<KnapsackSolver />} />
      </Routes>
    </div>
  );
};

export default React.memo(Rucksack);
