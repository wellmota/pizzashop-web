import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './pages/_layouts/app';
import { SignIn } from './pages/auth/signin';
import { AuthLayout } from './pages/_layouts/auth';
import { SignUp } from './pages/auth/signup';
import { Orders } from './pages/app/orders/orders';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { NotFound } from './pages/404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
