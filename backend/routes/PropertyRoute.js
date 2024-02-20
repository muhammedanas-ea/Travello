import express from "express";
import {
  insertPropertyOwner,
  ownerOtpVerification,
  propertyOwnerLogin,
} from "../controller/authController/PropertyAuthController.js";
import { addProperty ,PropertyHidden, ownerListProperty,propertyDetails ,bookingDetails,editPropertyDetails,DashboardData} from "../controller/property/PropertyController.js";
import { errorHandler } from "../middleware/ErrorHandling.js";
import { propertOwnerAuth } from "../middleware/AuthMiddleware.js";
import { SearchOwnerChat,FetchOwnerChats,OwnerSendMessage} from "../controller/chat/ChatController.js";
import upload from "../middleware/Multer.js";
const propertyRoute = express();

propertyRoute.post("/propertySignup", insertPropertyOwner);
propertyRoute.post("/otpChecking", ownerOtpVerification);
propertyRoute.post("/propertySignin", propertyOwnerLogin);


propertyRoute.post("/addProperty",propertOwnerAuth,upload.array("images",10),addProperty);
propertyRoute.post("/editProperty",propertOwnerAuth,editPropertyDetails);
propertyRoute.get("/listProperty/:id",propertOwnerAuth,ownerListProperty);
propertyRoute.get("/propertydetails/:id",propertOwnerAuth,propertyDetails);
propertyRoute.get("/bookingdetails/:id/:active",propertOwnerAuth,bookingDetails);

propertyRoute.post('/message',OwnerSendMessage)
propertyRoute.get('/fetchchat/:userId',FetchOwnerChats);
propertyRoute.get('/ownersearch/:search',propertOwnerAuth,SearchOwnerChat)

propertyRoute.get('/dashboard/:proprtyId',propertOwnerAuth,DashboardData)
propertyRoute.put('/hideproperty',propertOwnerAuth,PropertyHidden)

propertyRoute.use(errorHandler);

export default propertyRoute;
