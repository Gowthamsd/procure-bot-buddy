
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProcurementDashboard = () => {
  return (
    <div className="mb-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-800">RFX Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <div className="border rounded-md px-4 py-2 flex items-center gap-2">
            <span>May 2025</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 justify-end">
        <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-md hover:bg-purple-50">
          View Intake Forms
        </button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2">
          Create New 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total No. of Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold text-blue-500">50</div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-l-4 border-l-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unique Supplier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold text-blue-700">11</div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-l-4 border-l-amber-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold text-amber-600">₹5.6CR</div>
              <div className="bg-pink-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Estimated Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold text-amber-500">₹1.0CR</div>
              <div className="bg-amber-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-l-4 border-l-pink-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold text-pink-500">₹2.2L</div>
              <div className="bg-pink-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total No. of Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-4xl font-bold text-blue-600">15</div>
              <div className="bg-blue-50 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Event Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-20 text-sm font-medium">RFP (23)</div>
                  <div className="flex gap-1 flex-1">
                    <div className="h-6 bg-pink-300 rounded text-xs flex items-center justify-center px-2 text-pink-800" style={{width: '20%'}}>11</div>
                    <div className="h-6 bg-blue-300 rounded text-xs flex items-center justify-center px-2 text-blue-800" style={{width: '10%'}}>7</div>
                    <div className="h-6 bg-purple-300 rounded text-xs flex items-center justify-center px-2 text-purple-800" style={{width: '30%'}}>19</div>
                    <div className="h-6 bg-gray-300 rounded text-xs flex items-center justify-center px-2 text-gray-800" style={{width: '5%'}}>0</div>
                    <div className="h-6 bg-gray-400 rounded text-xs flex items-center justify-center px-2 text-gray-800" style={{width: '5%'}}>0</div>
                    <div className="h-6 bg-teal-300 rounded text-xs flex items-center justify-center px-2 text-teal-800" style={{width: '5%'}}>2</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 text-sm font-medium">RFQ (11)</div>
                  <div className="flex gap-1 flex-1">
                    <div className="h-6 bg-pink-300 rounded text-xs flex items-center justify-center px-2 text-pink-800" style={{width: '10%'}}>4</div>
                    <div className="h-6 bg-blue-300 rounded text-xs flex items-center justify-center px-2 text-blue-800" style={{width: '10%'}}>5</div>
                    <div className="h-6 bg-purple-300 rounded text-xs flex items-center justify-center px-2 text-purple-800" style={{width: '15%'}}>9</div>
                    <div className="h-6 bg-gray-300 rounded text-xs flex items-center justify-center px-2 text-gray-800" style={{width: '5%'}}>0</div>
                    <div className="h-6 bg-gray-400 rounded text-xs flex items-center justify-center px-2 text-gray-800" style={{width: '5%'}}>0</div>
                    <div className="h-6 bg-teal-300 rounded text-xs flex items-center justify-center px-2 text-teal-800" style={{width: '5%'}}>0</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 text-sm font-medium">RFI (16)</div>
                  <div className="flex gap-1 flex-1">
                    <div className="h-6 bg-pink-300 rounded text-xs flex items-center justify-center px-2 text-pink-800" style={{width: '10%'}}>4</div>
                    <div className="h-6 bg-blue-300 rounded text-xs flex items-center justify-center px-2 text-blue-800" style={{width: '10%'}}>6</div>
                    <div className="h-6 bg-purple-300 rounded text-xs flex items-center justify-center px-2 text-purple-800" style={{width: '15%'}}>10</div>
                    <div className="h-6 bg-gray-300 rounded text-xs flex items-center justify-center px-2 text-gray-800" style={{width: '5%'}}>0</div>
                    <div className="h-6 bg-gray-400 rounded text-xs flex items-center justify-center px-2 text-gray-800" style={{width: '5%'}}>1</div>
                    <div className="h-6 bg-teal-300 rounded text-xs flex items-center justify-center px-2 text-teal-800" style={{width: '5%'}}>2</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Key Deadlines</CardTitle>
              <div className="border rounded flex items-center px-2 py-1 text-sm">
                <span>Category</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="font-medium">Critical</div>
                <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Complete intake form :</div>
                      <div className="text-sm font-semibold">INTAKEFORMFORM#3</div>
                      <div className="text-sm text-purple-600 mt-1">Evaluate Now</div>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Complete intake form :</div>
                      <div className="text-sm font-semibold">INTAKEFORMFORM#4</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
