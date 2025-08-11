import {
  Truck,
  Users,
  FileText,
  Activity,
  Fuel,
  Wrench
} from 'lucide-react';
import StatCard from './StatCardComponent';

const StatsCardsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <StatCard
        title="Trucks"
        subtitle={stats.totalTrucks.subtitle}
        count={stats.totalTrucks.count}
        change={stats.totalTrucks.change}
        status={stats.totalTrucks.status}
        icon={Truck}
        color="bg-blue-500"
      />
      <StatCard
        title="Trucks Actifs"
        subtitle={stats.activeTrucks.subtitle}
        count={stats.activeTrucks.count}
        change={stats.activeTrucks.change}
        status={stats.activeTrucks.status}
        icon={Activity}
        color="bg-green-500"
      />
      <StatCard
        title="Chauffeurs"
        subtitle={stats.activeDrivers.subtitle}
        count={stats.activeDrivers.count}
        change={stats.activeDrivers.change}
        status={stats.activeDrivers.status}
        icon={Users}
        color="bg-purple-500"
      />
      <StatCard
        title="Factures"
        subtitle={stats.totalInvoices.subtitle}
        count={stats.totalInvoices.count}
        change={stats.totalInvoices.change}
        status={stats.totalInvoices.status}
        icon={FileText}
        color="bg-indigo-500"
      />
      <StatCard
        title="Réparations"
        subtitle={stats.pendingRepairs.subtitle}
        count={stats.pendingRepairs.count}
        change={stats.pendingRepairs.change}
        status={stats.pendingRepairs.status}
        icon={Wrench}
        color="bg-orange-500"
      />
      <StatCard
        title="Carburant"
        subtitle={stats.fuelCost.subtitle}
        count={stats.fuelCost.count}
        change={stats.fuelCost.change}
        status={stats.fuelCost.status}
        icon={Fuel}
        color="bg-red-500"
      />
    </div>
  );
};

export default StatsCardsSection;
