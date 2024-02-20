import mongoose from "mongoose";

const { Schema } = mongoose;

const PropertySchema = new Schema({
  Price: {
    type: Number,
    required: true,
  },
  PropertyName: {
    type: String,
    required: true,
  },
  RoomCount: {
    type: Number,
    required: true,
  },
  GuestCount: {
    type: String,
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  PropertyType: {
    type: String,
    required: true,
  },
  Image: [
    {
      type: String,
    },
  ],
  Is_block: {
    type: Boolean,
  },
  Amenities: [
    {
      type: String,
      required: true,
    },
  ],
  Is_block: {
    type: Boolean,
    default:false,
  },
  Is_approve: {
    type: Boolean,
    default: false,
  },
  Is_reject: {
    type: Boolean,
    default: false,
  },
  Is_list:{
    type:Boolean,
    default:false
  },
  propertOwner:{
    type: Schema.Types.ObjectId,
    ref: 'PropertyOwner',
    required: true,
  },
  bookings:[  {
    type: Schema.Types.ObjectId,
    ref: 'Bookings',
  }],
  Ratings:[{
    type: Schema.Types.ObjectId,
    ref: 'Rating',
  }]
});

const Property = mongoose.model("Property", PropertySchema);

export default Property;
