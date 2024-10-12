import { FC, HTMLProps, useState } from "react";

interface IChatInputProps extends HTMLProps<HTMLInputElement> {
  onSend?: (message: string) => void;
}

const ChatInput: FC<IChatInputProps> = ({ onSend, ...props }) => {
  const [prompt, setPrompt] = useState("");

  const sendPrompt = () => {
    onSend?.(prompt);
    setPrompt("");
  }

  const handleKeyDown = (key: string) => {
    switch (key) {
      case "Enter": {
        sendPrompt();
        break;
      }
    }
  }

  return (
    <div className="bg-blue-50 rounded-xl flex gap-2">
      <input
        className="p-2 w-full outline-none bg-transparent rounded-xl text-sm"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={e => handleKeyDown(e.key)}
        {...props}
      />
      <img
        src="/send-icon.png"
        className="w-12 right-0 top-0 bottom-0 bg z-10 cursor-pointer"
        onClick={sendPrompt}
      />
    </div>
  );
};

export default ChatInput;
