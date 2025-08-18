import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Overview = () => {
  // Demo Data (তুমি চাইলে backend থেকে আনতে পারো)
  const userStats = [
    { role: "Members", count: 120 },
    { role: "Trainers", count: 15 },
    { role: "Admins", count: 2 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 400 },
    { month: "Feb", revenue: 700 },
    { month: "Mar", revenue: 1200 },
    { month: "Apr", revenue: 900 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-600">Admin Overview</h2>

      {/* User Distribution Pie Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={userStats} dataKey="count" nameKey="role" cx="50%" cy="50%" outerRadius={100}>
              {userStats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Bar Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
