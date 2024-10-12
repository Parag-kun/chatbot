import { model, Schema, SchemaTypes } from "mongoose";
import { IChatResponse } from "../types/chat-response";

const { String } = SchemaTypes;

export const chatResponseSchema = new Schema<IChatResponse>(
  {
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatResponse = model("ChatResponses", chatResponseSchema);

export default ChatResponse;
