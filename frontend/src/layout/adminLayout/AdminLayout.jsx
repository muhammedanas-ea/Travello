import { Outlet } from "react-router-dom";
import Header from "../../components/adminComponents/header/Header";
import Sidebar from "../../components/adminComponents/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  return (
    <div className="bg-[#e5e2e2]">
      <Header />
      <Sidebar />
      <Outlet/>
      <ToastContainer/>
    </div>
  );
}
