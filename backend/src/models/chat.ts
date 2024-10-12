import { model, Schema } from "mongoose";
import { IChat } from "../types/chat";

const { ObjectId } = Schema.Types;

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: ObjectId,
      ref: "Users",
      required: true,
    },
    responses: [
      {
        type: ObjectId,
        ref: "ChatResponses",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Chat = model("Chats", chatSchema);

export default Chat;
