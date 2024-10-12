import { FC } from "react";
import Modal from "../ui/modal";
import { useIsHistoryModalSelector } from "../../redux/selectors/modal";
import { useClearModalDispatch } from "../../redux/actions/modal";
import { useAppSelector } from "../../redux/hooks";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";
import { IChat } from "../../redux/slices/chat";

interface IChatHistoryModalProps {
  onChatClick?: (chat: IChat) => void;
}

const ChatHistoryModal: FC<IChatHistoryModalProps> = ({ onChatClick }) => {
  const navigate = useNavigate();
  const isChatHistoryModalOpen = useIsHistoryModalSelector();
  const dispatchClearModal = useClearModalDispatch();
  const chats = useAppSelector((state) => state.chat.chats);

  if (!onChatClick) {
    onChatClick = (chat: IChat) => navigate(`/?chatId=${chat._id}`);
  }

  return (
    <Modal isOpen={isChatHistoryModalOpen} onClose={dispatchClearModal}>
      <div>Chat history</div>
      <div className="flex flex-col gap-2 mt-2">
        {chats.map((chat) => (
          <Button
            variant="outlined"
            onClick={() => {
              onChatClick(chat);
              dispatchClearModal();
            }}
          >
            {chat.responses[0]?.prompt.slice(0, 30) ?? chat._id}
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default ChatHistoryModal;
