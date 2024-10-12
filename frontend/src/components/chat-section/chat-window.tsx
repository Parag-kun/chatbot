import { FC } from "react";
import { usePromptResponsesSelector } from "../../redux/selectors/prompt-response";
import { useSavePromptResponse } from "../../tanstack-queries/chat";
import { useParams, useSearchParams } from "react-router-dom";
import { useCurrentUserSelector } from "../../redux/selectors/user";
import { useSetAuthModalDispatch } from "../../redux/actions/modal";
import Loader from "../ui/loader";
import { useChatContext } from "./context";

const ChatWindow: FC = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { isAdminView } = useChatContext();

  const promptResponses = usePromptResponsesSelector();
  const currentUser = useCurrentUserSelector();
  const dispatchAuthModal = useSetAuthModalDispatch();

  const { mutateAsync: saveResponse } = useSavePromptResponse();

  const handleSaveResponse = async (
    promptResponse: (typeof promptResponses)[0]
  ) => {
    if (!currentUser) {
      dispatchAuthModal();

      return;
    }

    await saveResponse({ ...promptResponse, chatId: chatId ?? undefined });
  };

  return (
    <div className="flex-1 rounded-lg overflow-y-auto overflow-x-hidden apple-scrollbar">
      {promptResponses.map((unit) => (
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white rounded-r-lg rounded-b-lg px-4 py-3 text-justify">
              {unit.prompt}
            </div>
            {!isAdminView && (
              <img
                src="/save-icon.png"
                className="w-8 cursor-pointer"
                onClick={() => handleSaveResponse(unit)}
              />
            )}
          </div>
          {unit.response ? (
            <div className="bg-blue-50 text-blue-700 rounded-l-lg rounded-b-lg px-4 py-3 text-justify">
              {unit.response}
            </div>
          ) : (
            <Loader size={20} className="self-end" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
