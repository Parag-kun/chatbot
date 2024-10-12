import { FC, useEffect, useState } from "react";
import { useGetUserChats, useGetUsers } from "../tanstack-queries/user";
import Button from "../components/ui/button";
import ChatHistoryModal from "../components/chat-control-section/chat-history-modal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useSetHistoryModalDispatch } from "../redux/actions/modal";
import { useQueryClient } from "@tanstack/react-query";
import { setChats } from "../redux/slices/chat";

const AdminPanel: FC = () => {
  const queryClient = useQueryClient();
  const { data: users } = useGetUsers();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dispatchHistoryModal = useSetHistoryModalDispatch();

  const [userId, setUserId] = useState<string>();

  const { data: chats } = useGetUserChats(userId ?? "");

  useEffect(() => {
    if (chats) {
      dispatch(setChats(chats as []));
    }
  }, [chats]);

  return (
    <div className="max-w-[400px] m-auto flex flex-col items-center gap-2 p-4">
      <div>Users</div>
      {users
        ? (users as Array<any>).map((user: any) => (
            <Button
              variant="outlined"
              onClick={() => {
                setUserId(user._id);
                dispatchHistoryModal();
              }}
            >
              {user.email}
            </Button>
          ))
        : "No users"}
      <ChatHistoryModal
        onChatClick={(chat) => navigate(`/admin-view?chatId=${chat._id}`)}
      />
    </div>
  );
};

export default AdminPanel;
