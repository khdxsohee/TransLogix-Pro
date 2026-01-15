
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ShipmentList from './components/ShipmentList';
import AIOptimizer from './components/AIOptimizer';
import { Bell, Search, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'shipments':
        return <ShipmentList />;
      case 'optimizer':
        return <AIOptimizer />;
      case 'fleet':
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Fleet Management Module</h2>
            <p className="text-slate-500 max-w-md">This view is currently under development. Here you will be able to manage your entire vehicle inventory, track fuel usage, and schedule maintenance.</p>
          </div>
        );
      default:
        return (
          <div className="p-12 text-center">
            <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-2">Module Not Found</h2>
            <p className="text-slate-500">The requested section "{activeTab}" is currently unavailable.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight capitalize">
              {activeTab === 'optimizer' ? 'AI Route Intelligence' : activeTab}
            </h1>
            <p className="text-slate-500 font-medium">Manage your global logistics operations efficiently</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm w-72 group focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <Search className="text-slate-400 mr-3 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium"
              />
            </div>
            
            <button className="relative p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>

            <button className="flex items-center gap-3 p-1.5 pr-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-100 transition-all shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <User size={18} className="text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-slate-700 hidden lg:inline">Admin User</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
