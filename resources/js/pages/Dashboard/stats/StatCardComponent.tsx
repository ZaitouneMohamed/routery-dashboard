import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  subtitle,
  count,
  change,
  status,
  icon: Icon,
  color,
  isLarge = false
}) => {
  // Debug: Check if Icon is properly passed
  console.log('StatCard props:', { title, Icon, color });

  // Safety check for Icon component
  if (!Icon) {
    console.error('Icon component is undefined for:', title);
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6">
        <p className="text-red-600">Error: Icon missing for {title}</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className={`p-2 sm:p-3 rounded-xl ${color} shadow-lg flex-shrink-0`}>
              <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
              <p className="text-xs text-gray-500 truncate">{subtitle}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
              {/* Handle both string and number counts */}
              {typeof count === 'string' ? count : (
                typeof count === 'number' && count > 1000 ? count.toLocaleString() : count
              )}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {status === 'up' ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                  <TrendingUp className="w-3 h-3 text-green-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-green-600">+{change}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded-full">
                  <TrendingDown className="w-3 h-3 text-red-600 flex-shrink-0" />
                  <span className="text-xs font-medium text-red-600">-{change}</span>
                </div>
              )}
              <span className="text-xs text-gray-500 hidden sm:inline">vs mois dernier</span>
              <span className="text-xs text-gray-500 sm:hidden">vs dernier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
