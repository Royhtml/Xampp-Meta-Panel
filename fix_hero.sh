#!/bin/bash
sed -i '129c\
            </div>\
            <motion.div variants={fadeUp} className="flex-1 w-full relative">\
' src/App.jsx
