import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const images = [
  {
    url: 'https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(2).png?raw=true',
    title: 'Main Control Panel',
    desc: 'Manage Apache, MySQL, and see live server metrics directly within VS Code.'
  },
  {
    url: 'https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/vitures.png?raw=true',
    title: 'All-in-One Features',
    desc: 'Local AI, HTML to EXE compiler, WhatsApp bot, and more.'
  },
  {
    url: 'https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/api.png?raw=true',
    title: 'Offline AI Engine',
    desc: 'Unlimited AI API tokens using local .gguf models natively.'
  },
  {
    url: 'https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/apidash.png?raw=true',
    title: 'API Dashboard',
    desc: 'Monitor your Local LLM token usage and system load in real-time.'
  },
  {
    url: 'https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/pat/pat%20(3).png?raw=true',
    title: 'Server Logs & Output',
    desc: 'Integrated console output for instant debugging.'
  },
  {
    url: 'https://github.com/Royhtml/Xampp-Meta-Panel/blob/main/new%20version/premium.png?raw=true',
    title: 'Premium Capabilities',
    desc: 'Unlock the full potential of your development environment.'
  }
];

export function AppGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="w-full relative mt-12 mb-20" id="gallery">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Complete Showcase</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Take a look at the actual interface of Meta Panel V5 inside VS Code.</p>
        </div>

        {/* Main Carousel Container */}
        <div className="relative max-w-5xl mx-auto group">
          <div className="absolute -inset-4 bg-blue-500/10 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] md:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover object-top cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </AnimatePresence>

            {/* Overlay Gradient & Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent p-6 md:p-8 pt-20 pointer-events-none">
              <motion.div
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{images[currentIndex].title}</h3>
                <p className="text-gray-300 text-sm md:text-base max-w-3xl">{images[currentIndex].desc}</p>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-950/50 text-white backdrop-blur-md border border-gray-700/50 hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-950/50 text-white backdrop-blur-md border border-gray-700/50 hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Expand Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-gray-950/50 text-white backdrop-blur-md border border-gray-700/50 hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <Maximize2 size={20} />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700 hover:bg-gray-500'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors z-[101]"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Modal Nav */}
            <div className="absolute inset-y-0 left-4 md:left-8 flex items-center" onClick={(e) => e.stopPropagation()}>
              <button onClick={prevSlide} className="p-4 rounded-full bg-gray-900/80 text-white hover:bg-blue-600 transition-colors">
                <ChevronLeft size={32} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 md:right-8 flex items-center" onClick={(e) => e.stopPropagation()}>
              <button onClick={nextSlide} className="p-4 rounded-full bg-gray-900/80 text-white hover:bg-blue-600 transition-colors">
                <ChevronRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
