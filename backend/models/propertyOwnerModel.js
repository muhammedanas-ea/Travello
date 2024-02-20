import mongoose from "mongoose";

const { Schema } = mongoose;

const PropertyOwnerSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ownerImage: {
    type: String,
  },
  otp: {
    type: Number,
  }
});

const PropertyOwner = mongoose.model("PropertyOwner", PropertyOwnerSchema);

export default PropertyOwner;
