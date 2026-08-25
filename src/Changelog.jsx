import React from 'react'
import { motion } from 'framer-motion'
import { GitCommit, Star, Zap, Bug, CheckCircle2 } from 'lucide-react'

export function ChangelogTimeline() {
  const updates = [
    {
      version: 'v5.3.1',
      date: 'Latest Release',
      type: 'major',
      title: 'Performance & Local AI Expansion',
      changes: [
        'Added support for DeepSeek-Coder & Llama-3 (.gguf) in Local AI Chat.',
        'New Recharts integration for Real-Time RAM/CPU Monitor.',
        'Optimized Android Emulator Quick Boot, reduced RAM footprint by 15%.',
        'Fixed port conflict resolution failing on Windows 11 23H2.',
      ]
    },
    {
      version: 'v5.2.2',
      date: 'Major Feature',
      type: 'feature',
      title: 'WhatsApp Bot & Capacitor Build',
      changes: [
        'Introduced WhatsApp Bot Automation with Puppeteer headless engine.',
        'Added 1-Click Capacitor build for converting Laravel to Android APK.',
        'New UI Dashboard with glassmorphism and Framer Motion animations.',
      ]
    },
    {
      version: 'v5.1.2',
      date: 'Major Feature',
      type: 'feature',
      title: 'IOT Platform',
      changes: [
        'IOT Platform added.',
        'Added IOT device management.',
        'Fix ports problem.',
        'Fix windows defender problem.',
      ]
    },
    {
      version: 'v5.0.2',
      date: 'Update',
      type: 'update',
      title: 'Meta Panel Update',
      changes: [
        'Added Local AI Chat for chatting with LLMs',
        'Fixed UI buttons and performances.',
      ]
    },
    {
      version: 'v5.0.0',
      date: 'V5 Milestone',
      type: 'major',
      title: 'The Meta Panel Revolution',
      changes: [
        'Complete rewrite of the core engine to support offline LLM processing.',
        'HTML to EXE Native Compiler via integrated Chromium wrapper.',
        'PlatformIO & IoT Firmware flashing directly from VS Code.',
        'Alisa Voice Assistant (TTS) integration for server status.'
      ]
    },
    {
      version: 'v4.4.9',
      date: 'Bug fix',
      type: 'bugfix',
      title: 'Stability & Bug Fixes',
      changes: [
        'Fixed buttons not working.',
      ]
    },
    {
      version: 'v4.4.5',
      date: 'Legacy Stable',
      type: 'legacy',
      title: 'Stability & Bug Fixes',
      changes: [
        'Improved PHP 8.2 compatibility for Composer dependencies.',
        'Fixed Apache fail-to-start loop when SSL certs are missing.',
        'Last major release before the V5 Meta Panel engine.'
      ]
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'major': return <Star className="text-blue-400 w-5 h-5" />;
      case 'feature': return <Zap className="text-emerald-400 w-5 h-5" />;
      case 'legacy': return <CheckCircle2 className="text-gray-400 w-5 h-5" />;
      default: return <GitCommit className="text-gray-400 w-5 h-5" />;
    }
  };

  return (
    <div className="card-dark p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 border-l border-gray-800 ml-4 md:ml-6 space-y-10 py-4">
        {updates.map((update, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            <div className="absolute -left-[21px] top-1 bg-gray-900 border border-gray-700 p-1.5 rounded-full z-10 shadow-lg">
              {getIcon(update.type)}
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <span className="text-xl font-bold text-white tracking-wide">{update.version}</span>
              <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 w-max">
                {update.date}
              </span>
            </div>

            <h4 className="text-lg font-semibold text-gray-300 mb-3">{update.title}</h4>

            <ul className="space-y-2">
              {update.changes.map((change, i) => (
                <li key={i} className="flex gap-3 text-gray-400 text-sm md:text-base leading-relaxed">
                  <span className="text-gray-600 mt-1.5">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
