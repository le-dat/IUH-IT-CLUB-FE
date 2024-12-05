"use client";

import React, { useState } from "react";
import { Bot, MessageCircle, SendIcon, User, X } from "lucide-react";
import useChatOpenAi from "@/hooks/useChatOpenAi";

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="my-2 p-2 w-fit rounded-lg flex items-center bg-blue-500 text-white self-end ml-auto">
    <span>{text}</span>
  </div>
);

const BotMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="my-2 flex items-center  text-black self-start">
    <Bot className="w-5 h-5 mr-2" />
    <span className="bg-gray-200 p-2 w-fit rounded-lg ">{text}</span>
  </div>
);

const ChatbotPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const {data, refresh} = useChatOpenAi()

  const handleSend = async() => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setInput("");
      // Simulate bot response
     await refresh(input)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: "This is a bot response." },
        ]);
      }, 1000);
    }
  };

  console.log('data', data)

  return (
    <div className="fixed bottom-4 z-[50] right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="mt-2 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <div className="flex-1 px-3 py-4 overflow-y-scroll">
          {messages.length === 0 ? (
              <div className="text-center text-gray-500">Bắt đầu cuộc trò chuyện với bot ai</div>
            ) : (
              messages.map((message, index) =>
                message.user ? (
                  <UserMessage key={index} text={message.text} />
                ) : (
                  <BotMessage key={index} text={message.text} />
                )
              )
            )}
          </div>
          <div className="flex p-2 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-lg"
            />
            <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-lg">
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
