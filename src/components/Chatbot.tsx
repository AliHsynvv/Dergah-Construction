"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Parse and format bot message with proper line breaks and structure
function formatBotMessage(text: string): string {
  return text
    // Add line break before emoji bullet points
    .replace(/(✅|🧱|📐|🌿|🔧|💬|🏗️|🎨|🌱|⚡)/g, '\n$1')
    // Add line break before numbered lists
    .replace(/(\d+\.\s)/g, '\n$1')
    // Add line break before regular bullet points
    .replace(/\n?(•|\*|\-)\s/g, '\n• ')
    // Clean up multiple line breaks (more than 2)
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Salam! 👋\n\nDargah Construction-a xoş gəlmisiniz.\n\nSizə necə kömək edə bilərəm? 💬",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          message: inputValue,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "Failed to send message");
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Cavab alındı. Tezliklə sizinlə əlaqə saxlayacağıq.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: unknown) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Üzr istəyirik, xəta baş verdi. Zəhmət olmasa yenidən cəhd edin və ya bizimlə birbaşa əlaqə saxlayın: +994 70 299 99 98",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand to-blue-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[95vw] sm:w-[450px] md:w-[500px] h-[600px] sm:h-[650px] max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-brand to-blue-700 text-white">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                <Bot className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Dargah Assistant</h3>
                <p className="text-sm text-white/80">Online • Sizə kömək edə bilərəm</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${
                      message.sender === "user"
                        ? "bg-brand text-white"
                        : "bg-white border border-slate-200"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5 text-brand" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3.5 ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-brand to-blue-700 text-white"
                        : "bg-white border border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                      {message.sender === "bot" ? formatBotMessage(message.text) : message.text}
                    </div>
                    <p
                      className={`text-xs mt-1.5 ${
                        message.sender === "user" ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("az-AZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 flex-shrink-0">
                    <Bot className="h-4 w-4 text-brand" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-brand"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-brand"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-brand"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-white border-t border-slate-200/50">
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

