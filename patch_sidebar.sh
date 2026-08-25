#!/bin/bash
sed -i '/<nav className="flex flex-col gap-4 text-sm font-medium">/c\
              <nav className="flex flex-col gap-4 text-sm font-medium">\
                <a href="#pengenalan" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Why Meta Panel?</a>\
                <a href="#fitur" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">What'\''s New in V5</a>\
                <a href="#settings" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Extension Settings</a>\
                <a href="#shortcuts" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Shortcuts & Commands</a>\
                <a href="#whatsapp" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">WhatsApp Bot Reference</a>\
                <a href="#komparasi" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Platform Comparison</a>\
                <a href="#architecture" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">System Architecture</a>\
                <a href="#changelog" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Version History</a>\
                <a href="#metrics" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Unique Capabilities & Metrics</a>\
                <a href="#troubleshooting" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all">Known Issues</a>\
' src/App.jsx
