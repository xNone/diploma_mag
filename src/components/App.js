import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Nav from './navigation';
import Home from '../pages/Home/index';
import RucksackMethodA from '../pages/Rucksack/methodDP/RucksackMethodA';
import Rucksack from '../pages/Rucksack/methodDP/index';
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
            path: 'methodA', // Используйте относительный путь
            element: <RucksackMethodA />,
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
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
