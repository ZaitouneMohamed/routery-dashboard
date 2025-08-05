import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Gauge,
  User,
  Fuel,
  Wrench,
  ArrowLeft,
  Navigation,
  Clock,
  Activity,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Helper to generate a random path in Casablanca with at least 30 points
function generatePath(startLat: number, startLng: number, points: number = 32): { lat: number, lng: number, timestamp: number }[] {
  const path = [];
  let lat = startLat;
  let lng = startLng;
  let now = Date.now() - points * 60 * 1000; // simulate timestamps, 1 min apart
  for (let i = 0; i < points; i++) {
    lat += (Math.random() - 0.5) * 0.008;
    lng += (Math.random() - 0.5) * 0.008;
    path.push({ lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)), timestamp: now });
    now += 60 * 1000;
  }
  return path;
}

// 5 trucks, each with a path of 32 points in Casablanca
const trucksData = [
  {
    id: 1,
    name: 'Truck 001',
    mark: 'Volvo FH16',
    driver: 'John Doe',
    speed: 72,
    fuel: 60,
    status: 'Active',
    lastUpdate: '2024-06-01 14:23',
    issues: [],
    path: generatePath(33.5731, -7.5898, 32),
  },
  {
    id: 2,
    name: 'Truck 002',
    mark: 'Mercedes Actros',
    driver: 'Jane Smith',
    speed: 65,
    fuel: 45,
    status: 'Active',
    lastUpdate: '2024-06-01 14:20',
    issues: ['Low fuel'],
    path: generatePath(33.575, -7.58, 32),
  },
  {
    id: 3,
    name: 'Truck 003',
    mark: 'Scania R500',
    driver: 'Ali Ben',
    speed: 55,
    fuel: 80,
    status: 'Stopped',
    lastUpdate: '2024-06-01 14:18',
    issues: [],
    path: generatePath(33.57, -7.60, 32),
  },
  {
    id: 4,
    name: 'Truck 004',
    mark: 'MAN TGX',
    driver: 'Sara El',
    speed: 78,
    fuel: 70,
    status: 'Active',
    lastUpdate: '2024-06-01 14:25',
    issues: [],
    path: generatePath(33.58, -7.59, 32),
  },
  {
    id: 5,
    name: 'Truck 005',
    mark: 'DAF XF',
    driver: 'Omar Aziz',
    speed: 62,
    fuel: 55,
    status: 'Active',
    lastUpdate: '2024-06-01 14:27',
    issues: [],
    path: generatePath(33.572, -7.595, 32),
  },
];

