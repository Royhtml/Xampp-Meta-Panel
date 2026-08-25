import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Database, Bot, Play, Square, Loader2, Zap } from 'lucide-react'

export function InteractiveControlPanel() {
  // states: 'idle', 'starting', 'running'
  const [services, setServices] = useState({
    apache: 'idle',
    mysql: 'idle',
    ai: 'idle',
  });

  const toggleService = (key) => {
    if (services[key] === 'idle') {
      setServices(prev => ({ ...prev, [key]: 'starting' }));
      setTimeout(() => {
        setServices(prev => ({ ...prev, [key]: 'running' }));
      }, 2000);
    } else if (services[key] === 'running') {
      setServices(prev => ({ ...prev, [key]: 'idle' }));
    }
  };

  const getStatusColor = (status) => {
    if (status === 'running') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    if (status === 'starting') return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
    return 'text-gray-400 bg-gray-800/50 border-gray-700';
  };

  const renderServiceRow = (key, name, icon, port) => {
    const status = services[key];
    
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-xl mb-3 hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className={`p-3 rounded-lg flex items-center justify-center ${getStatusColor(status)}`}>
            {icon}
          </div>
          <div>
            <h4 className="text-white font-bold">{name}</h4>
            <p className="text-gray-500 text-sm font-mono">Port: {port}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium w-20">
            {status === 'running' && <span className="text-emerald-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span> Running</span>}
            {status === 'starting' && <span className="text-amber-400 flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Starting</span>}
            {status === 'idle' && <span className="text-gray-500">Idle</span>}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleService(key)}
            className={`relative overflow-hidden flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
              status === 'running' 
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
            }`}
          >
            {status === 'idle' && (
              <>
                {/* Subtle pulse animation when idle */}
                <motion.div
                  className="absolute inset-0 bg-blue-400/20 rounded-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <Play size={16} className="fill-current" /> Start
              </>
            )}
            {status === 'starting' && (
              <>
                <Loader2 size={16} className="animate-spin" /> Starting...
              </>
            )}
            {status === 'running' && (
              <>
                <Square size={16} className="fill-current" /> Stop
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <div className="card-dark p-6 mt-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Zap className="text-amber-400 fill-amber-400/20" size={24} />
        <h3 className="text-xl font-bold text-white">Live Interactive Engine</h3>
      </div>
      
      <div className="relative z-10">
        {renderServiceRow('apache', 'Apache Web Server', <Server size={24} />, '80, 443')}
        {renderServiceRow('mysql', 'MySQL Database', <Database size={24} />, '3306')}
        {renderServiceRow('ai', 'Local LLM Engine (.gguf)', <Bot size={24} />, '8088')}
      </div>
    </div>
  )
}
