
import React from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  return (
    <header className="bg-white px-4 py-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-9 w-9 bg-purple-700 rounded-md flex items-center justify-center">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="ml-2 text-xl font-bold text-slate-800">ProcUrPal</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuItem className="cursor-pointer">
                <div>
                  <p className="font-medium">New approval request</p>
                  <p className="text-sm text-slate-500">Office supplies for marketing team</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div>
                  <p className="font-medium">Order status update</p>
                  <p className="text-sm text-slate-500">Laptop order #4392 - Shipped</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div>
                  <p className="font-medium">Price alert</p>
                  <p className="text-sm text-slate-500">Price drop on monitors from Dell</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2">
            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden md:block pr-2">
              <div className="text-sm font-medium">BrightVision</div>
              <div className="text-xs text-gray-500">nikmath@procurpal.in</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
