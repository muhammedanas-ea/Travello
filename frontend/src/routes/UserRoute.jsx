import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/userLayout/UserLayout";
import UserPublic from "../protected/UserPublic";
import UserProtect from '../protected/UserProtected'
import SignUpPage from '../pages/userPages/SignUpPage'
import SignInPage from '../pages/userPages/SignInPage'
import ForgotPasswordPage from "../pages/userPages/ForgotPasswordPage"
import EmailVerifyPage from '../pages/userPages/EmailVerifyPage'
import SuspensePage from "../pages/userPages/SuspensePage";
const HomePage = lazy(() => import("../pages/userPages/HomePage"))
const PropertyListPage = lazy(() => import("../pages/userPages/PropertyListPage"))
const SinglePropertyPage = lazy(() => import("../pages/userPages/SinglePropertyPage"))
const UserProfilePage = lazy(() => import("../pages/userPages/UserProfilePage"))
const BookingPage = lazy(() => import( "../pages/userPages/BookingPage"))
const BookigSummeryPage = lazy(() => import("../pages/userPages/BookigSummeryPage"))
const BookingDetailsPage = lazy(() => import("../pages/userPages/BookingDetailsPage"))
const SuccessPage = lazy(() => import("../pages/userPages/SuccessPage"))
const ChatList = lazy(() => import("../components/userComponents/chat/ChatList"))
const ErrorPage = lazy(() => import("../pages/userPages/ErrorPage"))
const ResetPasswordPage = lazy(() => import("../pages/userPages/ResetPasswordPage"))


export default function UserRoute() {
  return (
    <Suspense fallback={<SuspensePage />}>
      <Routes>
        <Route path="/emailVerify" element={<UserPublic><EmailVerifyPage /></UserPublic>} />
        <Route path="/forgotPassword" element={<UserPublic><ForgotPasswordPage /></UserPublic>} />
        <Route path="/resetPassword/:id/:token" element={<ResetPasswordPage />} />
        <Route path='/error' element={<ErrorPage/>} />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/:id/:token" element={<HomePage />} />
          <Route path='/propertyList' element={<PropertyListPage/>} />
          <Route path='/userprofile' element={<UserProtect><UserProfilePage/></UserProtect>} />
          <Route path='/singleproperty' element={<UserProtect><SinglePropertyPage/></UserProtect>} />
          <Route path='/booking' element={<UserProtect><BookingPage/></UserProtect>} />
          <Route path='/success' element={<UserProtect><SuccessPage/></UserProtect>} />
          <Route path='/bookingsummery' element={<UserProtect><BookigSummeryPage/></UserProtect>} />
          <Route path='/bookingdetails' element={<UserProtect><BookingDetailsPage/></UserProtect>} />
          <Route path="/login" element={<UserPublic><SignInPage /></UserPublic>} />
          <Route path="/signup" element={<UserPublic><SignUpPage /></UserPublic>} />
          <Route path="/chat" element={<ChatList />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
