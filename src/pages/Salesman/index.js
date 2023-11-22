import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import TravelingSalesman from './methodBAB/index';
import BruteForceTSP from './methodBF';

const Salesman = () => {
  return (
    <div className='home-container'>
      <h1>Title Rucksack</h1>
      <Link to='/salesman' className='button link-button'>
        Метод гілок і меж
      </Link>
      <Link to='methodBF' className='button link-button'>
        Метод грубої сили
      </Link>

      <Routes>
        <Route path='/' element={<TravelingSalesman />} />
        <Route path='methodBF' element={<BruteForceTSP />} />
      </Routes>
    </div>
  );
};

export default React.memo(Salesman);
