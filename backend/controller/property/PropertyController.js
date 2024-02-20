import propertyModel from "../../models/propertyModal.js";
import bookingModel from "../../models/bookingModal.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const addProperty = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const dicout = jwt.verify(token, process.env.SECRET_KEY);

    const {
      propertyName,
      price,
      room,
      gust,
      state,
      location,
      propertyType,
      number,
      describe,
      amenities,
    } = req.body;

    const images = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }
    }

    const propertyData = new propertyModel({
      PropertyName: propertyName,
      Price: price,
      RoomCount: room,
      GuestCount: gust,
      City: location,
      State: state,
      MobileNumber: number,
      Description: describe,
      PropertyType: propertyType,
      Amenities: amenities,
      propertOwner: dicout.userId,
      Image: images,
    });
    await propertyData.save();
    if (!propertyData) {
      return res.status(400).json({ message: "propert add have error" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "property add complted" });
    }
  } catch (err) {
    next(err);
  }
};

export const ownerListProperty = async (req, res, next) => {
  try {
    const propertyData = await propertyModel
      .find({ propertOwner: req.params.id })
      .populate("propertOwner");
    if (!propertyData) {
      return res.status(400).json({ message: "property list have error" });
    } else {
      return res.status(200).json({
        status: true,
        propertyData,
        message: "property list Completed",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const propertyDetails = async (req, res, next) => {
  try {
    const propertyData = await propertyModel
      .findOne({ _id: req.params.id })
      .populate("propertOwner");
    res.status(200).json({ propertyData });
  } catch (err) {
    next(err);
  }
};

export const bookingDetails = async (req, res, next) => {
  try {
    const { active, id } = req.params;
    const page = (active - 1) * 6;
    const totalProperty = await bookingModel.countDocuments({
      bookingStatus: { $in: ["success", "cancel"] },
    });

    const bookingData = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: {
          path: "$details",
        },
      },
      {
        $project: {
          PropertyName: 1,
          details: 1,
          _id: 0,
        },
      },
      {
        $sort: { "details.Date": -1 },
      },
      {
        $skip: page,
      },
      {
        $limit: 8,
      },
    ]);
    const totalPages = Math.ceil(totalProperty / 8);
    res.status(200).json({ bookingData, totalPages });
  } catch (err) {
    next(err);
  }
};

export const editPropertyDetails = async (req, res, next) => {
  try {
    const {
      propertyId,
      propertyName,
      price,
      room,
      gust,
      state,
      location,
      propertyType,
      number,
      describe,
      amenities,
    } = req.body;
    await propertyModel.updateOne(
      { _id: propertyId },
      {
        $set: {
          PropertyName: propertyName,
          Price: price,
          RoomCount: room,
          GuestCount: gust,
          State: state,
          City: location,
          PropertyType: propertyType,
          MobileNumber: number,
          Description: describe,
          Amenities: amenities,
        },
      }
    );
    res.status(200).json({ message: "property edit completed" });
  } catch (err) {
    next(err);
  }
};

export const DashboardData = async (req, res) => {
  try {
    const totalSales = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(req.params.proprtyId),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: {
          path: "$details",
        },
      },
      {
        $group: {
          _id: null,
          totalamount: { $sum: "$details.TotalRate" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const totalBooking = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(req.params.proprtyId),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);

    const bookings = totalBooking.reduce((acc, curr) => {
      return curr.bookings.length + acc;
    }, 0);

    const totalUsers = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(req.params.proprtyId),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: "$details",
      },
      {
        $group: {
          _id: null,
          totalUsers: {
            $addToSet: "$details.UsersId",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const uniqueUser =
      totalUsers.length > 0 ? totalUsers[0].totalUsers.length : 0;

    const startDate = new Date();
    const firstDate = new Date(startDate);
    firstDate.setMonth(startDate.getMonth() - 1);

    const secondDate = new Date(startDate);
    secondDate.setMonth(startDate.getMonth() - 2);

    const thirdDate = new Date(startDate);
    thirdDate.setMonth(startDate.getMonth() - 3);

    const newYearSales = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(req.params.proprtyId),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: {
          path: "$details",
        },
      },
      {
        $match: {
          "details.bookingStatus": "success",
          $and: [
            { "details.Date": { $gt: firstDate } },
            { "details.Date": { $lt: startDate } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalamount: { $sum: "$details.TotalRate" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    const secondYearSales = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(req.params.proprtyId),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: {
          path: "$details",
        },
      },
      {
        $match: {
          "details.bookingStatus": "success",
          $and: [
            { "details.Date": { $gt: secondDate } },
            { "details.Date": { $lt: firstDate } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalamount: { $sum: "$details.TotalRate" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    const thirdYearSales = await propertyModel.aggregate([
      {
        $match: {
          propertOwner: new ObjectId(req.params.proprtyId),
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "bookings",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $unwind: {
          path: "$details",
        },
      },
      {
        $match: {
          "details.bookingStatus": "success",
          $and: [
            { "details.Date": { $gt: thirdDate } },
            { "details.Date": { $lt: secondDate } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalamount: { $sum: "$details.TotalRate" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const newYearTotalSales =
      newYearSales.length > 0 ? newYearSales[0].totalamount : 0;
    const secondYearTotalSales =
      secondYearSales.length > 0 ? secondYearSales[0].totalamount : 0;
    const thirdYearTotalSales =
      thirdYearSales.length > 0 ? thirdYearSales[0].totalamount : 0;
    

    res.status(200).json({
      totalSales: totalSales[0].totalamount,
      bookings,
      uniqueUser,
      newYearTotalSales,
      secondYearTotalSales,
      thirdYearTotalSales,
      startDate,
      firstDate,
      thirdDate,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const PropertyHidden = async (req,res) =>{
  try{
    const {propertyId,hide} = req.body
    if(hide === 'hideproperty'){
      await propertyModel.updateOne({_id:propertyId},{$set:{Is_list: false}})
      return res.status(200).json({message:'property hide completed'})
    }else{
      await propertyModel.updateOne({_id:propertyId},{$set:{Is_list: true}})
      return res.status(200).json({message:'property show completed'})
    }
  }catch(err){
    console.log(err)
  }
} 