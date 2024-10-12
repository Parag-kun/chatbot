import { z } from "zod";

export const getChatResponseRequestBodyValidator = z.object({
  prompts: z.array(z.string(), { required_error: "Prompt array required" }),
});

export const saveChatResponseRequestBodyValidator = z.object({
  chatId: z.string().optional(),
  prompt: z.string({ required_error: "Prompt required" }),
  response: z.string({ required_error: "Response required" }),
});
