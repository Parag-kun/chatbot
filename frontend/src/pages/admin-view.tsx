import ChatSection from "../components/chat-section";
import { FC, useState } from "react";
import Floater from "../components/ui/floater";
import { useCurrentUser, useGetUserChats } from "../tanstack-queries/user";
import { useGetChatPromptResponse } from "../tanstack-queries/chat";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/button";

const AdminViewPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [isVIsible, setIsVIsible] = useState(false);

  useGetChatPromptResponse(chatId ?? undefined);

  return (
    <div className="w-full h-full bg-white overflow-hidden flex justify-center">
      <Floater
        isVisible={isVIsible}
        onClose={() => setIsVIsible(false)}
        onOpen={() => setIsVIsible(true)}
      >
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate("/admin")}>Admin Panel</Button>
        </div>
      </Floater>
      <ChatSection isAdminView />
    </div>
  );
};

export default AdminViewPage;
