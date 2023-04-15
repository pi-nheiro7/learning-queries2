import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import Question from '../pages/Question/Question';

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
      {
        path:  '/home/question/:questionId',
        element: <Question />
      }
    ],
  },
]);

export default router;
