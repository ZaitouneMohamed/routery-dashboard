import React, { useState } from 'react';
import {
  Truck, Users, FileText, Activity, AlertTriangle,
  CheckCircle, DollarSign, Fuel, Wrench, Shield,
  BarChart3, PieChart, Map, MoreVertical,
  ChevronRight, Circle
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import StatsCardsSection from './Dashboard/stats/StatComponent';
import ChartOne from './Dashboard/charts/chartOne';
import RepairCostChart from './Dashboard/charts/repairCostsChart';
import RecentActivityies from './Dashboard/ActivitiesSection/RecentActivities';

// Main Dashboard Component
export default function Dashboard({ stats }) {

  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-gray-50">
        <div className="p-6 space-y-3">

          {/* Stats Cards Section with Slider*/}
          <StatsCardsSection stats={stats} />

          {/* Quick Actions Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                <Truck className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-blue-700">Ajouter camion</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                <Users className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-green-700">Nouveau chauffeur</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group">
                <Wrench className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-orange-700">Programmer maintenance</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                <FileText className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-purple-700">Créer facture</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group">
                <Fuel className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-red-700">Gérer carburant</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors group">
                <Shield className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-indigo-700">Documents admin</span>
              </button>
            </div>
          </div>


            {/* Charts Section */}
            <ChartOne />

          {/* Repair Costs Chart */}
          <RepairCostChart />

          <RecentActivityies />




        </div>
      </div>
    </AppLayout>
  );
}
