import { createBrowserRouter, Navigate } from 'react-router-dom';
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
  // Backward compatibility for old links
  { path: '/signin', element: <Navigate to="/auth/signin" replace /> },
  { path: '/signup', element: <Navigate to="/auth/signup" replace /> },
  {
    path: '*',
    element: <NotFound />,
  },
]);
