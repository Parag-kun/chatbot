import { FC } from "react";
import Button from "../ui/button";
import ChatHistoryModal from "./chat-history-modal";
import { useSetHistoryModalDispatch } from "../../redux/actions/modal";
import { useNavigate } from "react-router-dom";
import { useCurrentUserSelector } from "../../redux/selectors/user";
import { useAppDispatch } from "../../redux/hooks";
import { setPromptResponses } from "../../redux/slices/prompt-response";

interface IChatControlSectionProps {
  closeFloater?: VoidFunction;
}

const ChatControlSection: FC<IChatControlSectionProps> = ({ closeFloater }) => {
  const navigate = useNavigate();
  const dispatchHistoryModal = useSetHistoryModalDispatch();
  const dispatch = useAppDispatch();
  const currentUser = useCurrentUserSelector();

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
          dispatch(setPromptResponses([]));
          closeFloater?.();
        }}
        className="text-sm"
      >
        New Chat
      </Button>
      {currentUser && (
        <Button
          onClick={() => {
            dispatchHistoryModal();
            closeFloater?.();
          }}
          className="text-sm"
        >
          Histories
        </Button>
      )}
      <ChatHistoryModal />
    </div>
  );
};

export default ChatControlSection;
