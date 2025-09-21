
"use client";

import Image from "next/image";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let data = [
  { name: 'March', income: 5000, expense: 2000 },
  { name: 'January', income: 4000, expense: 2400 },
  { name: 'December', income: 8000, expense: 5200 },
  { name: 'July', income: 6500, expense: 4200 },
  { name: 'April', income: 4500, expense: 3200 },
  { name: 'June', income: 5500, expense: 2800 },
  { name: 'October', income: 7200, expense: 5000 },
  { name: 'August', income: 7000, expense: 3900 },
  { name: 'May', income: 6000, expense: 4000 },
  { name: 'February', income: 3000, expense: 1398 },
  { name: 'September', income: 4800, expense: 3000 },
  { name: 'November', income: 6900, expense: 4300 },
];

// Sort months in proper order
data.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));

const FinaceCharts = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 450 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#C3EBFA"
              strokeWidth={5}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#CFCEFF"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinaceCharts;
