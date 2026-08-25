#!/bin/bash
sed -i '/<InteractiveControlPanel \/>/c\
            {/* 8. System Architecture */}\
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="architecture">\
              <SectionHeader number="08" title="System Architecture & Workflow" />\
              <p className="text-gray-400 mb-8">\
                Understand the inner workings of Meta Panel V5 through these comprehensive architectural flows detailing our offline AI engine, native compiler, and WhatsApp automation.\
              </p>\
              <ArchitectureFlows />\
            </motion.section>\
' src/App.jsx
