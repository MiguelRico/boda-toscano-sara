import { createBrowserRouter } from "react-router-dom";

import ConfirmationPage from "../pages/RsvpPage";
import MainLayout from "../components/layout/MainLayout";
import WeddingLandingPage from "../pages/WeddingLandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <WeddingLandingPage />,
      },
      {
        path: "/rsvp",
        element: <ConfirmationPage />,
      },
    ],
  },
]);
