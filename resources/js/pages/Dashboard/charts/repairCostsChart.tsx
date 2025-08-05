// RepairCostChart.jsx
import React from 'react';
import {
  BarChart3, MoreVertical
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Mock data for repair costs
const mockData = {
  repairCosts: [
    { month: 'Jan', planned: 15000, emergency: 8500, total: 23500 },
    { month: 'Fév', planned: 12000, emergency: 12000, total: 24000 },
    { month: 'Mar', planned: 18000, emergency: 6500, total: 24500 },
    { month: 'Avr', planned: 14500, emergency: 9800, total: 24300 },
    { month: 'Mai', planned: 16000, emergency: 7200, total: 23200 },
    { month: 'Jun', planned: 13500, emergency: 11200, total: 24700 }
  ]
};

const RepairCostChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-500" />
          Coûts de réparation
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Planifiées</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Urgences</span>
            </div>
          </div>
          <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData.repairCosts} barGap={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-gray-600" />
            <YAxis axisLine={false} tickLine={false} className="text-gray-600" />
            <Tooltip
              formatter={(value, name) => [
                `${value.toLocaleString()} MAD`,
                name === 'planned' ? 'Planifiées' : name === 'emergency' ? 'Urgences' : 'Total'
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="planned" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="emergency" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RepairCostChart;
