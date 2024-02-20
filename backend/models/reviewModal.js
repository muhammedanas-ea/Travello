import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingSchema = new Schema({
  ReviewRating: {
    type: Number,
    required: true,
  },
  Property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  ReviewDescription: {
    type: String,
    required: true,
  },
  Users: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Rating = mongoose.model("Rating", RatingSchema);

export default Rating;
