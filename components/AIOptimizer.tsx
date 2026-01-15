
import React, { useState } from 'react';
import { Send, MapPin, Truck, HelpCircle, Loader2, Zap } from 'lucide-react';
import { optimizeRoute } from '../services/gemini';

const AIOptimizer: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cargo, setCargo] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) return;

    setLoading(true);
    setSuggestion(null);
    try {
      const result = await optimizeRoute(origin, destination, cargo || 'General Goods');
      setSuggestion(result);
    } catch (err) {
      console.error(err);
      setSuggestion("Unable to generate optimization. Please check your network or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Smart Route Optimizer</h2>
            <p className="text-slate-500">Leverage Gemini AI to find the most efficient route for your shipment</p>
          </div>
        </div>

        <form onSubmit={handleOptimize} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <MapPin size={12} /> Origin Point
            </label>
            <input 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Berlin, Germany"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <MapPin size={12} /> Destination Point
            </label>
            <input 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Madrid, Spain"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <Truck size={12} /> Cargo Type
            </label>
            <input 
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="e.g. Electronics, Frozen Food"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>
          <div className="md:col-span-3">
            <button 
              type="submit"
              disabled={loading || !origin || !destination}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
              Generate Optimization
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={20} className="text-indigo-600" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900">AI is Analyzing Routes</h3>
          <p className="text-slate-500 max-w-sm mt-2">Our model is calculating the best route based on current traffic patterns, fuel efficiency, and risk factors.</p>
        </div>
      )}

      {suggestion && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Zap size={20} className="text-indigo-600" /> Optimization Report
            </h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-bold bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">Export PDF</button>
              <button className="px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors">Apply Route</button>
            </div>
          </div>
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium bg-indigo-50/30 p-6 rounded-2xl border border-indigo-50">
              {suggestion}
            </div>
          </div>
          <div className="mt-8 flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <HelpCircle size={20} className="text-amber-500 mt-1 shrink-0" />
            <p className="text-sm text-amber-700 leading-relaxed font-medium">
              <strong className="block text-amber-800 mb-1">Disclaimer:</strong> 
              AI suggestions are based on historical and real-time models. Always consult local regulations and live traffic alerts for critical maneuvers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIOptimizer;
