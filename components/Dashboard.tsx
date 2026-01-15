
import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { Truck, Package, Clock, AlertTriangle, TrendingUp, MoreHorizontal } from 'lucide-react';
import { ANALYTICS_DATA, MOCK_SHIPMENTS } from '../constants';
import { ShipmentStatus } from '../types';
import { getLogisticsSummary } from '../services/gemini';

const Dashboard: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>("Analyzing operational data...");
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const delays = MOCK_SHIPMENTS.filter(s => s.status === ShipmentStatus.DELAYED).length;
        const summary = await getLogisticsSummary(MOCK_SHIPMENTS.length, delays);
        setAiSummary(summary);
      } catch (err) {
        setAiSummary("System operations are currently stable with minor adjustments needed.");
      } finally {
        setLoadingAi(false);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { label: 'Total Shipments', value: '1,284', change: '+12.5%', icon: <Package className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Fleet Active', value: '42/48', change: '87.5%', icon: <Truck className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Avg. Delivery Time', value: '2.4 Days', change: '-4h', icon: <Clock className="text-amber-600" />, color: 'bg-amber-50' },
    { label: 'Critical Alerts', value: '3', change: '-2', icon: <AlertTriangle className="text-rose-600" />, color: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      {/* AI Summary Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10">
          <Truck size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-0.5 bg-indigo-500/50 rounded-md text-[10px] font-bold tracking-widest uppercase border border-indigo-400">
                AI Insight
              </div>
              <span className="text-indigo-200 text-xs font-medium">Updated just now</span>
            </div>
            <p className="text-xl font-medium leading-relaxed italic">
              "{loadingAi ? "Analyzing fleet metrics..." : aiSummary}"
            </p>
          </div>
          <button className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-xl border border-white/20 text-sm font-semibold backdrop-blur-sm self-start md:self-center">
            View Analytics
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') || stat.change.startsWith('-') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Performance</h3>
              <p className="text-sm text-slate-500">Monthly overview of logistics revenue</p>
            </div>
            <select className="text-xs font-bold border rounded-lg px-3 py-1.5 bg-slate-50 border-slate-200 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Column: Active Shipments List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Live Shipments</h3>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[22rem] pr-2">
            {MOCK_SHIPMENTS.map((shipment) => (
              <div key={shipment.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-600">{shipment.trackingId}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    shipment.status === ShipmentStatus.IN_TRANSIT ? 'bg-blue-100 text-blue-600' :
                    shipment.status === ShipmentStatus.DELIVERED ? 'bg-emerald-100 text-emerald-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {shipment.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-900">{shipment.origin}</span>
                  <TrendingUp size={14} className="text-slate-300" />
                  <span className="text-sm font-semibold text-slate-900">{shipment.destination}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                  <span>Driver: {shipment.driver}</span>
                  <span>ETA: {shipment.eta.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
            View All Shipments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
