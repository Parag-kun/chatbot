import { createContext, FC, PropsWithChildren, useContext } from "react";

interface IChatContext {
  isAdminView: boolean;
}

interface IChatContextProps extends PropsWithChildren {
  isAdminView: boolean;
}

const defaultChatContext: IChatContext = {
  isAdminView: false,
};

const ChatContext = createContext(defaultChatContext);

export const ChatContextProvider: FC<IChatContextProps> = ({
  children,
  isAdminView,
}) => {
  return (
    <ChatContext.Provider value={{ isAdminView }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
