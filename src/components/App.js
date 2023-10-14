import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './navigation';
import Home from '../pages/Home/index';
import Rucksack from '../pages/Rucksack/index';

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
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
