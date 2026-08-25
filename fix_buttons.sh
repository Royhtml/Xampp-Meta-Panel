#!/bin/bash
sed -i '/<Github size={18}\/> GitHub Repository/d' src/App.jsx
# Remove extra </motion.div> right above </div> and <motion.div variants={fadeUp} className="flex-1 w-full relative">
sed -i '/<\/motion.div>/!b;n;/<\/div>/!b;n;/<motion.div variants={fadeUp} className="flex-1 w-full relative">/!b;.-2d' src/App.jsx
