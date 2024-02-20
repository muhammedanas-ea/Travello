import express from 'express'
import { adminLogin } from '../controller/authController/AdminAuthController.js'
import {
    userDetails,
    userBlock,
    userUnblock,
    verifyNotification,
    propertyDetails,
    propertBlock,
    propertUnBlock,
    viewVerifyDetails,
    adminPropertyApprove,
    dashboardData
} from '../controller/admin/AdminController.js'



const adminRoute = express ()

adminRoute.post('/adminLogin',adminLogin)

adminRoute.get('/userlist/:active/:search',userDetails)
adminRoute.put('/blockuser',userBlock)
adminRoute.put('/ublockUser',userUnblock)

adminRoute.get('/verify',verifyNotification)
adminRoute.put('/adminapprove',adminPropertyApprove)

adminRoute.get('/propertylistadmin/:active/:search',propertyDetails)
adminRoute.put('/propertyBlock',propertBlock)
adminRoute.put('/propertyUnblock',propertUnBlock)
adminRoute.get('/viewDetails/:id',viewVerifyDetails)

adminRoute.get('/dashboard',dashboardData)

export default adminRoute