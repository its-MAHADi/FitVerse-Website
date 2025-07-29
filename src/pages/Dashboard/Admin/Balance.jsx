import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseAuth from "../../../Hooks/UseAuth";

const Balance = () => {
  const {user} = UseAuth();
  const [transactions, setTransactions] = useState([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [paidMembers, setPaidMembers] = useState(0);

  const COLORS = ["#FF8042", "#00C49F"];

  useEffect(() => {
    const fetchData = async () => {
      const balanceRes = await axios.get("https://fit-verse-server-nine.vercel.app/admin/balance");
      setTransactions(balanceRes.data.lastSixTransactions || []);
      setTotalBalance(Number(balanceRes.data.totalBalance || 0));
      setPaidMembers(balanceRes.data.paidMembers || 0);

      const statsRes = await axios.get("https://fit-verse-server-nine.vercel.app/admin/stats");
      setNewsletterSubscribers(statsRes.data.newsletterSubscribers || 0);
    };
    fetchData();
  }, []);

  const chartValues = [
    { name: `Paid members: ${paidMembers}`, value: paidMembers },
    { name: `Newsletter subscribers: ${newsletterSubscribers}`, value: newsletterSubscribers },
  ];

  const packageBadge = (plan) => {
    if (!plan) return "bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm";
    if (plan.toLowerCase().includes("premium"))
      return "bg-green-100 text-green-700 border border-green-400 px-3 py-1 rounded-full font-semibold text-sm";
    if (plan.toLowerCase().includes("standard"))
      return "bg-blue-100 text-blue-700 border border-blue-400 px-3 py-1 rounded-full font-semibold text-sm";
    return "bg-black text-white border border-gray-700 px-3 py-1 rounded-full font-semibold text-sm";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">Oversee The Balance</h2>
        <p className="text-gray-500">Observer balance and latest transactions</p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
        <div className="text-center border rounded-lg p-6 shadow-md bg-white">
          <h3 className="text-xl font-semibold text-gray-800">Total Balance</h3>
          <p className="text-3xl font-bold text-blue-600 mt-3">
            ${Number(totalBalance || 0).toFixed(2)}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center justify-center gap-4">
          <PieChart width={250} height={250}>
            <Pie
              data={chartValues}
              cx={120}
              cy={120}
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartValues.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              Paid members: {paidMembers}
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Newsletter: {newsletterSubscribers}
            </div>
          </div>
        </div>
      </div>

      {/* Latest Transactions Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Trainer Name</th>
                <th className="p-3 border">User Name</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Package Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3 border">{tx.trainerName || "N/A"}</td>
                  <td className="p-3 border">{tx.userName || "N/A"}</td>
                  <td className="p-3 border">${Number(tx.price || 0).toFixed(2)}</td>
                  <td className="p-3 border">
                    <span className={packageBadge(tx.plan)}>{tx.plan || "N/A"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Balance;
