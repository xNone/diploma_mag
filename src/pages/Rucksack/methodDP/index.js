import { Link, Route, useMatch, Routes } from 'react-router-dom';
import KnapsackProblem from './rucksackAlgorithm';
import RucksackMethodA from './RucksackMethodA';
import React from 'react';

const Rucksack = () => {
  const match = useMatch();
  console.log(match)
  return (
    <div className='home-container'>
      <h1>Title Rucksack</h1>
      <Link to={`${match.pathname}/methodA`} className='button'>
        Method A
      </Link>

      <Routes>
        <Route path="" element={<KnapsackProblem />} />
        <Route path="methodA" element={<RucksackMethodA />} />
      </Routes>
    </div>
  );
};

export default React.memo(Rucksack);
