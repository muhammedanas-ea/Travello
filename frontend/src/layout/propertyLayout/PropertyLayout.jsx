import { Outlet } from "react-router-dom";
import Header from "../../components/propertyComponents/propertyHeader/PropertyHeader"
import Sidebar from "../../components/propertyComponents/propertySidebar/PropertySidebar";
import { ToastContainer } from "react-toastify";

export default function PropertyLayout() {
  return (
    <div className="bg-[#e5e2e2]">
    <Header/>
    <Sidebar />
    <Outlet/>
    <ToastContainer/>
    </div>
  );
}

