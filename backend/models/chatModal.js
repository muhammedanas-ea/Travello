import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "PropertyOwner",
      },
    },
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
