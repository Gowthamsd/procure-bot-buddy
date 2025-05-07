
import React, { useState, useRef, useEffect } from "react";
import { Bot, X, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  button?: {
    label: string;
    link: string;
  };
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm ProcureBot, your procurement assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatBotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatBotRef.current && 
        !chatBotRef.current.contains(event.target as Node) && 
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the API
      const response = await axios.post("http://localhost:8000/chat", { message: text });
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response,
        role: "assistant",
        timestamp: new Date(),
        button: response.data.button,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to the chatbot server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (label: string) => {
    // Encode the button text for the URL
    const encodedText = encodeURIComponent(label);
    // Close the chat when navigating
    setIsOpen(false);
    // Navigate to the button page
    navigate(`/button/${encodedText}`);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sendMessage(input);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div ref={chatBotRef} className="flex flex-col h-[500px] w-[350px] shadow-lg rounded-lg overflow-hidden bg-white">
          <div className="flex items-center justify-between bg-purple-600 text-white p-3">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h2 className="text-lg font-medium">ProcureBot</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-purple-700"
              onClick={toggleChat}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-slate-800 border border-slate-200 shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.button && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-purple-500 hover:bg-purple-600 text-white mt-2"
                      onClick={() => handleButtonClick(message.button!.label)}
                    >
                      {message.button.label}
                    </Button>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-purple-100" : "text-slate-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-3 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
