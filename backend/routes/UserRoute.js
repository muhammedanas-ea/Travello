import express from "express";
import {
  insertUser,
  verifyUser,
  userLogin,
  forgotPassword,
  userRestPassword,
  userGoogleSignUp,
  userGoogleSignin,
} from "../controller/authController/UserAuthController.js";
import {
  userPropertyList,
  updateUserProfile,
  fetchProfileData,
  userSinglePropertyList,
  userBookingDetails,
  userPaymentDetails,
  paymentSuccess,
  BookingSummeryDetails,
  CancelBooking,
  WalletPayment,
  BookingCompleted,
  AddReview,
  PropertySwiper
} from "../controller/user/UserController.js";
import { FetchChats , SendMessage,AllMessages ,SearchUserChat,AccessChat} from "../controller/chat/ChatController.js";
import { userAuth } from "../middleware/AuthMiddleware.js";
import { errorHandler } from "../middleware/ErrorHandling.js";

const userRoute = express();

//*********USER UTHENTICATION AND AUTHERASATION ROUTES
userRoute.post("/signup", insertUser);
userRoute.get("/verify/:id/:token", verifyUser);
userRoute.post("/login", userLogin);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/restPasword", userRestPassword);
userRoute.post("/googleSignUp", userGoogleSignUp);
userRoute.post("/googleSignin", userGoogleSignin);

userRoute.put("/userprofile",userAuth,updateUserProfile);
userRoute.get("/profileData/:id",userAuth,fetchProfileData)

userRoute.get("/userpropertylist/:active/:sort/:aminitesSort/:search/:priceFilter", userPropertyList);
userRoute.get("/singleproperty/:id",userAuth,userSinglePropertyList);

userRoute.post('/bookings',userAuth,userBookingDetails)
userRoute.get('/paymentdetails/:bookingId',userAuth,userPaymentDetails)
userRoute.put('/paymentSuccess',userAuth,paymentSuccess)
userRoute.get('/bookingsummery/:id/:active',userAuth,BookingSummeryDetails)
userRoute.post('/bookingcancel',userAuth,CancelBooking)
userRoute.post('/walletpayment',userAuth,WalletPayment)
userRoute.get('/bookingcompleted/:bookingId',userAuth,BookingCompleted)

userRoute.get('/fetchchat/:userId',FetchChats);
userRoute.get('/usersearch/:search',userAuth,SearchUserChat)
userRoute.post('/accesschat',AccessChat)
userRoute.post('/message',SendMessage)
userRoute.get('/message/:chatId',AllMessages)

userRoute.post('/addreview',userAuth,AddReview)

userRoute.get('/propertyswiper',PropertySwiper)


userRoute.use(errorHandler);

export default userRoute;
