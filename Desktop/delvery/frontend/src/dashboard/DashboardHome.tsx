import { Outlet } from "react-router-dom";
import MiniDrawer from "../components/DashbordComponets/MiniDrawer";

const DashboardHome = () => {
  return (
    <div>
      <MiniDrawer />
      <Outlet />
    </div>
  );
};

export default DashboardHome;
