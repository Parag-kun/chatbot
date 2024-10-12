import groq, { llamaModel } from "../configs/groq";

export const getPromptResponse = async (prompts: string[]) => {
  const messages = prompts.map((prompt) => ({
    role: "user" as const,
    content: prompt,
  }));

  const response = await groq.chat.completions.create({
    messages,
    model: llamaModel,
  });

  return response.choices[0]?.message.content;
};
