
import React from "react";
import { ChatBot } from "@/components/ChatBot";
import { Header } from "@/components/Header";
import { ProcurementDashboard } from "@/components/ProcurementDashboard";
import { CatalogPreview } from "@/components/CatalogPreview";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Procurement Dashboard</h1>
          
          <ProcurementDashboard />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CatalogPreview />
            </div>
            <div className="lg:col-span-1">
              <ChatBot />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          ProcureBuddy - Procurement Automation Platform © 2025
        </div>
      </footer>
    </div>
  );
};

export default Index;
