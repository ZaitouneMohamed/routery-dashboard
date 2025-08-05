import { Activity, AlertTriangle, CheckCircle, ChevronRight, Circle, Map, Truck, Users, Wrench } from "lucide-react";

// Activity Item Component
const ActivityItem = ({ activity }) => (
  <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
      <activity.icon className="w-4 h-4 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 leading-tight">{activity.message}</p>
      <p className="text-xs text-gray-500 mt-1">Il y a {activity.time}</p>
    </div>
  </div>
);

// Notification Item Component
const NotificationItem = ({ notification }) => {
  const priorityConfig = {
    high: { color: 'bg-red-50 border-red-200', dot: 'bg-red-500', text: 'text-red-700' },
    medium: { color: 'bg-yellow-50 border-yellow-200', dot: 'bg-yellow-500', text: 'text-yellow-700' },
    low: { color: 'bg-green-50 border-green-200', dot: 'bg-green-500', text: 'text-green-700' }
  };

  const config = priorityConfig[notification.priority];

  return (
    <div className={`p-4 rounded-xl border ${config.color} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full ${config.dot} mt-2 flex-shrink-0`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.text}`}>{notification.message}</p>
          <div className="flex items-center gap-2 mt-1">
            {notification.truck && (
              <span className="text-xs bg-white px-2 py-1 rounded-full font-medium">
                {notification.truck}
              </span>
            )}
            {notification.driver && (
              <span className="text-xs bg-white px-2 py-1 rounded-full font-medium">
                {notification.driver}
              </span>
            )}
            <span className="text-xs text-gray-600">{notification.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fleet Status Item Component
const FleetStatusItem = ({ item }) => {
  const statusConfig = {
    en_route: { color: 'bg-blue-500', label: 'En route', ring: 'ring-blue-200' },
    loading: { color: 'bg-yellow-500', label: 'Chargement', ring: 'ring-yellow-200' },
    delivered: { color: 'bg-green-500', label: 'Livré', ring: 'ring-green-200' },
    maintenance: { color: 'bg-red-500', label: 'Maintenance', ring: 'ring-red-200' }
  };

  const config = statusConfig[item.status];

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`w-3 h-3 rounded-full ${config.color} ring-4 ${config.ring} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{item.truck}</span>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{config.label}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{item.driver}</p>
        <p className="text-xs text-gray-500 mt-1">{item.location}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">{item.eta}</div>
        <div className="text-xs text-gray-500">ETA</div>
      </div>
    </div>
  );
};

const RecentActivityies = () => {
    // Enhanced mock data for components that don't have real data yet
const mockData = {
  recentActivity: [
    { id: 1, type: 'truck_assigned', message: 'Camion MAN-4521 assigné à Ahmed Benali', time: '2h', icon: Truck, color: 'bg-blue-500' },
    { id: 2, type: 'maintenance', message: 'Maintenance programmée pour VOL-7834', time: '4h', icon: Wrench, color: 'bg-orange-500' },
    { id: 3, type: 'driver_added', message: 'Nouveau chauffeur: Fatima Zahra', time: '6h', icon: Users, color: 'bg-green-500' },
    { id: 4, type: 'invoice_paid', message: 'Facture #INV-2024-0892 payée', time: '8h', icon: CheckCircle, color: 'bg-green-500' },
    { id: 5, type: 'alert', message: 'Assurance SCN-2156 expire dans 7 jours', time: '12h', icon: AlertTriangle, color: 'bg-red-500' }
  ],

  urgentNotifications: [
    { id: 1, type: 'insurance', message: 'Assurance expire dans 3 jours', truck: 'MAN-4521', priority: 'high', dueDate: '2025-06-19' },
    { id: 2, type: 'control', message: 'Contrôle technique requis', truck: 'VOL-7834', priority: 'medium', dueDate: '2025-06-25' },
    { id: 3, type: 'license', message: 'Permis chauffeur à renouveler', driver: 'Omar Idrissi', priority: 'high', dueDate: '2025-06-20' },
    { id: 4, type: 'maintenance', message: 'Maintenance préventive', truck: 'SCN-2156', priority: 'low', dueDate: '2025-06-30' }
  ],

  liveFleetStatus: [
    { id: 'TR001', truck: 'MAN-4521', driver: 'Ahmed Benali', status: 'en_route', location: 'Casablanca → Rabat', progress: 65, eta: '45min' },
    { id: 'TR002', truck: 'VOL-7834', driver: 'Fatima Zahra', status: 'loading', location: 'Marrakech', progress: 20, eta: '2h30min' },
    { id: 'TR003', truck: 'SCN-2156', driver: 'Omar Idrissi', status: 'delivered', location: 'Fès', progress: 100, eta: 'Terminé' },
    { id: 'TR004', truck: 'REN-9876', driver: 'Aicha Mansouri', status: 'maintenance', location: 'Garage Tanger', progress: 0, eta: 'N/A' }
  ]
};

    return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Activité récente
                </h3>
              </div>
              <div className="p-4 space-y-1 max-h-80 overflow-y-auto">
                {mockData.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Urgent Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Notifications urgentes
                  </h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    {mockData.urgentNotifications.length}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {mockData.urgentNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>

            {/* Live Fleet Status */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Map className="w-5 h-5 text-green-500" />
                    Flotte en temps réel
                  </h3>
                  <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                    <span className="text-xs font-medium text-green-700">Live</span>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {mockData.liveFleetStatus.map((item) => (
                  <FleetStatusItem key={item.id} item={item} />
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                  <Map className="w-4 h-4" />
                  Voir la carte complète
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
    )
};

export default RecentActivityies;
