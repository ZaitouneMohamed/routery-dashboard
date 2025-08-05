// ChartOne.jsx
import React from 'react';
import {
  Truck, Users, FileText, Activity, AlertTriangle,
  CheckCircle, DollarSign, Fuel, Wrench, Shield,
  BarChart3, PieChart, Map, MoreVertical,
  ChevronRight, Circle
} from 'lucide-react';
import {
  PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';

// Enhanced mock data for components that don't have real data yet
const mockData = {
  truckStatus: [
    { name: 'En service', value: 89, color: '#10B981', percentage: 60.5 },
    { name: 'Maintenance', value: 34, color: '#F59E0B', percentage: 23.1 },
    { name: 'Réparation', value: 18, color: '#EF4444', percentage: 12.2 },
    { name: 'Hors service', value: 6, color: '#6B7280', percentage: 4.2 }
  ],

  fuelConsumption: [
    { month: 'Jan', consumption: 12500, cost: 42000, efficiency: 8.2 },
    { month: 'Fév', consumption: 11800, cost: 38500, efficiency: 8.5 },
    { month: 'Mar', consumption: 13200, cost: 45000, efficiency: 8.1 },
    { month: 'Avr', consumption: 14100, cost: 48500, efficiency: 7.9 },
    { month: 'Mai', consumption: 13800, cost: 46800, efficiency: 8.0 },
    { month: 'Jun', consumption: 12900, cost: 45680, efficiency: 8.3 }
  ],


  invoiceStatus: [
    { name: 'Payées', value: 1890, color: '#10B981' },
    { name: 'En attente', value: 456, color: '#F59E0B' },
    { name: 'En retard', value: 110, color: '#EF4444' }
  ],

};

const ChartOne = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Fleet Status */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-500" />
            État de la flotte
          </h3>
          <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPie>
              <Pie
                data={mockData.truckStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {mockData.truckStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} camions`, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
            </RechartsPie>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2 mt-4">
          {mockData.truckStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}} />
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{item.value}</span>
                <span className="text-gray-500">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Consumption */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-green-500" />
            Consommation carburant
          </h3>
          <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData.fuelConsumption}>
              <defs>
                <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-gray-600" />
              <YAxis axisLine={false} tickLine={false} className="text-gray-600" />
              <Tooltip
                formatter={(value, name) => [
                  name === 'consumption' ? `${value.toLocaleString()} L` : `${value.toLocaleString()} MAD`,
                  name === 'consumption' ? 'Consommation' : 'Coût'
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="#10B981"
                strokeWidth={3}
                fill="url(#fuelGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoice Status */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-500" />
            Statut factures
          </h3>
          <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
        </div>

        <div className="space-y-4">
          {mockData.invoiceStatus.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}} />
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: item.color,
                    width: `${(item.value / mockData.invoiceStatus.reduce((sum, i) => sum + i.value, 0)) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Montant total</span>
            <span className="text-lg font-bold text-gray-900">
              {mockData.invoiceStatus.reduce((sum, item) => sum + item.value, 0).toLocaleString()} MAD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
