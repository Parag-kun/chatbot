import { FC } from "react";
import ChatWindow from "./chat-window";
import ChatInput from "./chat-input";
import { ChatContextProvider } from "./context";
import { useAppDispatch } from "../../redux/hooks";
import { addPrompt } from "../../redux/slices/prompt-response";
import { useGetPromptResponse } from "../../tanstack-queries/chat";
import { usePromptResponsesSelector } from "../../redux/selectors/prompt-response";

interface IChatSectionProps {
  isAdminView?: boolean;
}

const ChatSection: FC<IChatSectionProps> = ({ isAdminView = false }) => {
  const dispatch = useAppDispatch();
  const promptResponses = usePromptResponsesSelector();

  const { mutateAsync: getPromptResponse } = useGetPromptResponse();

  const handleSendPrompt = async (prompt: string) => {
    if (!prompt) return;

    dispatch(addPrompt(prompt));

    await getPromptResponse({
      prompts: promptResponses.map((it) => it.prompt).concat(prompt),
    });
  };

  return (
    <ChatContextProvider isAdminView={isAdminView}>
      <div className="h-full flex-1 max-w-[900px] flex flex-col gap-5 p-4">
        <ChatWindow />
        {!isAdminView && <ChatInput onSend={handleSendPrompt} />}
      </div>
    </ChatContextProvider>
  );
};

export default ChatSection;
