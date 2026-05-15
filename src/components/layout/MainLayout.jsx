import { Outlet } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default MainLayout;
