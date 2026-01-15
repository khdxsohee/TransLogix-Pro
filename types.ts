
export enum ShipmentStatus {
  PENDING = 'Pending',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  DELAYED = 'Delayed',
  CANCELLED = 'Cancelled'
}

export interface Shipment {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  driver: string;
  vehicleId: string;
  weight: number;
  eta: string;
  cargoType: string;
}

export interface Vehicle {
  id: string;
  model: string;
  plate: string;
  status: 'Active' | 'Maintenance' | 'Idle';
  fuel: number;
  mileage: number;
  lastService: string;
}

export interface Driver {
  id: string;
  name: string;
  license: string;
  experience: number;
  rating: number;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  currentVehicle?: string;
}

export interface AnalyticsData {
  month: string;
  revenue: number;
  shipments: number;
  efficiency: number;
}
