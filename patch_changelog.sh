#!/bin/bash
sed -i '/id="troubleshooting"/i \
            {/* 8. Version History (Changelog) */}\
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="changelog">\
              <SectionHeader number="08" title="Version History (V4.4.5 to V5.3.1)" />\
              <p className="text-gray-400 mb-8">\
                Track the evolution of Meta Panel from the legacy V4 series up to the cutting-edge V5.3.1 releases directly extracted from the Open VSX registry.\
              </p>\
              <ChangelogTimeline />\
            </motion.section>\
' src/App.jsx
