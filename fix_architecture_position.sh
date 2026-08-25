#!/bin/bash
# Remove the System Architecture section from its current wrong place
sed -i '/{\/\* 8. System Architecture \*\/}/,/<\/motion.section>/d' src/App.jsx

# Insert it in the correct place, right before Version History (changelog)
sed -i '/id="changelog"/i \
            {/* 8. System Architecture */}\
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} id="architecture">\
              <SectionHeader number="08" title="System Architecture & Workflow" />\
              <p className="text-gray-400 mb-8 text-lg">\
                Discover the engineering behind Meta Panel V5. We built an robust, scalable, and fully offline-capable architecture that seamlessly bridges your local environment with powerful AI and DevOps tools.\
              </p>\
              <ArchitectureFlows />\
            </motion.section>\
' src/App.jsx
