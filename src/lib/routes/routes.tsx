import type { RouteObject } from 'react-router-dom';
import Home from '../../components/pages/home/Home';
import Quiz from '../../components/pages/quiz/Quiz';
import UserResults from '../../components/pages/results/UserResults';
import Dashboard from '../../components/pages/admin/Dashboard';
import ProtectedRoute from './protectedRoute';
import FinalResults from '../../components/pages/results/FinalResults';
import SignInScreen from '../../components/pages/auth/SignInScreen';
import SignUpScreen from '../../components/pages/auth/SignUpScreen';
import SignOutScreen from '../../components/pages/auth/SignOutScreen';


const routes: RouteObject[] = [
  {
    path: '*',
    element: <Home />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '/results',
    element: <UserResults />,
  },
  {
    path: '/final-results',
    element: <FinalResults />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin/dashboard',
        element: <Dashboard />,
      }
    ],
  },
  {
    path: '/signIn',
    element: <SignInScreen />,
  },
  {
    path: '/signUp',
    element: <SignUpScreen />,
  },
  {
    path: '/signOut',
    element: <SignOutScreen />,
  },
];

export default routes;
