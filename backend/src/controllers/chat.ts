import { Request, Response } from "express";
import {
  getChatResponseRequestBodyValidator,
  saveChatResponseRequestBodyValidator,
} from "../validators/chat";
import { getPromptResponse } from "../utils/groq";
import ChatResponse from "../models/chat-response";
import Chat from "../models/chat";
import { errorHandler } from "../utils/error-handler";

export const getChatResponse = errorHandler(async (req, res) => {
  const { prompts } = getChatResponseRequestBodyValidator.parse(req.body);

  const response = await getPromptResponse(prompts);

  res.status(200).json({ success: true, data: { response } });
});

export const saveChatResponse = errorHandler(async (req, res) => {
  const userId = res.locals.userId;
  const { prompt, response, chatId } =
    saveChatResponseRequestBodyValidator.parse(req.body);

  const chatResponse = await ChatResponse.create({ prompt, response });

  const chat = await Chat.findOne({ _id: chatId, userId });

  if (chat) {
    chat.responses.push(chatResponse._id as any);

    await chat.save();
  } else {
    await Chat.create({ userId, responses: [chatResponse._id] });
  }

  res.status(200).json({ success: true });
});

export const getChatResponses = errorHandler(async (req, res) => {
  const chatId = req.params.id;

  const chat = await Chat.findOne({ _id: chatId }).populate("responses");

  if (!chat) {
    res.status(404).json({ success: false, error: "Chat not found" });

    return;
  }

  res.status(200).json({ success: true, data: { chat } });
});
