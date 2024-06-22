import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#19461A', '#FF474C'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SupplierChart1 = ({ paidPercentage, pendingPercentage }) => {
  const data = [
    { name: 'Paid', value: 500 },
    { name: 'Pending', value:800},
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <div style={{ width: 400 }}>
        <h2 className="text-center">Monthly Payment Summary</h2>

        <div className="flex justify-center">
          <div className="w-10 h-5 mr-2 shadow bg-[#19461A]"></div>
          <p className="mr-4">Paid</p>
          <div className="w-10 h-5 mr-2 shadow bg-[#FF474C]"></div>
          <p className="ml-1">Pending</p>
        </div>

        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={160} // Increase outerRadius for a larger chart
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SupplierChart1;
