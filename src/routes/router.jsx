import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ConfirmationPage from "../pages/ConfirmationPage";
import MainLayout from "../components/layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/confirmacion",
        element: <ConfirmationPage />,
      },
    ],
  },
]);