// Custom icon for trucks
const createTruckIcon = (status: string, isSelected: boolean) => {
  const color = isSelected ? 'bg-blue-600' : status === 'Active' ? 'bg-green-600' : 'bg-red-600';
  const border = isSelected ? 'border-4 border-blue-400' : 'border-2 border-white';
  return L.divIcon({
    html: `<div class="${color} ${border} rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-200">
        <svg fill="white" width="16" height="16" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,12H26V7a1,1,0,0,0-1-1H3A1,1,0,0,0,2,7V25a1,1,0,0,0,1,1H4V8H24V19.7a6.45,6.45,0,0,1,1.56-.2c.15,0,.29,0,.44,0V14h4a2,2,0,0,1,2,2v1H28v2h4v5H29.6a4.54,4.54,0,0,0-8.34,0H14.43a4.5,4.5,0,0,0-4.17-2.76A4.38,4.38,0,1,0,14.72,26H21a4.49,4.49,0,0,0,8.92,0H33a1,1,0,0,0,1-1V16A4,4,0,0,0,30,12ZM10.26,28a2.38,2.38,0,1,1,0-4.75,2.38,2.38,0,1,1,0,4.75Zm15.17,0a2.38,2.38,0,1,1,2.5-2.37A2.44,2.44,0,0,1,25.43,28Z"/>
        </svg>
      </div>`,
    className: 'custom-truck-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function TruckMapPage() {
  // For each truck, track the current index in its path
  const [positions, setPositions] = useState(trucksData.map(() => 0));
  const [selectedTruckId, setSelectedTruckId] = useState(trucksData[0].id);
  const [hoveredTruckId, setHoveredTruckId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<[number, number]>([0, 31]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Move to next point every second
  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = window.setInterval(() => {
      setPositions((prev) =>
        prev.map((idx) => {
          const nextIdx = (idx + 1) % 32;
          if (nextIdx < dateRange[0] || nextIdx > dateRange[1]) return dateRange[0];
          return nextIdx;
        })
      );
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dateRange, isPlaying]);

  // Trucks for map (all trucks)
  const trucks = trucksData.map((truck, i) => {
    const posIdx = positions[i];
    const pathIdx = Math.max(dateRange[0], Math.min(posIdx, dateRange[1]));
    return {
      ...truck,
      lat: truck.path[pathIdx].lat,
      lng: truck.path[pathIdx].lng,
      pathIdx,
    };
  });

  const selectedTruck = trucksData.find((t) => t.id === selectedTruckId) || trucksData[0];
  const selectedIdx = trucksData.findIndex((t) => t.id === selectedTruckId);
  const selectedCurrentIdx = positions[selectedIdx];
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  // Draggable and resizable state
  const [cardPos, setCardPos] = useState({ x: 24, y: 24 });
  const [cardSize, setCardSize] = useState({ width: 350, height: undefined });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ width: 350, height: 0, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const goToDashboard = () => {
    console.log('Navigating to dashboard...');
    // In a real app, this would use React Router or Next.js router
    alert('Would navigate to dashboard');
  };

  const resetToDefault = () => {
    setPositions(trucksData.map(() => 0));
    setDateRange([0, 31]);
    setIsPlaying(true);
  };

  // Drag handlers
  const onDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - cardPos.x,
      y: e.clientY - cardPos.y,
    };
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setCardPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const onUp = () => {
      setDragging(false);
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  // Resize handlers
  const onResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing(true);
    resizeStart.current = {
      width: cardSize.width,
      height: cardRef.current?.offsetHeight || 0,
      x: e.clientX,
      y: e.clientY,
    };
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const newWidth = Math.max(280, resizeStart.current.width + (e.clientX - resizeStart.current.x));
      setCardSize({ width: newWidth, height: undefined });
    };
    const onUp = () => {
      setResizing(false);
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [resizing]);

  const activeTrucks = trucksData.filter(t => t.status === 'Active').length;
  const stoppedTrucks = trucksData.filter(t => t.status === 'Stopped').length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      {/* Demo Alert Banner */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Demo Mode Active</p>
              <p className="text-xs text-white/90">This is a static demonstration with simulated truck data and movements</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Live Preview</span>
            </div>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Header Bar */}
<div className={`fixed top-12 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 ${isHeaderCollapsed ? '-translate-y-full' : 'translate-y-0'}`}>
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-4">
      {/* Enhanced Back Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToDashboard}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 hover:text-blue-800 transition-all duration-200 border-blue-200 shadow-sm font-medium px-4 py-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Dashboard</span>
        <span className="sm:hidden">Dashboard</span>
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <Navigation className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Fleet Tracking</h1>
          <p className="text-xs text-gray-500">Real-time monitoring</p>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      {/* Fleet Status with enhanced styling */}
      <div className="flex items-center gap-4 text-sm bg-gray-50 px-4 py-2 rounded-lg border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700 font-medium">{activeTrucks} Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-700 font-medium">{stoppedTrucks} Stopped</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefault}
          className="flex items-center gap-2 hover:bg-orange-50 border-orange-200 text-orange-700 hover:text-orange-800"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
      </div>
    </div>
  </div>

  {/* Header Toggle Button */}
  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
      className="rounded-full bg-white/95 backdrop-blur-md hover:bg-gray-50 border-gray-200 shadow-lg transition-all duration-200 hover:shadow-xl p-2 h-8 w-8"
      title={isHeaderCollapsed ? 'Show Header' : 'Hide Header'}
    >
      {isHeaderCollapsed ? (
        <ChevronDown className="w-4 h-4 text-gray-600" />
      ) : (
        <ChevronUp className="w-4 h-4 text-gray-600" />
      )}
    </Button>
  </div>
</div>

{/* Floating Header Toggle (when header is collapsed) */}
{isHeaderCollapsed && (
  <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-30">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsHeaderCollapsed(false)}
      className="rounded-full bg-white/95 backdrop-blur-md hover:bg-gray-50 border-gray-200 shadow-lg transition-all duration-200 hover:shadow-xl p-2 h-10 w-10"
      title="Show Header"
    >
      <ChevronDown className="w-4 h-4 text-gray-600" />
    </Button>
  </div>
)}

      {/* Map Fullscreen as background */}
      <div className={`fixed inset-0 z-0 transition-all duration-300 ${isHeaderCollapsed ? 'pt-12' : 'pt-28'}`}>
        <MapContainer
          center={[selectedTruck.path[selectedCurrentIdx].lat, selectedTruck.path[selectedCurrentIdx].lng]}
          zoom={13}
          style={{ height: isHeaderCollapsed ? 'calc(100vh - 48px)' : 'calc(100vh - 112px)', width: '100vw' }}
          key={selectedTruckId}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {trucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.lat, truck.lng]}
              icon={createTruckIcon(truck.status, selectedTruckId === truck.id)}
              eventHandlers={{
                click: () => setSelectedTruckId(truck.id),
                mouseover: () => setHoveredTruckId(truck.id),
                mouseout: () => setHoveredTruckId((id) => (id === truck.id ? null : id)),
              }}
            >
              {(hoveredTruckId === truck.id || selectedTruckId === truck.id) && (
                <Popup closeButton={false} autoPan={false}>
                  <div className="p-3 min-w-52">
                    <h3 className="font-semibold text-lg text-blue-700 mb-1">{truck.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{truck.mark}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Driver:</span>
                        <p className="font-medium">{truck.driver}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Speed:</span>
                        <p className="font-medium">{truck.speed} km/h</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Fuel:</span>
                        <p className="font-medium">{truck.fuel}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <Badge
                          variant={truck.status === 'Active' ? 'default' : 'destructive'}
                          className="text-xs mt-1"
                        >
                          {truck.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Enhanced Truck Info Card */}
      <div
        ref={cardRef}
        className={cn(
          "fixed z-10 pointer-events-auto transition-all duration-300 ease-in-out",
          isMinimized ? "opacity-90" : "opacity-100"
        )}
        style={{
          top: cardPos.y + (isHeaderCollapsed ? 64 : 128), // Account for demo banner + header
          left: cardPos.x,
          width: cardSize.width,
          minWidth: 280,
          maxWidth: 500,
          cursor: dragging ? 'move' : 'default',
        }}
      >
        <Card className="rounded-2xl shadow-2xl border-2 border-blue-200/50 bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-xl">
          <CardHeader
            className="cursor-move pb-3"
            onMouseDown={onDragStart}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Fleet Monitor</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 hover:bg-blue-100"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
            </div>

            <Select value={String(selectedTruckId)} onValueChange={v => setSelectedTruckId(Number(v))}>
              <SelectTrigger className="w-full border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="Select Truck" />
              </SelectTrigger>
              <SelectContent>
                {trucksData.map(truck => (
                  <SelectItem key={truck.id} value={String(truck.id)}>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        truck.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      )}></div>
                      {truck.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center justify-between pt-2">
              <div>
                <CardTitle className="text-xl text-blue-800 font-bold">{selectedTruck.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600">{selectedTruck.mark}</CardDescription>
              </div>
              <Badge
                variant={selectedTruck.status === 'Active' ? 'default' : 'destructive'}
                className="text-sm px-3 py-1"
              >
                {selectedTruck.status}
              </Badge>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Driver</p>
                    <p className="font-semibold text-gray-800">{selectedTruck.driver}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50/50 rounded-lg">
                  <Gauge className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Speed</p>
                    <p className="font-semibold text-gray-800">{selectedTruck.speed} km/h</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-lg">
                  <Fuel className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">Fuel</p>
                    <p className="font-semibold text-gray-800">{selectedTruck.fuel}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500">Updated</p>
                    <p className="font-semibold text-gray-800 text-xs">{selectedTruck.lastUpdate}</p>
                  </div>
                </div>
              </div>

              {selectedTruck.issues.length > 0 && (
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Issues</span>
                  </div>
                  <p className="text-sm text-red-600">{selectedTruck.issues.join(', ')}</p>
                </div>
              )}

              <div className="p-3 bg-gray-50/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Current Location</span>
                </div>
                <p className="text-sm text-gray-600 font-mono">
                  {selectedTruck.path[selectedCurrentIdx].lat}, {selectedTruck.path[selectedCurrentIdx].lng}
                </p>
              </div>
            </CardContent>
          )}

          {/* Resize handle */}
          <div
            onMouseDown={onResizeStart}
            className="absolute bottom-2 right-2 w-5 h-5 bg-blue-200 hover:bg-blue-300 rounded cursor-se-resize flex items-center justify-center z-20 transition-colors"
            style={{ userSelect: 'none' }}
            title="Resize"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10L10 2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="10" cy="2" r="1" fill="#2563eb"/>
              <circle cx="2" cy="10" r="1" fill="#2563eb"/>
            </svg>
          </div>
        </Card>
      </div>
    </div>
  );
}
