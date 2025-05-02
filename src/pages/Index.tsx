
import React from "react";
import { ChatBot } from "@/components/ChatBot";
import { Header } from "@/components/Header";
import { ProcurementDashboard } from "@/components/ProcurementDashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 lg:px-8">
          <ProcurementDashboard />
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          ProcUrPal - Procurement Automation Platform © 2025
        </div>
      </footer>
      
      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Index;
