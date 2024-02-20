import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema(
  {
    sender: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "PropertyOwner",
      },
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);

export default Message;
