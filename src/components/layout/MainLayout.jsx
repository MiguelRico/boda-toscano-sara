import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Outlet />
    </div>
  );
}

export default MainLayout;
