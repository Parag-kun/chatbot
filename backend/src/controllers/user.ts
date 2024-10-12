import { signupValidator } from "../validators/user";
import User from "../models/user";
import { getToken } from "../utils/auth";
import { errorHandler } from "../utils/error-handler";
import Chat from "../models/chat";

export const signupUser = errorHandler(async (req, res) => {
  const { email, password } = signupValidator.parse(req.body);

  const user = await User.findOne({ email });

  if (user) {
    res.status(401).json({ success: false, error: "Email already exists" });

    return;
  }

  const { _id } = await User.create({ email, password });

  const token = getToken(_id);

  res.status(200).json({ success: true, data: { token } });
});

export const loginUser = errorHandler(async (req, res) => {
  const { email, password } = signupValidator.parse(req.body);

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ success: false, error: "Email does not exist" });

    return;
  }

  if (password !== user.password) {
    res.status(400).json({ success: false, error: "Incorrect Password" });

    return;
  }

  const token = getToken(user._id);

  res.status(200).json({ success: true, data: { token } });
});

export const getCurrentUser = errorHandler(async (req, res) => {
  const user = await User.findById(res.locals.userId);

  if (!user) {
    res.status(404).json({ success: false, error: "User not found" });

    return;
  }

  res.status(200).json({ success: true, data: { user } });
});

export const getUserChats = errorHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ success: false, error: "User not found" });

    return;
  }

  const chats = await Chat.find({ userId }).populate("responses");

  res.status(200).json({ success: true, data: { chats } });
});

export const getUsers = errorHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({ success: true, data: { users } });
});
