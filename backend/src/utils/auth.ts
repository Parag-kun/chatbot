import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env-variables";
import { Types } from "mongoose";

export const getToken = (userId: Types.ObjectId) => {
  return jwt.sign({ userId }, JWT_SECRET);
};
