import { createBrowserRouter } from "react-router-dom";

import ConfirmationPage from "../pages/RsvpPage";
import MainLayout from "../components/layout/MainLayout";
import LandingPage from "../pages/LandingPage";
import DetailsPage from "../pages/DetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/rsvp",
        element: <ConfirmationPage />,
      },
      {
        path: "/details",
        element: <DetailsPage />,
      },
    ],
  },
]);
