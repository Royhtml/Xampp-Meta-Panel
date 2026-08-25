#!/bin/bash
sed -i '/<div className="absolute inset-0 bg-\[url(.https:\/\/www.transparenttextures.com\/patterns\/cubes.png.)\] opacity-20 mix-blend-overlay"><\/div>/c\
          <motion.div \
            animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}\
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}\
            className="absolute inset-0 bg-[url('\''https://www.transparenttextures.com/patterns/cubes.png'\'')] opacity-20 mix-blend-overlay"\
          ></motion.div>\
' src/App.jsx

sed -i '/<a href="vscode:extension\/Royhtml.xampp-manager"/c\
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="vscode:extension/Royhtml.xampp-manager" className="inline-flex items-center gap-3 bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-xl">\
' src/App.jsx

sed -i '/Install in VS Code (Free)/c\
                Install in VS Code (Free)\
              </motion.a>\
' src/App.jsx

sed -i '/<a href="https:\/\/marketplace.visualstudio.com\/items?itemName=Royhtml.xampp-manager"/c\
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://marketplace.visualstudio.com/items?itemName=Royhtml.xampp-manager" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-blue-900/40 border border-blue-400/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-800/60 transition-colors">\
' src/App.jsx

sed -i '/View on Marketplace/c\
                View on Marketplace\
              </motion.a>\
' src/App.jsx

