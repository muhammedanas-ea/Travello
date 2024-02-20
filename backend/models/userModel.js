import mongoose from "mongoose";

const { Schema } = mongoose;

const UsersSchema = new Schema({
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
  number: {
    type: Number,
  },
  houseName: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  is_block: {
    type: Boolean,
    default:false,
  },
  wallet:{
    type: Number,
    default:0,
  },
  is_verified: {
    type: Boolean,
    default:false,
  },
  is_admin: {
    type: Boolean,
    default:false,
  },
  googleSignup: {
    type: Boolean,
    default:false,
  }
});

const users = mongoose.model("users", UsersSchema);

export default users;
