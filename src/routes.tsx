import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./pages/app/dashboard";
import { AppLayout } from "./pages/_layouts/app";
import { SignIn } from "./pages/auth/signin";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);
