import mongoose from "mongoose";
import { MONGO_URL } from "../env-variables";

export const connectDB = async () => {
  await mongoose.connect(MONGO_URL);

  console.log("Connected to DB")
};
