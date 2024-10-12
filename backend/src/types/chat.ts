import { ObjectId } from "mongoose";

export interface IChat {
  userId: ObjectId;
  responses: ObjectId[];
}
