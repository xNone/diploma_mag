import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Nav from './navigation';
import Home from '../pages/Home/index';
import Rucksack from '../pages/Rucksack/index';
import KnapsackSolver from '../pages/Rucksack/methodGA';
import CompareRucksack from '../pages/Rucksack/Compare';
import Salesman from '../pages/Salesman';
import BruteForceTSP from '../pages/Salesman/methodBF';
import CompareSalesman from '../pages/Salesman/Compare';
import ShortcutMethod from '../pages/Shortcut';
import DijkstraWarshall from '../pages/Shortcut/methodD';
import CompareShortcut from '../pages/Shortcut/Compare';
import HungarianMethod from '../pages/Recognition';
import GeneticAlgorithmAssignment from '../pages/Recognition/methodA';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/rucksack',
        element: <Rucksack />,
        children: [
          {
            path: 'methodGA',
            element: <KnapsackSolver />,
          },
          {
            path: 'compare',
            element: <CompareRucksack />,
          },
        ],
      },
      {
        path: '/salesman',
        element: <Salesman />,
        children: [
          {
            path: 'methodBF',
            element: <BruteForceTSP />,
          },
          {
            path: 'compare',
            element: <CompareSalesman />,
          },
        ],
      },
      {
        path: '/shortcut',
        element: <ShortcutMethod />,
        children: [
          {
            path: 'methodD',
            element: <DijkstraWarshall />,
          },
          {
            path: 'compare',
            element: <CompareShortcut />,
          },
        ],
      },
      {
        path: '/recognition',
        element: <HungarianMethod />,
        children: [
          {
            path: 'methodA',
            element: <GeneticAlgorithmAssignment />,
          },
        ],
      },
      {
        path: '*',
        element: <h2>Error</h2>,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className='container area'>
      <RouterProvider router={router} />
      <ul class='circles'>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Helmet>
        <script
          src='http://atuin.ru/js/art/stars.js'
          type='text/javascript'
        ></script>
      </Helmet>
    </div>
  );
};

export default App;
