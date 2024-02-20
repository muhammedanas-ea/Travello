import Header from "../../components/userComponents/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/userComponents/footer/Footer";
import { ToastContainer } from "react-toastify";

export default function UserLayout() {
  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
     <ToastContainer/>
    </>
  );
}


