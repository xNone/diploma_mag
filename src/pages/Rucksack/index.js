import { Link } from 'react-router-dom';
import KnapsackApp from './rucksackAlgorithm';

const Rucksack = () => {

  return (
    <div className='home-container'>
      <h1>Title Rucksack</h1>
      <Link to='/rucksack' className='button' />
      <KnapsackApp />
    </div>
  );
};

export default Rucksack;
