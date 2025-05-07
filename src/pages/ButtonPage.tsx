
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ButtonPage = () => {
  const { buttonText } = useParams();
  
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto max-w-2xl">
        <Link to="/">
          <Button variant="outline" className="mb-6 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            {buttonText || "Button Page"}
          </h1>
          
          <p className="text-slate-600 text-lg">
            This page was accessed by clicking the "{buttonText}" button in the chatbot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;
