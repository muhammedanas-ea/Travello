import propertyModel from "../../models/propertyModal.js";
import usersModel from "../../models/userModel.js";
import bookingModel from "../../models/bookingModal.js";
import reviewModal from "../../models/reviewModal.js";
import mongoose from "mongoose";
import Stripe from "stripe";
const { ObjectId } = mongoose.Types;

export const userPropertyList = async (req, res, next) => {
  try {
    const { active, sort, aminitesSort, search, priceFilter } = req.params;
   
    const firstRange = priceFilter.split(",")[0];
    const lastRange = priceFilter.split(",")[1];

    
    const page = (active - 1) * 6;
    let sortValue;
    let array = [];
    
    const amenities = JSON.parse(aminitesSort);
    
    amenities.map((item) => {
      array.push(item.value);
    });
    
    const query = { Is_approve: true, Is_block: false, Is_list: false};
    
    if (search != 0) {
      query.$or = [
        { PropertyName: { $regex: search, $options: "i" } },
        { City: { $regex: search, $options: "i" } },
        { State: { $regex: search, $options: "i" } },
      ];
    }
    
    if (Array.isArray(array) && array.length > 0) {
      query.Amenities = { $all: array };
    }
    
    query.Price = { $gte: firstRange, $lte: lastRange };
    
    if (sort === "highToLow") {
      sortValue = -1;
    } else if (sort === "lowToHigh") {
      sortValue = 1;
    }
    
    const totalProperty = await propertyModel.countDocuments(query);
    
    const propertyData = await propertyModel
      .find(query)
      .skip(page)
      .limit(9)
      .sort({ Price: sortValue });
    await bookingModel.deleteMany({ bookingStatus: "pending" });

   

    const totalPages = Math.ceil(totalProperty / 9);

    if (!propertyData) {
      res
        .status(200)
        .json({ status: false, message: "not exist property data" });
    } else {
      res.status(200).json({
        status: true,
        propertyData,
        totalPages,
        message: "user data sent",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, number, houseName, state, city } =
      req.body.profileData;

    const userProfileUpdate = await usersModel.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name,
          email,
          number,
          houseName,
          state,
          city,
        },
      },
      {
        new: true,
      }
    );

    if (!userProfileUpdate) {
      return res.status(400).json({ message: "Your profile not updated" });
    } else {
      return res.status(200).json({
        status: true,
        message: "your profile updated",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const fetchProfileData = async (req, res, next) => {
  try {
    const userData = await usersModel.findOne({ _id: req.params.id });
    return res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

export const userSinglePropertyList = async (req, res, next) => {
  try {
    const propertyData = await propertyModel
      .findOne({ _id: req.params.id })
      .populate({
        path: "Ratings",
        populate: {
          path: "Users",
        },
      });

    const bookingCheck = await bookingModel.find({
      PropertyId: req.params.id,
      UsersId: req.body.userId,
      CheckOut: { $lte: new Date() },
      bookingStatus: "success",
    });

    return res.status(200).json({
      status: true,
      message: "singleproperty data get it",
      propertyData,
      bookingCheck,
    });
  } catch (err) {
    next(err);
  }
};

export const userBookingDetails = async (req, res, next) => {
  try {
    const {
      totalAmount,
      roomCount,
      increment,
      startDate,
      endDate,
      _id,
      userId,
    } = req.body;

    const propertyData = await propertyModel.findById(_id);

    const overlappingBookings = await bookingModel.aggregate([
      {
        $match: {
          PropertyId: new ObjectId(_id),
          $and: [
            { ChekIn: { $lte: new Date(endDate) } },
            { CheckOut: { $gte: new Date(startDate) } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: "$TotalRooms" },
        },
      },
    ]);

    if (overlappingBookings.length > 0) {
      const [{ totalCount }] = overlappingBookings;
      if (totalCount + roomCount > propertyData.RoomCount) {
        return res
          .status(400)
          .json({ message: "Room not available for these dates" });
      }
    }
    const booking = new bookingModel({
      ChekIn: startDate,
      CheckOut: endDate,
      TotalGuest: increment,
      TotalRooms: roomCount,
      TotalRate: totalAmount,
      PropertyId: _id,
      UsersId: userId,
      Date: new Date(),
    });
    await booking.save();

    const userData = await usersModel.findOne({ _id: userId });

    await bookingModel.findByIdAndUpdate(
      { _id: booking._id },
      {
        $set: {
          "Address.Name": userData.name,
          "Address.Email": userData.email,
          "Address.Mobile": userData.number,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: true,
      meessage: "room is available in this date",
      id: booking._id,
      totalAmount,
    });
  } catch (err) {
    next(err);
  }
};

export const userPaymentDetails = async (req, res, next) => {
  try {
    const stripe = new Stripe(
      "sk_test_51ODm4bSHaENjV1jroo3TowfdHte8VmCm5hGFP5Llc0Gxzeh5sGAOo6gFGoDjFvFmeWXNLEd0yMOfIXj9KocfnBIO005dT0lJmM"
    );
    const booking = await bookingModel
      .findById({ _id: req.params.bookingId })
      .populate("PropertyId")
      .populate("UsersId");
    const totalAmount = booking.TotalRate * 100;
    const paymentintent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await bookingModel.updateOne(
      { _id: req.params.bookingId },
      { $set: { TransactionId: paymentintent.id } }
    );

    res.status(200).json({
      status: true,
      message: "payment data",
      booking,
      clientSecret: paymentintent.client_secret,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const paymentSuccess = async (req, res, next) => {
  try {
    const update = await bookingModel.findOneAndUpdate(
      { _id: req.body.bookData.bookingId },
      { $set: { bookingStatus: "success" } }
    );
    await propertyModel.updateOne(
      { _id: update.PropertyId },
      { $addToSet: { bookings: update._id } }
    );
    res.status(200).json({ status: true, message: "update completed" });
  } catch (err) {
    next(err);
  }
};

export const BookingSummeryDetails = async (req, res, next) => {
  try {
    const { active, id } = req.params;
    const page = (active - 1) * 5;
    const totalBooking = await bookingModel.countDocuments({
      UsersId: id,
      bookingStatus: { $in: ["success", "cancel"] },
    });
    const bookingSummeryData = await bookingModel
      .find({ UsersId: id, bookingStatus: { $in: ["success", "cancel"] } })
      .sort({ Date: -1 })
      .skip(page)
      .limit(5)
      .populate("PropertyId");
    const totalPages = Math.ceil(totalBooking / 5);
    return res.status(200).json({ bookingSummeryData, totalPages });
  } catch (err) {
    next(err);
  }
};

export const CancelBooking = async (req, res, next) => {
  try {
    const { userId, bookingId } = req.body;
    const bookingData = await bookingModel.findOne({ _id: bookingId });
    if (bookingData.ChekIn < new Date()) {
      return res.status(400).json({
        message: "This booking cannot be cancelled after check-in time",
      });
    } else {
      const walletAmount = await usersModel.findOne({ _id: userId });
      const c = walletAmount.wallet + bookingData.TotalRate;
      await usersModel.updateOne({ _id: userId }, { $set: { wallet: c } });
      await bookingModel.findOneAndUpdate(
        { _id: bookingId },
        { $set: { bookingStatus: "cancel" } }
      );
      res
        .status(200)
        .json({ message: "Your booking has been successfully cancelled" });
    }
  } catch (err) {
    next(err);
  }
};

export const WalletPayment = async (req, res, next) => {
  try {
    const { bookingId, userId } = req.body;
    const bookingData = await bookingModel.findOne({ _id: bookingId });
    const userData = await usersModel.findOne({ _id: userId });
    if (userData.wallet < bookingData.TotalRate) {
      return res
        .status(400)
        .json({ message: "insafitient balance in a wallet" });
    }
    const update = await bookingModel.findOneAndUpdate(
      { _id: bookingId },
      {
        $set: {
          bookingStatus: "success",
          TransactionId: bookingId,
          paymentMethode: "wallet",
        },
      }
    );

    let c = userData.wallet - update.TotalRate;
    await usersModel.updateOne({ _id: userId }, { $set: { wallet: c } });
    await propertyModel.updateOne(
      { _id: update.PropertyId },
      { $addToSet: { bookings: update._id } }
    );
    res.status(200).json({ status: true, message: "update completed" });
  } catch (err) {
    next(err);
  }
};

export const BookingCompleted = async (req, res, next) => {
  try {
    const bookingData = await bookingModel
      .findOne({
        _id: req.params.bookingId,
        bookingStatus: { $in: ["success", "cancel"] },
      })
      .populate("PropertyId");
    res.status(200).json(bookingData);
  } catch (err) {
    next(err);
  }
};

export const AddReview = async (req, res, next) => {
  try {
    const { rating, description } = req.body.values;
    const { userId, _id } = req.body;

    const review = new reviewModal({
      ReviewRating: rating,
      Property: _id,
      ReviewDescription: description,
      Users: userId,
    });
    const reviewData = await review.save();
    await propertyModel.updateOne(
      { _id: _id },
      { $addToSet: { Ratings: reviewData._id } }
    );

    res.status(200).json({ message: "review added successfully" });
  } catch (err) {
    next(err);
  }
};


export const PropertySwiper = async (req,res) =>{
  try {
    const query = { Is_approve: true, Is_block: false, Is_list: false};
    const propertyData = await propertyModel.find(query)
    res.status(200).json(propertyData) 
  } catch (err) {
    console.log(err)
  }
}