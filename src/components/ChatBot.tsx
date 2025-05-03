
import React, { useState, useRef, useEffect } from "react";
import { Bot, X, MessageSquare, PlusCircle, FileText, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

// Define the conversation flow structure
type ConversationOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  nextStep?: string;
  response: string;
};

// Main conversation flow data
const CONVERSATION_FLOW: Record<string, ConversationOption[]> = {
  main: [
    {
      id: "add-budget",
      label: "Add Budget",
      icon: <DollarSign className="h-4 w-4" />,
      nextStep: "budget",
      response: "Please specify the budget amount and category you'd like to add:",
    },
    {
      id: "create-intake",
      label: "Create Intake Form",
      icon: <FileText className="h-4 w-4" />,
      nextStep: "intake",
      response: "Let's create a new procurement intake form. What type of purchase are you initiating?",
    },
    {
      id: "remaining-days",
      label: "Remaining Days",
      icon: <Calendar className="h-4 w-4" />,
      nextStep: "days",
      response: "Here's the status of your ongoing procurement events and their deadlines:",
    },
    {
      id: "catalog",
      label: "Browse Catalog",
      nextStep: "catalog",
      response: "What type of items are you looking for in our catalog?",
    },
    {
      id: "order",
      label: "Order Status",
      nextStep: "order",
      response: "Which order would you like to check?",
    },
    {
      id: "vendor",
      label: "Vendor Management",
      nextStep: "vendor",
      response: "What vendor information do you need?",
    },
    {
      id: "policy",
      label: "Procurement Policies",
      nextStep: "policy",
      response: "What policy information would you like to know?",
    },
  ],
  budget: [
    {
      id: "budget-it",
      label: "IT Equipment (₹500,000)",
      nextStep: "budget-confirm",
      response: "You've selected to add ₹500,000 to the IT Equipment budget. Is this correct?",
    },
    {
      id: "budget-office",
      label: "Office Supplies (₹200,000)",
      nextStep: "budget-confirm",
      response: "You've selected to add ₹200,000 to the Office Supplies budget. Is this correct?",
    },
    {
      id: "budget-manufacturing",
      label: "Manufacturing (₹1,000,000)",
      nextStep: "budget-confirm",
      response: "You've selected to add ₹1,000,000 to the Manufacturing budget. Is this correct?",
    },
    {
      id: "budget-services",
      label: "Services (₹300,000)",
      nextStep: "budget-confirm",
      response: "You've selected to add ₹300,000 to the Services budget. Is this correct?",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
  "budget-confirm": [
    {
      id: "confirm-yes",
      label: "Yes, Add Budget",
      response: "Budget has been added successfully! The updated budget allocation is now reflected in your dashboard.",
      nextStep: "main",
    },
    {
      id: "confirm-no",
      label: "No, Go Back",
      nextStep: "budget",
      response: "Let's try again. What budget would you like to add?",
    },
  ],
  intake: [
    {
      id: "intake-it",
      label: "IT Equipment",
      nextStep: "intake-details",
      response: "Let's set up an intake form for IT Equipment procurement. What specific equipment are you looking for?",
    },
    {
      id: "intake-office",
      label: "Office Supplies",
      nextStep: "intake-details",
      response: "Let's set up an intake form for Office Supplies procurement. What specific supplies are you looking for?",
    },
    {
      id: "intake-services",
      label: "Professional Services",
      nextStep: "intake-details",
      response: "Let's set up an intake form for Professional Services procurement. What specific services are you looking for?",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
  "intake-details": [
    {
      id: "intake-urgent",
      label: "Urgent Request",
      nextStep: "intake-confirm",
      response: "You've marked this as an urgent request. This will be prioritized in the approval workflow.",
    },
    {
      id: "intake-standard",
      label: "Standard Request",
      nextStep: "intake-confirm",
      response: "You've selected a standard request. This will follow the normal approval process.",
    },
  ],
  "intake-confirm": [
    {
      id: "intake-submit",
      label: "Submit Intake Form",
      response: "Thank you! Your intake form has been submitted with ID: INTAKE-2025-0132. You'll receive updates on approvals via email.",
      nextStep: "main",
    },
    {
      id: "back-intake",
      label: "Go Back",
      nextStep: "intake",
      response: "Let's modify your intake form. What would you like to change?",
    },
  ],
  days: [
    {
      id: "days-rfp",
      label: "RFP Deadlines",
      response: "Current RFP Deadlines:\n- IT Hardware RFP: 8 days remaining\n- Cloud Services RFP: 15 days remaining\n- Security Audit RFP: 5 days remaining",
    },
    {
      id: "days-rfq",
      label: "RFQ Deadlines",
      response: "Current RFQ Deadlines:\n- Office Furniture RFQ: 3 days remaining\n- Manufacturing Equipment RFQ: 12 days remaining",
    },
    {
      id: "days-contracts",
      label: "Contract Renewals",
      response: "Upcoming Contract Renewals:\n- Software Licenses: 30 days remaining\n- Maintenance Services: 45 days remaining\n- Facility Management: 60 days remaining",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
  catalog: [
    {
      id: "catalog-office",
      label: "Office Supplies",
      nextStep: "office-supplies",
      response: "We have a wide range of office supplies. What specific items are you looking for?",
    },
    {
      id: "catalog-tech",
      label: "Technology & Equipment",
      nextStep: "tech-equipment",
      response: "What kind of technology or equipment are you looking for?",
    },
    {
      id: "catalog-furniture",
      label: "Office Furniture",
      nextStep: "furniture",
      response: "What type of office furniture do you need?",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
  "tech-equipment": [
    {
      id: "tech-laptop",
      label: "Laptops",
      response: "We have Dell XPS 13 ($1,299), MacBook Air M2 ($1,199), and ThinkPad X1 Carbon ($1,499) available in our catalog. Would you like to place an order for any of these?",
      nextStep: "laptop-order",
    },
    {
      id: "tech-monitor",
      label: "Monitors",
      response: "We have Dell UltraSharp 27\" ($499), LG 32\" UltraFine ($699), and Samsung 34\" Curved ($799) monitors available.",
    },
    {
      id: "tech-accessories",
      label: "Accessories",
      response: "We have various accessories including keyboards, mice, headsets, and webcams available in our catalog.",
    },
    {
      id: "back-catalog",
      label: "Back to Catalog",
      nextStep: "catalog",
      response: "What category of items would you like to browse?",
    },
  ],
  "laptop-order": [
    {
      id: "order-dell",
      label: "Order Dell XPS 13",
      response: "Great! I've initiated the order for a Dell XPS 13 laptop. Your procurement request ID is PR-2023-0542. The order will be sent for approval to your manager.",
    },
    {
      id: "order-macbook",
      label: "Order MacBook Air M2",
      response: "Great! I've initiated the order for a MacBook Air M2 laptop. Your procurement request ID is PR-2023-0543. The order will be sent for approval to your manager.",
    },
    {
      id: "order-thinkpad",
      label: "Order ThinkPad X1",
      response: "Great! I've initiated the order for a ThinkPad X1 Carbon laptop. Your procurement request ID is PR-2023-0544. The order will be sent for approval to your manager.",
    },
    {
      id: "back-tech",
      label: "Back to Technology Menu",
      nextStep: "tech-equipment",
      response: "What else can I help you with from our technology catalog?",
    },
  ],
  order: [
    {
      id: "order-recent",
      label: "Recent Orders",
      response: "Here are your recent orders: PR-2023-0542 (Dell XPS 13) - Pending Approval, PR-2023-0498 (Office Supplies) - Shipped, PR-2023-0476 (Ergonomic Chair) - Delivered",
    },
    {
      id: "order-pending",
      label: "Pending Approvals",
      response: "You have 1 order pending approval: PR-2023-0542 (Dell XPS 13) submitted on May 1, 2025",
    },
    {
      id: "order-shipped",
      label: "Shipped Orders",
      response: "You have 1 order that has been shipped: PR-2023-0498 (Office Supplies) - Expected delivery: May 5, 2025",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
  vendor: [
    {
      id: "vendor-list",
      label: "Approved Vendors",
      response: "Our approved vendors include: Dell, Apple, Lenovo, Staples, Office Depot, Herman Miller, and Steelcase",
    },
    {
      id: "vendor-add",
      label: "Add New Vendor",
      response: "To add a new vendor, please provide the vendor name, contact information, and product categories. The vendor will need to go through our approval process which takes 2-4 weeks.",
    },
    {
      id: "vendor-performance",
      label: "Vendor Performance",
      response: "Our top performing vendors this quarter are: Dell (4.9/5), Herman Miller (4.8/5), and Apple (4.7/5)",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
  policy: [
    {
      id: "policy-approval",
      label: "Approval Thresholds",
      response: "Approval thresholds: Up to $500 - No approval needed, $501-$1,000 - Manager approval, $1,001-$5,000 - Director approval, Above $5,000 - VP approval",
    },
    {
      id: "policy-process",
      label: "Procurement Process",
      response: "Our procurement process involves: 1) Request creation, 2) Approval based on thresholds, 3) Purchase order generation, 4) Order placement, 5) Delivery confirmation, 6) Invoice processing",
    },
    {
      id: "policy-emergency",
      label: "Emergency Purchases",
      response: "For emergency purchases, contact the procurement team directly at procurement@company.com or call extension 5555.",
    },
    {
      id: "back-main",
      label: "Back to Main Menu",
      nextStep: "main",
      response: "What else can I help you with?",
    },
  ],
};

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentOptions, setCurrentOptions] = useState<ConversationOption[]>(CONVERSATION_FLOW.main);
  const [currentStep, setCurrentStep] = useState<string>("main");
  const [isOpen, setIsOpen] = useState(false);
  const chatBotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const handleOptionSelect = (optionId: string) => {
    // Find the selected option
    const selectedOption = currentOptions.find(option => option.id === optionId);
    if (!selectedOption) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: selectedOption.label,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Add assistant response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: selectedOption.response,
      role: "assistant",
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
      
      // Update the current step if there's a next step
      if (selectedOption.nextStep) {
        setCurrentStep(selectedOption.nextStep);
        setCurrentOptions(CONVERSATION_FLOW[selectedOption.nextStep]);
      }

      // Show toast notifications for certain actions
      if (optionId === "confirm-yes") {
        toast({
          title: "Budget Added",
          description: "Your budget has been added successfully!",
        });
      } else if (optionId === "intake-submit") {
        toast({
          title: "Intake Form Submitted",
          description: "Your intake form has been submitted successfully!",
        });
      }
    }, 500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div ref={chatBotRef} className="flex flex-col h-[500px] w-[350px] shadow-lg rounded-lg overflow-hidden">
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
            <div className="flex flex-wrap gap-2">
              {currentOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleOptionSelect(option.id)}
                  className="flex items-center gap-2 text-left justify-start px-3 py-2 h-auto"
                >
                  {option.icon}
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
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
