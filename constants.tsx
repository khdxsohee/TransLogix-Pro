
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ShipmentStatus, Shipment, Vehicle, Driver, AnalyticsData } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'shipments', label: 'Shipments', icon: <Package size={20} /> },
  { id: 'fleet', label: 'Fleet Management', icon: <Truck size={20} /> },
  { id: 'drivers', label: 'Drivers', icon: <Users size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'optimizer', label: 'AI Optimizer', icon: <Clock size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  { id: '1', trackingId: 'TRX-9821', origin: 'Berlin, DE', destination: 'Paris, FR', status: ShipmentStatus.IN_TRANSIT, driver: 'Hans Müller', vehicleId: 'V-102', weight: 4500, eta: '2023-11-25 14:30', cargoType: 'Electronics' },
  { id: '2', trackingId: 'TRX-1120', origin: 'Madrid, ES', destination: 'Lisbon, PT', status: ShipmentStatus.DELIVERED, driver: 'Carlos Ruiz', vehicleId: 'V-405', weight: 2200, eta: '2023-11-24 09:00', cargoType: 'Perishables' },
  { id: '3', trackingId: 'TRX-5541', origin: 'London, UK', destination: 'Dublin, IE', status: ShipmentStatus.DELAYED, driver: 'James Bond', vehicleId: 'V-201', weight: 1200, eta: '2023-11-26 18:45', cargoType: 'Textiles' },
  { id: '4', trackingId: 'TRX-8892', origin: 'Rome, IT', destination: 'Vienna, AT', status: ShipmentStatus.PENDING, driver: 'Lucia Bianchi', vehicleId: 'V-303', weight: 3800, eta: '2023-11-27 11:00', cargoType: 'Automotive' },
];

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'V-102', model: 'Mercedes-Benz Actros', plate: 'B-TL 102', status: 'Active', fuel: 78, mileage: 45000, lastService: '2023-08-10' },
  { id: 'V-405', model: 'Volvo FH16', plate: 'M-RL 405', status: 'Active', fuel: 92, mileage: 12000, lastService: '2023-10-05' },
  { id: 'V-201', model: 'Scania R-Series', plate: 'L-ZX 201', status: 'Maintenance', fuel: 15, mileage: 88000, lastService: '2023-11-20' },
  { id: 'V-303', model: 'DAF XF', plate: 'R-TT 303', status: 'Idle', fuel: 55, mileage: 34000, lastService: '2023-09-15' },
];

export const ANALYTICS_DATA: AnalyticsData[] = [
  { month: 'Jun', revenue: 45000, shipments: 120, efficiency: 88 },
  { month: 'Jul', revenue: 52000, shipments: 145, efficiency: 91 },
  { month: 'Aug', revenue: 48000, shipments: 132, efficiency: 87 },
  { month: 'Sep', revenue: 61000, shipments: 168, efficiency: 93 },
  { month: 'Oct', revenue: 58000, shipments: 155, efficiency: 90 },
  { month: 'Nov', revenue: 72000, shipments: 190, efficiency: 95 },
];
