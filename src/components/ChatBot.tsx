
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm ProcureBot, your procurement assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const PROCUREMENT_RESPONSES = {
  catalog: "I can help you find items in our catalog. What are you looking for?",
  order: "I can check your order status. Do you have an order number?",
  vendor: "I can assist with vendor management. What vendor information do you need?",
  policy: "Our procurement policy requires approval for purchases over $1,000. Would you like me to guide you through the approval process?",
  approval: "To request approval, please provide: 1) Item description, 2) Quantity, 3) Estimated cost, and 4) Business justification.",
  help: "I can help with: finding items in our catalog, checking order status, vendor management, and procurement policies. What do you need assistance with?",
  default: "I'm still learning about procurement. Could you try rephrasing your question?",
};

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);

      if (input.toLowerCase().includes("order") && input.toLowerCase().includes("laptop")) {
        toast({
          title: "Order Initiated",
          description: "Your laptop order has been initiated successfully!",
        });
      }
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    if (input.includes("catalog") || input.includes("item") || input.includes("product")) {
      return PROCUREMENT_RESPONSES.catalog;
    } else if (input.includes("order") || input.includes("status")) {
      return PROCUREMENT_RESPONSES.order;
    } else if (input.includes("vendor") || input.includes("supplier")) {
      return PROCUREMENT_RESPONSES.vendor;
    } else if (input.includes("policy") || input.includes("rule")) {
      return PROCUREMENT_RESPONSES.policy;
    } else if (input.includes("approval") || input.includes("approve")) {
      return PROCUREMENT_RESPONSES.approval;
    } else if (input.includes("help") || input.includes("what can you do")) {
      return PROCUREMENT_RESPONSES.help;
    } else if (input.includes("laptop") && input.includes("need")) {
      return "I can help you order a laptop. Our standard model is the Dell XPS 13 ($1,299). Would you like to proceed with this order?";
    } else if (input.includes("yes") && (messages[messages.length-2]?.content || "").includes("laptop")) {
      return "Great! I've initiated the order for a Dell XPS 13 laptop. Your procurement request ID is PR-2023-0542. The order will be sent for approval to your manager.";
    } else {
      return PROCUREMENT_RESPONSES.default;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-full">
      <div className="flex items-center gap-2 bg-blue-600 text-white p-3 rounded-t-lg">
        <Bot className="h-6 w-6" />
        <h2 className="text-lg font-medium">ProcureBot</h2>
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-800 border border-slate-200 shadow-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.role === "user" ? "text-blue-100" : "text-slate-400"
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
        {isLoading && (
          <div className="flex items-center justify-start mb-4">
            <div className="bg-white text-slate-800 px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-3 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-slate-500 mt-2">
          Try asking about the catalog, order status, or procurement policies
        </div>
      </div>
    </div>
  );
};
