
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, MapPin, Truck, ChevronRight } from 'lucide-react';
import { MOCK_SHIPMENTS } from '../constants';
import { ShipmentStatus } from '../types';

const ShipmentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = MOCK_SHIPMENTS.filter(s => 
    s.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by ID, Origin or Destination..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} /> Filters
          </button>
          <button className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            + New Shipment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tracking ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Route</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cargo & Driver</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ETA</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-900 block">{shipment.trackingId}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vehicle: {shipment.vehicleId}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700">{shipment.origin}</span>
                        <ChevronRight size={12} className="text-slate-300 self-center my-0.5 rotate-90 md:rotate-0" />
                        <span className="text-sm font-semibold text-slate-700">{shipment.destination}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <Truck size={18} className="text-slate-500" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-800 block">{shipment.cargoType}</span>
                        <span className="text-xs text-slate-500 font-medium">{shipment.driver}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      shipment.status === ShipmentStatus.IN_TRANSIT ? 'bg-blue-50 text-blue-600' :
                      shipment.status === ShipmentStatus.DELIVERED ? 'bg-emerald-50 text-emerald-600' :
                      shipment.status === ShipmentStatus.DELAYED ? 'bg-rose-50 text-rose-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        shipment.status === ShipmentStatus.IN_TRANSIT ? 'bg-blue-600' :
                        shipment.status === ShipmentStatus.DELIVERED ? 'bg-emerald-600' :
                        shipment.status === ShipmentStatus.DELAYED ? 'bg-rose-600' :
                        'bg-slate-600'
                      }`}></div>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-slate-700 block">{shipment.eta.split(' ')[0]}</span>
                    <span className="text-xs text-slate-400 font-medium">{shipment.eta.split(' ')[1]}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-200 shadow-sm opacity-0 group-hover:opacity-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipmentList;
