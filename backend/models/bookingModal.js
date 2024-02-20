import mongoose from "mongoose";

const { Schema } = mongoose;

const BookingsSchema = new Schema({
  CheckOut: {
    type: Date,
  },
  ChekIn: {
    type: Date,
  },
  Address: {
    Email: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Name: {
      type: String,
    },
  },
  TransactionId:{
    type: String,
  },
  TotalGuest: {
    type: Number,
  },
  TotalRooms: {
    type: Number,
  },
  TotalRate: {
    type: Number,
  },
  bookingStatus: {
    type: String,
    default: "pending",
  },
  paymentMethode:{
    type: String,
    default: 'online'
  },
  Date:{
    type: Date
  },
  PropertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required:true
  },
  UsersId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required:true
  },
});

const Bookings = mongoose.model("Bookings", BookingsSchema);

export default Bookings;
