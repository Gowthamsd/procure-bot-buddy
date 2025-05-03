
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartBarStacked, ChartBar, ChartPie, ChartLine, Users, DollarSign } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ProcurementDashboard = () => {
  // Data for the event status chart
  const eventStatusData = [
    { name: "RFP", completed: 11, inProgress: 7, pending: 5 },
    { name: "RFQ", completed: 4, inProgress: 5, pending: 2 },
    { name: "RFI", completed: 6, inProgress: 8, pending: 2 },
  ];

  // Data for the budget allocation pie chart
  const budgetData = [
    { name: "IT Equipment", value: 2.2, color: "#8B5CF6" },
    { name: "Office Supplies", value: 1.4, color: "#EC4899" },
    { name: "Services", value: 1.1, color: "#14B8A6" },
    { name: "Manufacturing", value: 0.9, color: "#F59E0B" },
  ];

  // Extended data for the savings trend chart
  const savingsData = [
    { month: "Jan", savings: 0.1, budget: 0.5 },
    { month: "Feb", savings: 0.3, budget: 0.8 },
    { month: "Mar", savings: 0.4, budget: 1.0 },
    { month: "Apr", savings: 0.7, budget: 1.2 },
    { month: "May", savings: 1.0, budget: 1.5 },
    { month: "Jun", savings: 1.2, budget: 1.7 },
    { month: "Jul", savings: 1.5, budget: 1.8 },
    { month: "Aug", savings: 1.7, budget: 2.0 },
  ];

  // Event trend data for tooltips
  const eventsData = [
    { month: "Jan", events: 12 },
    { month: "Feb", events: 15 },
    { month: "Mar", events: 18 },
    { month: "Apr", events: 22 },
    { month: "May", events: 50 },
  ];

  // Suppliers trend data for tooltips
  const suppliersData = [
    { month: "Jan", suppliers: 4 },
    { month: "Feb", suppliers: 6 },
    { month: "Mar", suppliers: 8 },
    { month: "Apr", suppliers: 10 },
    { month: "May", suppliers: 11 },
  ];

  // Budget trend data for tooltips
  const budgetTrendData = [
    { month: "Jan", budget: 1.2 },
    { month: "Feb", budget: 2.1 },
    { month: "Mar", budget: 3.4 },
    { month: "Apr", budget: 4.2 },
    { month: "May", budget: 5.6 },
  ];

  // Spend trend data for tooltips
  const spendData = [
    { month: "Jan", spend: 0.4 },
    { month: "Feb", spend: 0.7 },
    { month: "Mar", spend: 1.2 },
    { month: "Apr", spend: 1.8 },
    { month: "May", spend: 2.2 },
  ];

  // Config for the charts
  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#8B5CF6",
    },
    inProgress: {
      label: "In Progress",
      color: "#60A5FA",
    },
    pending: {
      label: "Pending",
      color: "#E5E7EB",
    },
    IT: {
      label: "IT Equipment",
      color: "#8B5CF6",
    },
    Office: {
      label: "Office Supplies",
      color: "#EC4899",
    },
    Services: {
      label: "Services",
      color: "#14B8A6",
    },
    Manufacturing: {
      label: "Manufacturing",
      color: "#F59E0B",
    },
    savings: {
      label: "Savings (CR)",
      color: "#8B5CF6",
    },
    budget: {
      label: "Budget Allocation (CR)",
      color: "#60A5FA",
    },
  };

  // Generate mini line chart for tooltips
  const generateMiniChart = (data: any[], dataKey: string, color: string) => (
    <LineChart width={200} height={100} data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
      <YAxis tick={{ fontSize: 10 }} />
      <Tooltip />
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={color} 
        strokeWidth={2}
        dot={{ r: 2 }}
        activeDot={{ r: 4 }}
      />
    </LineChart>
  );

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
      
      {/* Key Metrics Cards with Icons and Tooltips */}
      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UITooltip>
            <TooltipTrigger asChild>
              <Card className="border border-l-4 border-l-blue-500 cursor-help transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total No. of Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-4xl font-bold text-blue-500">50</div>
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="p-0 bg-white border-none shadow-xl w-[220px]">
              <div className="p-2">
                <h4 className="font-semibold mb-2">Events Trend</h4>
                {generateMiniChart(eventsData, "events", "#3B82F6")}
              </div>
            </TooltipContent>
          </UITooltip>
          
          <UITooltip>
            <TooltipTrigger asChild>
              <Card className="border border-l-4 border-l-blue-700 cursor-help transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Unique Supplier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-4xl font-bold text-blue-700">11</div>
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="p-0 bg-white border-none shadow-xl w-[220px]">
              <div className="p-2">
                <h4 className="font-semibold mb-2">Suppliers Growth</h4>
                {generateMiniChart(suppliersData, "suppliers", "#1D4ED8")}
              </div>
            </TooltipContent>
          </UITooltip>
          
          <UITooltip>
            <TooltipTrigger asChild>
              <Card className="border border-l-4 border-l-amber-600 cursor-help transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-4xl font-bold text-amber-600">₹5.6CR</div>
                    <div className="bg-amber-100 p-2 rounded-full">
                      <DollarSign className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="p-0 bg-white border-none shadow-xl w-[220px]">
              <div className="p-2">
                <h4 className="font-semibold mb-2">Budget Growth</h4>
                {generateMiniChart(budgetTrendData, "budget", "#D97706")}
              </div>
            </TooltipContent>
          </UITooltip>
          
          <UITooltip>
            <TooltipTrigger asChild>
              <Card className="border border-l-4 border-l-pink-500 cursor-help transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Spend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-4xl font-bold text-pink-500">₹2.2L</div>
                    <div className="bg-pink-100 p-2 rounded-full">
                      <DollarSign className="h-6 w-6 text-pink-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="p-0 bg-white border-none shadow-xl w-[220px]">
              <div className="p-2">
                <h4 className="font-semibold mb-2">Spend Trend</h4>
                {generateMiniChart(spendData, "spend", "#EC4899")}
              </div>
            </TooltipContent>
          </UITooltip>
        </div>
      </TooltipProvider>
      
      {/* Charts and Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Event Status</CardTitle>
              <ChartBar className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={chartConfig}>
                <BarChart data={eventStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar dataKey="completed" stackId="a" fill="#8B5CF6" />
                  <Bar dataKey="inProgress" stackId="a" fill="#60A5FA" />
                  <Bar dataKey="pending" stackId="a" fill="#E5E7EB" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Budget Allocation</CardTitle>
              <ChartPie className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={chartConfig}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({name, value}) => `${name}: ₹${value}CR`}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Savings Trend</CardTitle>
              <ChartLine className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64" config={chartConfig}>
                <LineChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#60A5FA"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
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
