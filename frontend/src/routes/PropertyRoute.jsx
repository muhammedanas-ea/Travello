import { Route, Routes } from "react-router-dom";
import PropertySignupPage from "../pages/propertyPages/PropertySignupPage";
import OtpVerificationPage from "../pages/propertyPages/OtpVerificationPage";
import DashboardPage from "../pages/propertyPages/DashboardPage";
import PropertyLoginpage from "../pages/propertyPages/PropertyLoginPage";
import PropertyLayout from "../layout/propertyLayout/PropertyLayout";
import PropertyProtected from "../protected/PropertyProtected";
import PropertyPublic from "../protected/PropertyPublic";
import OwnerProfilePage from "../pages/propertyPages/OwnerProfilePage";
import PropertyDetailsPage from "../pages/propertyPages/PropertyDetailsPage";
import BookingDetailsPage from "../pages/propertyPages/BookingDetailsPage";
import ErrorPage from "../pages/propertyPages/ErrorPage";
import ChatList from "../components/propertyComponents/chat/ChatList";

export default function PropertyRoute() {
  return (
    <Routes>
      <Route element={<PropertyPublic />}>
        <Route path="/signup" element={<PropertySignupPage />} />
        <Route path="/login" element={<PropertyLoginpage />} />
        <Route path="/otpverification" element={<OtpVerificationPage />} />
      </Route>
      <Route path="/errorpage" element={<ErrorPage />} />
      <Route element={<PropertyProtected />}>
        <Route element={<PropertyLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/ownerprofile" element={<OwnerProfilePage />} />
          <Route path="/propertydetails" element={<PropertyDetailsPage />} />
          <Route path="/bookingdetails" element={<BookingDetailsPage />} />
          <Route path="/chat" element={<ChatList />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
