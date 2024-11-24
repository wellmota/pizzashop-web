import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./pages/app/dashboard";
// import { Signin } from "./pages/auth/signin";
import { AppLayout } from "./pages/_layouts/app";
import { Signin } from "./pages/auth/signin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/sign-in", element: <Signin /> }],
  },
]);
