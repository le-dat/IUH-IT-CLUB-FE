"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bot, MessageCircle, Send as SendIcon, User, X } from "lucide-react";
import { motion } from "framer-motion";
import useGeminiAi from "@/hooks/useGeminiAi";

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="my-2 p-2 w-fit rounded-lg flex items-center bg-blue-500 text-white self-end ml-auto">
    <span className="break-words">{text}</span>
  </div>
);

const BotMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="my-2 flex items-start text-black self-start">
    <Bot className="w-5 h-5 mr-2" />
    <span className="bg-gray-200 p-2 w-fit rounded-lg break-words">{text}</span>
  </div>
);

const ChatbotPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data, refresh } = useGeminiAi();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setInput("");
      setLoading(true);
      const res = await refresh(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: false, text: res || data || "This is a bot response." },
      ]);
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 z-[50] right-4 flex flex-col items-end">
      {isOpen && (
        <motion.div
          className="mb-2 w-96 h-full max-h-[600px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 px-3 py-4 overflow-y-scroll">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex items-center justify-center">Bắt đầu cuộc trò chuyện với bot ai</div>
            ) : (
              <>
                {messages.map((message, index) =>
                  message.user ? (
                    <UserMessage key={index} text={message.text} />
                  ) : (
                    <BotMessage key={index} text={message.text} />
                  )
                )}
                {loading && (
                  <div className="my-2 flex items-center text-black self-start">
                    <Bot className="w-5 h-5 mr-2 animate-spin" />
                    <span className="bg-gray-200 p-2 w-fit rounded-lg">Đang tải...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className="flex p-2 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 border border-gray-300 rounded-l-lg"
              disabled={loading}
              ref={inputRef}
            />
            <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-lg" disabled={loading}>
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatbotPopup;