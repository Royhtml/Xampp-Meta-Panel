import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bar, Line } from 'react-chartjs-2'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { ArchitectureFlows } from "./Architecture"
import { ChangelogTimeline } from "./Changelog"
import { AppGallery } from "./Gallery"

import { 
  Package, Puzzle, Github, Key, Terminal, Code, Settings, 
  Server, Database, Smartphone, ShieldAlert, Zap, Download, 
  Menu, X, CheckCircle2, AlertTriangle, Info, Globe, 
  Bot, Mic, Cpu, Monitor, FileCode, MonitorSmartphone, Command, RefreshCw, BarChart, GitCommit, ArrowRight
} from 'lucide-react'

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 font-sans selection:bg-blue-500/30 text-gray-300">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              XAMPP<span className="text-blue-400 font-normal">MetaPanel</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
              <a href="https://xampp-meta-panel-api-key.vercel.app/" target="_blank" rel="noreferrer" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                API Dashboard <ArrowRight size={16} />
              </a>

                <Key size={14}/> Get API Key
            </div>
          </div>

          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-gray-950/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white p-2">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-10 text-lg overflow-y-auto pb-20">
              <MobileNavLink href="#pengenalan" onClick={() => setMobileMenuOpen(false)} icon={<Terminal size={20}/>} text="Why Meta Panel?" />
              <MobileNavLink href="#fitur" onClick={() => setMobileMenuOpen(false)} icon={<Zap size={20}/>} text="What's New in V5" />
              <MobileNavLink href="#settings" onClick={() => setMobileMenuOpen(false)} icon={<Settings size={20}/>} text="Extension Settings" />
              <MobileNavLink href="#shortcuts" onClick={() => setMobileMenuOpen(false)} icon={<Command size={20}/>} text="Keyboard Shortcuts" />
              <MobileNavLink href="#whatsapp" onClick={() => setMobileMenuOpen(false)} icon={<Bot size={20}/>} text="WhatsApp Bot Commands" />
              <MobileNavLink href="#komparasi" onClick={() => setMobileMenuOpen(false)} icon={<RefreshCw size={20}/>} text="Platform Comparison" />
              <MobileNavLink href="#metrics" onClick={() => setMobileMenuOpen(false)} icon={<BarChart size={20}/>} text="Unique Capabilities" />
              <MobileNavLink href="#architecture" onClick={() => setMobileMenuOpen(false)} icon={<Globe size={20}/>} text="System Architecture" />
              <MobileNavLink href="#changelog" onClick={() => setMobileMenuOpen(false)} icon={<GitCommit size={20}/>} text="Version History" />
              <MobileNavLink href="#troubleshooting" onClick={() => setMobileMenuOpen(false)} icon={<AlertTriangle size={20}/>} text="Known Issues" />
              
              <div className="h-px bg-gray-800 my-4"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
          
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="flex flex-col lg:flex-row items-center gap-12 relative z-10"
          >
            <div className="flex-1 text-center lg:text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                <Zap size={14} className="fill-blue-500" /> Version 5+ Available
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white">
                The Ultimate All-in-One <br/>
                <span className="text-gradient">DevHub for VS Code</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Run Apache, MySQL, and PHP directly from VS Code. Manage XAMPP, run Local AI (.gguf), build Android APKs, compile Desktop Apps, automate WhatsApp, and build IoT firmware — all inside your editor!
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href="https://open-vsx.org/extension/Royhtml/xampp-manager" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-950 font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Puzzle size={20} /> Install on Open VSX
                </a>
                <a href="https://github.com/Royhtml/Xampp-Meta-Panel" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 border border-gray-800 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Github size={20} /> GitHub Repository
                </a>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="flex-1 w-full relative">

              <div className="card-dark p-2 lg:rotate-2 hover:rotate-0 transition-transform duration-500 relative z-10">
                <img src="https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/metapanel.png?raw=true" alt="Meta Panel Interface" className="w-full rounded-xl border border-gray-800 shadow-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* App Showcase Gallery */}
        <AppGallery />

        {/* Spotlight Section */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-7xl mx-auto px-6 mb-28" id="spotlight">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <Zap size={14} className="fill-blue-500" /> Meta Panel Exclusives
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Spotlight Features</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">Discover the exclusive tools that make Meta Panel the most advanced local development environment.</motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="card-dark p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors"></div>
              <Bot className="w-12 h-12 text-blue-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Integrated AI Chatbot</h3>
              <p className="text-gray-400 leading-relaxed relative z-10 text-lg">
                Run local LLMs (.gguf) completely offline. Features unlimited tokens, real-time code completion, and a dedicated AI API endpoint running locally on port 8088. No cloud subscriptions required.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="card-dark p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors"></div>
              <Cpu className="w-12 h-12 text-emerald-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">IoT & Firmware Management</h3>
              <p className="text-gray-400 leading-relaxed relative z-10 text-lg">
                Build, compile, and flash IoT firmware using native PlatformIO and Wokwi integration. Manage ESP32, Arduino, and embedded systems directly from your VS Code command palette.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Live System Monitor */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-7xl mx-auto px-6 mb-32" id="monitor">
          <div className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Real-Time Performance</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 max-w-2xl mx-auto text-lg">Monitor your local server's CPU, RAM, and Disk I/O usage directly from the integrated dashboard.</motion.p>
          </div>
          <motion.div variants={fadeUp}>
            <SystemMonitorWidget />
          </motion.div>

        </motion.section>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-28">
            
            {/* 1. Introduction */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="pengenalan">
              <SectionHeader number="01" title="Why XAMPP Meta Panel?" />
              <div className="card-dark p-8">
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  No need to manually install or switch between different terminal windows for XAMPP. XAMPP Meta Panel turns your Visual Studio Code into an ultimate DevOps dashboard and Control Center. It's the Swiss Army Knife for modern developers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FeatureCard icon={<Bot/>} title="Local AI / LLM" desc="Native integration for running offline AI Chat and code completion using .gguf models." />
                  <FeatureCard icon={<Code/>} title="HTML to EXE Compiler" desc="Compile static HTML/JS/CSS projects into standalone Desktop Applications effortlessly." />
                  <FeatureCard icon={<MonitorSmartphone/>} title="Laravel to APK" desc="Compile your Laravel projects into Android APKs utilizing the Android Emulator & Capacitor." />
                  <FeatureCard icon={<Mic/>} title="Alisa Voice Assistant" desc="Hands-free coding! Toggle the global mic to issue voice commands (e.g., 'Alisa start apache')." />
                  <FeatureCard icon={<Globe/>} title="WhatsApp Bot Automation" desc="Remote Server Management directly via WhatsApp commands (Start/Stop Apache, MariaDB, query databases)." />
                  <FeatureCard icon={<Cpu/>} title="IoT & Firmware" desc="Build IoT firmware using PlatformIO and Wokwi directly within the extension." />
                </div>
              </div>
            </motion.section>

            {/* 2. What's New */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="fitur">
              <SectionHeader number="02" title="What's New in Version 5.0.0+" />
              <div className="space-y-6">
                <div className="card-dark p-8 border-t-4 border-t-blue-500">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><Bot className="text-blue-400"/> Unlimited Token AI Model Integration</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5"/> <span><strong>Local API Server:</strong> Run AI completions locally via `http://127.0.0.1:8088/completion`.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5"/> <span><strong>Cloud Dashboard:</strong> Monitor and test tokens at xampp-meta-panel-llm-model.vercel.app.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5"/> <span><strong>No Hidden Fees:</strong> Completely free and unlimited token usage for developers.</span></li>
                  </ul>
                </div>

                <div className="card-dark p-8 border-t-4 border-t-green-500">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><Smartphone className="text-green-400"/> WhatsApp Bot Control Center</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5"/> <span><strong>Persistent Session:</strong> Scan the QR code once, and the bot will remember your session permanently.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5"/> <span><strong>Remote Server Management:</strong> Start/Stop Apache, MariaDB, Laravel, Flutter, and PHP directly via WhatsApp.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5"/> <span><strong>Database Queries via Chat:</strong> Execute SQL queries directly from WhatsApp (`!query`, `!db`).</span></li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card-dark p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Monitor className="text-purple-400"/> Android & Apps</h3>
                    <p className="text-sm text-gray-400">Manage Android AVDs, compile any web project to a standalone Desktop app (Windows/Mac/Linux), or turn your Laravel project into an Android APK.</p>
                  </div>
                  <div className="card-dark p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Database className="text-orange-400"/> Network Topology</h3>
                    <p className="text-sm text-gray-400">Drag & Drop SQL Import to parse schemas and visualize them as interactive network nodes (SQL to Cisco Visualizer) with live packet animation.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 3. Settings */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="settings">
              <SectionHeader number="03" title="Extension Settings" />
              <p className="text-gray-400 mb-6">Customize the extension's behavior via VS Code Settings (`Settings.json`).</p>
              
              <div className="card-dark overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-800/50 text-gray-300 border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Setting ID</th>
                      <th className="px-6 py-4 font-semibold text-gray-400">Description</th>
                      <th className="px-6 py-4 font-bold text-blue-400">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-gray-300">
                    <TableRow label="xampp.enableTTS" desc="Enable or disable Text-to-Speech (TTS) voice announcements." def="true" />
                    <TableRow label="xampp.showSplashScreen" desc="Show or hide the splash screen when opening XAMPP Meta Panel." def="true" />
                    <TableRow label="xampp.ggufPath" desc="Path to the local GGUF AI model file for offline AI chat." def='""' />
                    <TableRow label="xampp.aiApiEndpoint" desc="Custom endpoint for AI Completion API." def="http://127.0.0.1:8088/completion" />
                    <TableRow label="xampp.xamppPath" desc="Custom path to your XAMPP installation directory." def="C:\xampp" />
                    <TableRow label="xampp.autoBackupOnStop" desc="Automatically backup MySQL databases when stopping the server." def="false" />
                    <TableRow label="xampp.androidEmulatorPath" desc="Cached path to Android emulator executable (auto-detected)." def='""' />
                    <TableRow label="xampp.androidCpuCores" desc="Number of CPU cores allocated to Android Emulator (1-8)." def="2" />
                    <TableRow label="xampp.androidRamSize" desc="RAM size for Android Emulator in MB (512-8192)." def="2048" />
                    <TableRow label="xampp.androidUseHostGpu" desc="Use host GPU acceleration (recommended)." def="true" />
                    <TableRow label="xampp.androidNoAudio" desc="Disable audio in emulator to save resources (recommended)." def="true" />
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* 4. Keyboard Shortcuts */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="shortcuts">
              <SectionHeader number="04" title="Keyboard Shortcuts & Commands" />
              <p className="text-gray-400 mb-6">Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type `XAMPP`, or use the following shortcuts:</p>
              
              <div className="card-dark overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-800/50 text-gray-300 border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Shortcut</th>
                      <th className="px-6 py-4 font-semibold text-gray-400">Command ID</th>
                      <th className="px-6 py-4 font-bold text-blue-400">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50 text-gray-300">
                    <TableRow label={<kbd className="inline-code">Shift + Z</kbd>} desc="xampp.openPanel" def="Opens the XAMPP Meta Panel Webview." />
                    <TableRow label={<kbd className="inline-code">Shift + C</kbd>} desc="xampp.compileHtmlToExe" def="Compile current HTML project to Desktop App (.exe)." />
                    <TableRow label={<kbd className="inline-code">Shift + X</kbd>} desc="xampp.pioCreateProject" def="Create new PlatformIO/Wokwi IoT Project." />
                    <TableRow label={<kbd className="inline-code">Shift + T</kbd>} desc="xampp.openCliTerminal" def="Open the dedicated XAMPP CLI Terminal." />
                    <TableRow label={<kbd className="inline-code">Shift + Alt</kbd>} desc="xampp.pioCompile" def="Compile PlatformIO Firmware." />
                    <TableRow label={<kbd className="inline-code">Shift + Q</kbd>} desc="xampp.switchVersions" def="Switch XAMPP PHP Version." />
                    <TableRow label={<kbd className="inline-code">Shift + H</kbd>} desc="xampp.compileLaravelApk" def="Compile Laravel project to Android APK." />
                    <TableRow label={<kbd className="inline-code">Shift + A</kbd>} desc="xampp.openAiChat" def="Start AI Chat with Unlimited Token Model." />
                    <TableRow label={<kbd className="inline-code">Shift + E</kbd>} desc="xampp.startEmulator" def="Start Android Emulator." />
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* 5. WhatsApp Bot Reference */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="whatsapp">
              <SectionHeader number="05" title="Full WhatsApp Bot Command Reference" />
              <p className="text-gray-400 mb-6">Manage your local server directly through WhatsApp chats using these trigger commands.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card-dark p-6">
                  <h4 className="font-bold text-white mb-4 border-b border-gray-800 pb-2">Server Management</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><code className="text-blue-400">!start apache</code> <span className="text-gray-500">Start Apache</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!stop apache</code> <span className="text-gray-500">Stop Apache</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!start mariadb</code> <span className="text-gray-500">Start MariaDB</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!stop mariadb</code> <span className="text-gray-500">Stop MariaDB</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!start laravel &lt;folder&gt;</code> <span className="text-gray-500">Dev Server (8000)</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!start python &lt;folder&gt;</code> <span className="text-gray-500">Python Server</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!start php &lt;folder&gt;</code> <span className="text-gray-500">PHP Built-in</span></li>
                    <li className="flex justify-between"><code className="text-blue-400">!start flutter &lt;folder&gt;</code> <span className="text-gray-500">Flutter Web</span></li>
                  </ul>
                </div>
                
                <div className="card-dark p-6">
                  <h4 className="font-bold text-white mb-4 border-b border-gray-800 pb-2">Build & AI Tools</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><code className="text-green-400">!build flutter</code> <span className="text-gray-500">Build APK</span></li>
                    <li className="flex justify-between"><code className="text-green-400">!build exe</code> <span className="text-gray-500">Compile HTML/URL</span></li>
                    <li className="flex justify-between"><code className="text-green-400">!web2exe &lt;url&gt;</code> <span className="text-gray-500">URL to Windows EXE</span></li>
                    <li className="flex justify-between"><code className="text-purple-400">!ai on / !ai off</code> <span className="text-gray-500">Toggle AI Engine</span></li>
                    <li className="flex justify-between"><code className="text-purple-400">!ai &lt;question&gt;</code> <span className="text-gray-500">Ask Unlimited LLM</span></li>
                    <li className="flex justify-between"><code className="text-orange-400">!query &lt;SQL&gt;</code> <span className="text-gray-500">Global SQL Query</span></li>
                    <li className="flex justify-between"><code className="text-orange-400">!db &lt;name&gt; &lt;SQL&gt;</code> <span className="text-gray-500">Specific Database SQL</span></li>
                    <li className="flex justify-between"><code className="text-gray-400">!cleanup</code> <span className="text-gray-500">Kill All Processes</span></li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* 6. Comparison */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="komparasi">
              <SectionHeader number="06" title="Comprehensive Platform Comparison" />
              <p className="text-gray-400 mb-6">See how Meta Panel stacks up against traditional local development tools and cloud servers in 2026.</p>
              
              <div className="card-dark overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-gray-800/50 text-gray-300 border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Feature / Metric</th>
                      <th className="px-6 py-4 font-semibold text-gray-400">Classic XAMPP</th>
                      <th className="px-6 py-4 font-semibold text-gray-400">Laragon</th>
                      <th className="px-6 py-4 font-semibold text-gray-400">Awan Server (VPS)</th>
                      <th className="px-6 py-4 font-bold text-blue-400">Meta Panel V5</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    <TableRowComp label="Virtual Hosts (.test)" xampp="Manual config" laragon="Yes (Restart req)" awan="Nginx manual" meta="Instant (Zero Restart)" />
                    <TableRowComp label="SSL/HTTPS Gen" xampp="Complex OpenSSL" laragon="Manual / CLI" awan="Certbot / CLI" meta="1-Click Trusted SSL" />
                    <TableRowComp label="Laravel Ecosystem" xampp="Manual (Serve)" laragon="Good" awan="Requires Setup" meta="Deep VSCode Integration" />
                    <TableRowComp label="Local AI / LLM" xampp="No Support" laragon="No Support" awan="Expensive API/GPU" meta="Native (.gguf) Offline" />
                    <TableRowComp label="WhatsApp Bot Auto" xampp="No" laragon="No" awan="PM2 Manual" meta="Built-in Puppeteer Engine" />
                    <TableRowComp label="HTML to EXE" xampp="No" laragon="No" awan="No" meta="1-Click Native Compile" />
                    <TableRowComp label="Android APK Build" xampp="No" laragon="No" awan="No" meta="Built-in Emulator & Capacitor" />
                    <TableRowComp label="IoT & PlatformIO" xampp="No" laragon="No" awan="No" meta="Native UI Compiler" />
                    <TableRowComp label="Voice Assistant" xampp="No" laragon="No" awan="No" meta="Alisa (Speech-to-Text)" />
                    <TableRowComp label="Auto Database" xampp="phpMyAdmin" laragon="HeidiSQL" awan="CLI / Adminer" meta="Auto-creates on Add" />
                    <TableRowComp label="Port Auto-Fix" xampp="Manual edit" laragon="Manual" awan="Firewall edit" meta="1-Click Auto Resolve" />
                    <TableRowComp label="RAM Consumption" xampp="~15MB" laragon="~50MB" awan="~500MB (OS)" meta="Follows XAMPP (~18MB)" />
                    <TableRowComp label="Startup Time" xampp="~5s" laragon="~15s" awan="~30s (Boot)" meta="~2s (from VSCode)" />
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* 7. Unique Capabilities & Charts */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="metrics">
              <SectionHeader number="07" title="Unique Capabilities & Metrics" />
              <p className="text-gray-400 mb-8">
                Unlike generic web servers, Meta Panel is engineered with advanced DevOps and AI capabilities built directly into the core. Visualizing the exclusive features that no other local platform provides natively.
              </p>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="card-dark p-6">
                  <h3 className="text-lg font-bold mb-6 text-white text-center">Exclusive Feature Availability</h3>
                  <div className="h-[300px]">
                    <Bar data={featureBarData} options={featureBarOptions} />
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-4">Feature completeness (100% = Fully Supported Native)</p>
                </div>
                <div className="card-dark p-6">
                  <h3 className="text-lg font-bold mb-6 text-white text-center">Setup Time Benchmark (Minutes)</h3>
                  <div className="h-[300px]">
                    <Line data={timeLineData} options={timeLineOptions} />
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-4">Lower is better. Time taken to setup advanced environments.</p>
                </div>
              </div>
            </motion.section>

            {/* 8. Troubleshooting */}
            {/* 8. Version History (Changelog) */}
            {/* 8. System Architecture */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="architecture">
              <SectionHeader number="08" title="System Architecture & Workflow" />
              <p className="text-gray-400 mb-8 text-lg">
                Discover the engineering behind Meta Panel V5. We built an robust, scalable, and fully offline-capable architecture that seamlessly bridges your local environment with powerful AI and DevOps tools.
              </p>
              <ArchitectureFlows />
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="changelog">
              <SectionHeader number="09" title="Version History (V4.4.5 to V5.3.1)" />
              <p className="text-gray-400 mb-8">
                Track the evolution of Meta Panel from the legacy V4 series up to the cutting-edge V5.3.1 releases directly extracted from the Open VSX registry.
              </p>
              <ChangelogTimeline />
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="troubleshooting">
              <SectionHeader number="10" title="Known Issues & Troubleshooting" />
              <div className="space-y-4">
                <Alert type="danger" title="Windows Defender / SmartScreen">
                  When you first start the extension or compile an EXE, Windows SmartScreen may flag the portable binaries. Allow the process in your security settings.
                </Alert>
                <Alert type="warning" title="WhatsApp Session Reset">
                  If the Puppeteer browser cache becomes corrupted, you may need to re-scan the QR code. The session files are stored in <code className="inline-code">%USERPROFILE%\.xampp_wa_session</code>.
                </Alert>
                <Alert type="warning" title="Port Conflicts">
                  If ports 80, 443, 3306, 8088, or 8000 are already in use, the services will fail to start. Use the built-in Netstat Scanner to identify conflicting processes.
                </Alert>
                <Alert type="info" title="TTS Limitation">
                  Text-to-Speech and Voice Recognition currently rely on Windows PowerShell and .NET System.Speech, meaning they are Windows-only features.
                </Alert>
              </div>
            </motion.section>
            
          </div>

          {/* Sticky Sidebar Navigation */}
          <div className="hidden xl:block">
            <div className="sticky top-32 card-dark p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Documentation V5.x</h3>
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <a href="#pengenalan" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Why Meta Panel?</a>
                <a href="#fitur" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">What's New in V5</a>
                <a href="#settings" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Extension Settings</a>
                <a href="#shortcuts" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Shortcuts & Commands</a>
                <a href="#whatsapp" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">WhatsApp Bot Reference</a>
                <a href="#komparasi" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Platform Comparison</a>
                <a href="#architecture" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">System Architecture</a>
                <a href="#changelog" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Version History</a>
                <a href="#metrics" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Unique Capabilities & Metrics</a>
                <a href="#troubleshooting" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Known Issues</a>

              </nav>
            </div>
          </div>
        </div>
      {/* 11. Call To Action (Download) */}
      <div className="max-w-7xl mx-auto px-6 mb-20 mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-10 md:p-16 text-center shadow-2xl"
        >
          <motion.div 
            animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"
          ></motion.div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to Supercharge Your Local DevOps?</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join thousands of developers who have abandoned traditional terminals. Experience offline AI, native HTML-to-EXE compilers, and WhatsApp automation in one powerful VS Code extension.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="vscode:extension/Royhtml.xampp-manager" className="inline-flex items-center gap-3 bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-xl">

                <Download size={24} />
                Install in VS Code (Free)
              </motion.a>

              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://marketplace.visualstudio.com/items?itemName=Royhtml.xampp-manager" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-blue-900/40 border border-blue-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-800/60 transition-colors">

                <Globe size={24} />
                View on Marketplace
              </motion.a>

            </div>
            <p className="text-sm text-blue-200/70 mt-6 font-medium">Compatible with Windows, macOS, and Linux. No credit card required for unlimited local AI tokens.</p>
          </div>
        </motion.div>
      </div>

      </main>

      <footer className="border-t border-gray-900 bg-gray-950 py-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Server className="w-5 h-5 text-gray-500" />
          <span className="font-display font-bold text-gray-500 text-lg tracking-tight">XAMPP<span className="text-gray-600 font-normal">MetaPanel</span></span>
        </div>
        <p className="text-sm text-gray-600 mb-2">Designed & Developed by Dwi Bakti N Dev / Roy.</p>
        <p className="text-xs text-gray-700">© {new Date().getFullYear()} Meta Panel Framework. All rights reserved.</p>
      </footer>
    </div>
  )
}

// Subcomponents

function SectionHeader({ number, title }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-mono font-bold border border-blue-500/20">
        {number}
      </div>
      <h2 className="text-3xl font-display font-bold text-white">{title}</h2>
    </div>
  )
}

function MobileNavLink({ href, icon, text, onClick }) {
  return (
    <a href={href} onClick={onClick} className="text-gray-300 hover:text-white flex items-center gap-4 py-2 border-b border-gray-800/50">
      <div className="text-blue-400">{icon}</div>
      <span className="font-medium">{text}</span>
    </a>

  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/20 shadow-inner">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  )
}

function TableRow({ label, desc, def }) {
  return (
    <tr className="hover:bg-gray-800/30 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-200">{label}</td>
      <td className="px-6 py-4 text-gray-400 text-sm">{desc}</td>
      <td className="px-6 py-4 text-blue-400 font-medium text-sm bg-blue-900/5"><code className="inline-code">{def}</code></td>
    </tr>
  )
}

function TableRowComp({ label, xampp, laragon, awan, meta }) {
  return (
    <tr className="hover:bg-gray-800/30 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-200">{label}</td>
      <td className="px-6 py-4 text-gray-500 text-sm">{xampp}</td>
      <td className="px-6 py-4 text-gray-500 text-sm">{laragon}</td>
      <td className="px-6 py-4 text-gray-500 text-sm">{awan}</td>
      <td className="px-6 py-4 text-blue-400 font-medium text-sm bg-blue-900/5">{meta}</td>
    </tr>
  )
}

function Alert({ type, title, children }) {
  const styles = {
    danger: "bg-red-950/20 border-red-900/50",
    warning: "bg-orange-950/20 border-orange-900/50",
    info: "bg-blue-950/20 border-blue-900/50"
  }
  
  const Icon = type === 'danger' ? ShieldAlert : type === 'warning' ? AlertTriangle : Info
  const colorClass = type === 'danger' ? "text-red-400" : type === 'warning' ? "text-orange-400" : "text-blue-400"

  return (
    <div className={`p-5 rounded-xl border ${styles[type]} flex gap-4`}>
      <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${colorClass}`} />
      <div>
        <h4 className={`font-bold mb-2 text-base ${colorClass}`}>{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

// Chart Configurations
const featureBarData = {
  labels: ['Local AI Chatbot', 'IoT Firmware', 'Android APK Build', 'HTML to EXE', 'WA Bot Engine'],
  datasets: [
    {
      label: 'Meta Panel V5',
      data: [100, 100, 100, 100, 100],
      backgroundColor: '#3b82f6',
      borderRadius: 4,
    },
    {
      label: 'Laragon / Awan Server',
      data: [0, 0, 0, 0, 0],
      backgroundColor: '#374151',
      borderRadius: 4,
    },
    {
      label: 'Classic XAMPP',
      data: [0, 0, 0, 0, 0],
      backgroundColor: '#1f2937',
      borderRadius: 4,
    }
  ]
}

const featureBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { position: 'bottom', labels: { color: '#9ca3af', font: { family: 'Inter' } } },
    tooltip: {
      callbacks: { label: (context) => context.raw === 100 ? ' Supported (Native)' : ' Not Supported' }
    }
  },
  scales: {
    x: { grid: { color: '#1f2937' }, ticks: { color: '#6b7280' } },
    y: { grid: { display: false }, ticks: { display: false }, max: 100 }
  }
}

const timeLineData = {
  labels: ['Setup Laravel + DB', 'Generate Local SSL', 'Setup LLM AI Chat', 'Compile to EXE/APK'],
  datasets: [
    {
      label: 'Traditional Manual Tools (min)',
      data: [15, 20, 60, 45],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Meta Panel Workflow (min)',
      data: [2, 1, 3, 2],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
}

const timeLineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { position: 'bottom', labels: { color: '#9ca3af', font: { family: 'Inter' } } } 
  },
  scales: {
    y: { grid: { color: '#1f2937' }, ticks: { color: '#6b7280' } },
    x: { grid: { display: false }, ticks: { color: '#6b7280' } }
  }
}



// System Monitor Widget Component
function SystemMonitorWidget() {
  const [data, setData] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      cpu: Math.floor(Math.random() * 20) + 10,
      ram: Math.floor(Math.random() * 30) + 40,
      disk: Math.floor(Math.random() * 5) + 60,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        newData.push({
          time: last.time + 1,
          cpu: Math.max(5, Math.min(100, last.cpu + (Math.random() * 20 - 10))),
          ram: Math.max(20, Math.min(100, last.ram + (Math.random() * 10 - 5))),
          disk: Math.max(50, Math.min(100, last.disk + (Math.random() * 2 - 1))),
        });
        return newData;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-dark p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="md:col-span-3 h-[300px] mt-4 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
            <Area type="monotone" dataKey="cpu" name="CPU Usage %" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
            <Area type="monotone" dataKey="ram" name="RAM Usage %" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRam)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Metrics breakdown */}
      <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 flex items-center justify-between relative z-10">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">CPU Load</p>
          <p className="text-3xl font-bold text-white">{Math.round(data[data.length-1].cpu)}%</p>
        </div>
        <Cpu className="text-blue-500 w-10 h-10 opacity-80" />
      </div>
      <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 flex items-center justify-between relative z-10">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">RAM Usage</p>
          <p className="text-3xl font-bold text-white">{Math.round(data[data.length-1].ram)}%</p>
        </div>
        <Server className="text-emerald-500 w-10 h-10 opacity-80" />
      </div>
      <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 flex items-center justify-between relative z-10">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Disk I/O</p>
          <p className="text-3xl font-bold text-white">{Math.round(data[data.length-1].disk)}%</p>
        </div>
        <Database className="text-purple-500 w-10 h-10 opacity-80" />
      </div>
    </div>
  )
}
