import React from 'react';
import { motion } from 'framer-motion';
import { Server, Bot, Monitor, Smartphone, Cpu, ArrowRight, ArrowDown, FileCode, Package, Globe, ShieldCheck, Terminal, SmartphoneNfc, Activity } from 'lucide-react';

const FlowNode = ({ icon, title, desc, delay, activeColor, glowing }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, type: "spring", stiffness: 100, damping: 15 }}
    className="relative z-10 w-full min-w-[150px]"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={glowing ? { y: [0, -8, 0] } : {}}
      transition={glowing ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
      className={`flex flex-col items-center justify-center p-5 rounded-2xl border bg-gray-900/60 backdrop-blur-md shadow-lg w-full transition-colors duration-300 ${activeColor}`}
    >
      {glowing && (
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl blur-xl bg-current pointer-events-none" 
        />
      )}
      <div className="mb-3 p-3.5 rounded-xl bg-gray-800/80 border border-gray-700/50 text-current relative">
        {icon}
        {glowing && (
          <motion.div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-current rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      <h4 className="font-bold text-white text-sm md:text-base text-center leading-tight mb-1.5">{title}</h4>
      {desc && <p className="text-xs text-gray-400 text-center font-medium">{desc}</p>}
    </motion.div>
  </motion.div>
);

const Connector = ({ verticalOnly, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: delay + 0.2, duration: 0.5 }}
    className="flex items-center justify-center min-w-[40px] text-gray-600 relative overflow-hidden px-2 py-3"
  >
    {!verticalOnly && (
      <div className="hidden lg:flex items-center justify-center w-full relative">
        <div className="absolute w-full h-px bg-gray-700/50"></div>
        <motion.div
          animate={{ x: [-20, 20, -20], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
          className="relative z-10 bg-gray-950 px-1"
        >
          <ArrowRight size={24} className="text-blue-500/70" />
        </motion.div>
      </div>
    )}
    <div className="flex lg:hidden items-center justify-center h-full relative">
      <div className="absolute h-full w-px bg-gray-700/50"></div>
      <motion.div
        animate={{ y: [-10, 10, -10], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
        className="relative z-10 bg-gray-950 py-1"
      >
        <ArrowDown size={24} className="text-blue-500/70" />
      </motion.div>
    </div>
  </motion.div>
);

export function ArchitectureFlows() {
  return (
    <div className="space-y-8">
      
      {/* 1. AI API Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-dark p-6 md:p-8 lg:p-10 relative overflow-hidden group border border-blue-900/30 bg-gradient-to-br from-gray-950 to-blue-950/10"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" 
        />
        
        <div className="flex items-center gap-3 mb-8 relative z-20">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30"
          >
            <Bot className="text-blue-400 w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Unlimited Token API Flow</h3>
            <p className="text-sm text-blue-300/70 mt-1 font-medium">Dual-engine intelligent routing (Local & Cloud)</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-20">
          <FlowNode 
            delay={0.1}
            icon={<Terminal />}
            title="User Requests AI"
            desc="Code Completion"
            activeColor="border-gray-700 text-gray-300 hover:border-gray-500"
          />
          <Connector delay={0.1} />
          
          <div className="flex flex-col gap-4 w-full lg:w-auto relative">
            <div className="absolute left-[-1.5rem] lg:-left-6 top-1/2 -translate-y-1/2 w-4 lg:w-6 h-px bg-gray-700 hidden lg:block"></div>
            
            {/* Local Route */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col lg:flex-row items-center gap-3 p-4 rounded-2xl bg-gray-900/40 border border-emerald-900/30"
            >
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/50 px-2 py-1 rounded-md border border-emerald-900/50">Local API</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="hidden lg:block">
                <ArrowRight size={16} className="text-gray-600" />
              </motion.div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="block lg:hidden">
                <ArrowDown size={16} className="text-gray-600" />
              </motion.div>
              <FlowNode 
                delay={0.4}
                icon={<Server />}
                title="127.0.0.1:8088"
                desc="Local LLM Engine"
                activeColor="border-emerald-500/40 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                glowing
              />
            </motion.div>
            
            {/* Cloud Route */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col lg:flex-row items-center gap-3 p-4 rounded-2xl bg-gray-900/40 border border-blue-900/30"
            >
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest bg-blue-950/50 px-2 py-1 rounded-md border border-blue-900/50">Cloud API</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="hidden lg:block">
                <ArrowRight size={16} className="text-gray-600" />
              </motion.div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="block lg:hidden">
                <ArrowDown size={16} className="text-gray-600" />
              </motion.div>
              <FlowNode 
                delay={0.5}
                icon={<Globe />}
                title="Vercel Endpoint"
                desc="Cloud LLM Engine"
                activeColor="border-blue-500/40 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              />
            </motion.div>
          </div>
          
          <Connector delay={0.5} />
          <FlowNode 
            delay={0.7}
            icon={<FileCode />}
            title="JSON Response"
            desc="Injected to VS Code"
            activeColor="border-purple-500/40 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.1)]"
            glowing
          />
        </div>
      </motion.div>

      {/* 2. HTML to EXE Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-dark p-6 md:p-8 lg:p-10 relative overflow-hidden group border border-orange-900/30 bg-gradient-to-br from-gray-950 to-orange-950/10"
      >
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -right-48 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700" 
        />
        
        <div className="flex items-center gap-3 mb-8 relative z-20">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="p-2.5 rounded-xl bg-orange-500/20 border border-orange-500/30"
          >
            <Package className="text-orange-400 w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">HTML to EXE Native Compiler</h3>
            <p className="text-sm text-orange-300/70 mt-1 font-medium">Standalone executable generation pipeline</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between relative z-20">
          <FlowNode delay={0.1} icon={<FileCode />} title="Select index.html" desc="Source Files" activeColor="border-orange-500/30 text-orange-400" />
          <Connector delay={0.1} />
          <FlowNode delay={0.2} icon={<Cpu />} title="Packaging Engine" desc="Resource Bundling" activeColor="border-gray-700 text-gray-300 hover:border-gray-500" />
          <Connector delay={0.2} />
          <FlowNode delay={0.3} icon={<Globe />} title="Chromium Webview" desc="Rendering Core" activeColor="border-blue-500/30 text-blue-400" />
          <Connector delay={0.3} />
          <FlowNode delay={0.4} icon={<Monitor />} title="Target OS Native" desc="Win/Mac/Linux Executable" activeColor="border-emerald-500/50 text-emerald-400 bg-emerald-950/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]" glowing />
        </div>
      </motion.div>

      {/* 3. WhatsApp Bot Control Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-dark p-6 md:p-8 lg:p-10 relative overflow-hidden group border border-emerald-900/30 bg-gradient-to-br from-gray-950 to-emerald-950/10"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" 
        />
        
        <div className="flex items-center gap-3 mb-8 relative z-20">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30"
          >
            <SmartphoneNfc className="text-emerald-400 w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">WhatsApp Bot Automation</h3>
            <p className="text-sm text-emerald-300/70 mt-1 font-medium">Remote server management via headless Puppeteer</p>
          </div>
        </div>
        
        <div className="flex flex-col relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-8">
            <FlowNode delay={0.1} icon={<Bot />} title="Puppeteer Init" desc="Headless Browser" activeColor="border-emerald-500/40 text-emerald-400" />
            <Connector delay={0.1} />
            
            {/* Split Logic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center bg-gray-900/50 p-4 rounded-2xl border border-gray-800 w-full lg:w-auto my-4 lg:my-0"
            >
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 flex items-center gap-2">
                <Activity size={12} className="text-emerald-500" /> Session Exists?
              </span>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-emerald-950/40 border border-emerald-900/50 px-4 py-2.5 rounded-xl text-center flex-1 cursor-default">
                  <span className="text-emerald-400 text-sm font-bold block">YES</span>
                  <span className="text-emerald-500/70 text-xs">Auto Restore</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="bg-amber-950/40 border border-amber-900/50 px-4 py-2.5 rounded-xl text-center flex-1 cursor-default">
                  <span className="text-amber-400 text-sm font-bold block">NO</span>
                  <span className="text-amber-500/70 text-xs">Scan QR Code</span>
                </motion.div>
              </div>
            </motion.div>
            
            <Connector delay={0.3} />
            <FlowNode delay={0.5} icon={<ShieldCheck />} title="Authenticated" desc="Ready to receive" activeColor="border-blue-500/40 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" glowing />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-800 border-dashed"></div>
            </div>
            <div className="relative flex justify-center">
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gray-950 px-4 text-xs font-medium text-gray-500 uppercase tracking-widest"
              >
                Incoming Command Pipeline
              </motion.span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between mt-8">
            <FlowNode delay={0.6} icon={<Smartphone />} title="Receive Message" desc="'!start apache'" activeColor="border-gray-700 text-gray-300" />
            <Connector delay={0.6} />
            <FlowNode delay={0.7} icon={<Terminal />} title="Parse Command" desc="runXamppCommand()" activeColor="border-purple-500/30 text-purple-400" />
            <Connector delay={0.7} />
            <FlowNode delay={0.8} icon={<Server />} title="Action Executed" desc="Reply sent via WA" activeColor="border-emerald-500/50 text-emerald-400 bg-emerald-950/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]" glowing />
          </div>
        </div>
      </motion.div>
      
    </div>
  );
}
