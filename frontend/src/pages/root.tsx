import ChatSection from "../components/chat-section";
import LoginSection from "../components/login-section";
import { FC, useState } from "react";
import ChatControlSection from "../components/chat-control-section";
import Floater from "../components/ui/floater";
import { useCurrentUser, useGetUserChats } from "../tanstack-queries/user";
import { useGetChatPromptResponse } from "../tanstack-queries/chat";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/ui/button";

const RootPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [isVIsible, setIsVIsible] = useState(false);

  const { data: user } = useCurrentUser();
  useGetUserChats((user as any)?._id);
  useGetChatPromptResponse(chatId ?? undefined);

  const isAdmin = (user as any)?.role === "ADMIN";

  return (
    <div className="w-full h-full bg-white overflow-hidden flex justify-center">
      <Floater
        isVisible={isVIsible}
        onClose={() => setIsVIsible(false)}
        onOpen={() => setIsVIsible(true)}
      >
        <div className="flex flex-col gap-2">
          <LoginSection closeFloater={() => setIsVIsible(false)} />
          <ChatControlSection closeFloater={() => setIsVIsible(false)} />
          {isAdmin && (
            <Button className="text-sm" onClick={() => navigate("/admin")}>Admin Panel</Button>
          )}
        </div>
      </Floater>
      <ChatSection />
    </div>
  );
};

export default RootPage;
