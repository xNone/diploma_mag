import { Link } from 'react-router-dom';
import KnapsackProblem from './rucksackAlgorithm';
import React from 'react';

const Rucksack = () => {
  return (
    <div className='home-container'>
      <h1>Title Rucksack</h1>
      <Link to='/rucksack' className='button' />
      <KnapsackProblem />
    </div>
  );
};

export default React.memo(Rucksack);

// const weights = [6, 4, 3, 2, 5];
// const values = [5, 3, 1, 3, 6];