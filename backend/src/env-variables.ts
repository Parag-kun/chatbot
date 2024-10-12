import { config } from "dotenv";

config();

export const PORT = process.env.PORT as string;
export const API_KEY = process.env.API_KEY as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URL = process.env.MONGO_URL as string;