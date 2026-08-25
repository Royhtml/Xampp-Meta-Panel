#!/bin/bash
sed -i '/<span className="font-medium">{text}<\/span>/c\
      <span className="font-medium">{text}</span>\
    </a>\
' src/App.jsx

# Also I deleted `</a>` from lines 55, 117, 119. Let me fix them one by 1.
sed -i '/<a href="https:\/\/xampp-meta-panel-api-key.vercel.app\/" target="_blank" rel="noreferrer"/c\
              <a href="https://xampp-meta-panel-api-key.vercel.app/" target="_blank" rel="noreferrer" className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">\
                API Dashboard <ArrowRight size={16} />\
              </a>\
' src/App.jsx

sed -i '/<a href="https:\/\/open-vsx.org\/extension\/Royhtml\/xampp-manager" target="_blank" rel="noreferrer"/c\
                <a href="https://open-vsx.org/extension/Royhtml/xampp-manager" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-950 font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">\
                  <Download size={20} /> Download Extension\
                </a>\
' src/App.jsx

sed -i '/<a href="https:\/\/github.com\/Royhtml\/Xampp-Meta-Panel" target="_blank" rel="noreferrer"/c\
                <a href="https://github.com/Royhtml/Xampp-Meta-Panel" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 border border-gray-800 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">\
                  <GitCommit size={20} /> View Source Code\
                </a>\
' src/App.jsx

