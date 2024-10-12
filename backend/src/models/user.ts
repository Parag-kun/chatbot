import { model, Schema, SchemaTypes } from "mongoose";
import { IUser, UserRoles } from "../types/user";

const { String } = SchemaTypes;

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: UserRoles.USER,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

export default User;
