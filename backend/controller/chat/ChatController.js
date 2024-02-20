// import userModel from '../../models/userModel'
import Chat from "../../models/chatModal.js";
import Message from "../../models/messageModal.js";
import Owner from "../../models/propertyOwnerModel.js";
import User from "../../models/userModel.js";

export const AccessChat = async (req, res) => {
  console.log('anas');
  const { userId, ownerId } = req.body;
  if (!userId) {
    console.log("User not found");
    return res.status(400);
  }

  try {
    let isChat = await Chat.findOne({
      "users.owner": ownerId,
      "users.user": userId,
    })
      .populate("users.user", "-password")
      .populate("users.owner", "-password")
      .populate("latestMessage");
    if (isChat) {
      res.status(200).json(isChat);
    } else {
      const chatData = {
        chatName: "sender",
        users: {
          owner: ownerId,
          user: userId,
        },
      };

      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users.user", "-password")
        .populate("users.owner", "-password")
        .populate("latestMessage")
        .populate({
          path: "latestMessage",
          populate: {
            path: "sender.owner" ? "sender.owner" : "sender.user",
            select: "-password",
          },
        });
      res.status(200).json(FullChat);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const SearchUserChat = async (req, res) => {
  try {
    const keyword = req.params.search
      ? {
          $or: [
            { name: { $regex: req.params.search, $options: "i" } },
            { email: { $regex: req.params.search, $options: "i" } },
          ],
        }
      : {};

    const users = await Owner.find(keyword);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const SearchOwnerChat = async (req, res) => {
  try {
    const keyword = req.params.search
      ? {
          $or: [
            { name: { $regex: req.params.search, $options: "i" } },
            { email: { $regex: req.params.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

export const FetchChats = async (req, res) => {
  try {
    const { userId } = req.params;
    await Chat.find({ "users.user": userId })
      .populate("users.user", "-password")
      .populate("users.owner", "-password")
      .populate("latestMessage")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender.owner" ? "sender.owner" : "sender.user",
          select: "-password",
        },
      })
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender.user",
          select: "-password",
        },
      })
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
};

export const FetchOwnerChats = async (req, res) => {
  const { userId } = req.params;
  await Chat.find({ "users.owner": userId })
    .populate("users.user", "-password")
    .populate("users.owner", "-password")
    .populate("latestMessage")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender.owner",
        select: "-password",
      },
    })
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender.user",
        select: "-password",
      },
    })
    .then((result) => {
      res.send(result);
    });
};

export const SendMessage = async (req, res) => {
  try {
    const { content, chatId, userId } = req.body;
    if (!content || !chatId) {
      console.log("Invalid parameters");
      return res.status(400);
    }

    const newMessage = {
      sender: { user: userId },
      content: content,
      chat: chatId,
    };

    let message = await Message.create(newMessage);

    message = await message.populate("sender.owner", "name");
    message = await message.populate("chat");

    message = await User.populate(message, [
      {
        path: "chat.users.owner",
        select: "name email",
      },
    ]);

    let data = await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: message,
      },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    console.log(err);
  }
};

export const OwnerSendMessage = async (req, res) => {
  try {
    const { content, chatId, userId } = req.body;
    if (!content || !chatId) {
      console.log("Invalid parameters");
      return res.status(400);
    }

    const newMessage = {
      sender: { owner: userId },
      content: content,
      chat: chatId,
    };

    let message = await Message.create(newMessage);

    message = await message.populate("sender.user", "name");
    message = await message.populate("chat");

    message = await User.populate(message, [
      {
        path: "chat.users.user",
        select: "name email",
      },
    ]);

    let data = await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: message,
      },
      { new: true }
    );
    res.json(message);
  } catch (err) {
    console.log(err);
  }
};

export const AllMessages = async (req, res) => {
  try {
    console.log();
    const message = await Message.find({ chat: req.params.chatId })
    .populate({
      path: 'sender',
      populate: [
        { path: 'user' },
        { path: 'owner' }
      ]
    });
    res.json(message);
  } catch (error) {
    console.log(error.message);
  }
};
