
import React from "react";
import { ShoppingCart, Bell, Settings, User } from "lucide-react";
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
    <header className="bg-white border-b px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-slate-800">ProcureBuddy</span>
          </div>
          <nav className="hidden md:flex ml-10">
            <Button variant="link" className="text-slate-600 hover:text-slate-900">Dashboard</Button>
            <Button variant="link" className="text-slate-600 hover:text-slate-900">Catalog</Button>
            <Button variant="link" className="text-slate-600 hover:text-slate-900">Orders</Button>
            <Button variant="link" className="text-slate-600 hover:text-slate-900">Vendors</Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
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
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
