import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);

export default router;
