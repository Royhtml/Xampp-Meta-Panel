#!/bin/bash
# Insert CTA right before the closing main tag
sed -i '/<\/main>/i \
      {/* 11. Call To Action (Download) */}\
      <div className="max-w-7xl mx-auto px-6 mb-20 mt-12">\
        <motion.div \
          initial={{ opacity: 0, y: 30 }} \
          whileInView={{ opacity: 1, y: 0 }} \
          viewport={{ once: true }}\
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-10 md:p-16 text-center shadow-2xl"\
        >\
          <div className="absolute inset-0 bg-[url(\"https://www.transparenttextures.com/patterns/cubes.png\")] opacity-20 mix-blend-overlay"></div>\
          <div className="relative z-10">\
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to Supercharge Your Local DevOps?</h2>\
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">\
              Join thousands of developers who have abandoned traditional terminals. Experience offline AI, native HTML-to-EXE compilers, and WhatsApp automation in one powerful VS Code extension.\
            </p>\
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">\
              <a href="vscode:extension/Royhtml.xampp-manager" className="inline-flex items-center gap-3 bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 hover:shadow-xl">\
                <Download size={24} />\
                Install in VS Code (Free)\
              </a>\
              <a href="https://marketplace.visualstudio.com/items?itemName=Royhtml.xampp-manager" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-blue-900/40 border border-blue-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-800/60 transition-all">\
                <Globe size={24} />\
                View on Marketplace\
              </a>\
            </div>\
            <p className="text-sm text-blue-200/70 mt-6 font-medium">Compatible with Windows, macOS, and Linux. No credit card required for unlimited local AI tokens.</p>\
          </div>\
        </motion.div>\
      </div>\
' src/App.jsx
