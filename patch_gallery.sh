#!/bin/bash
# Insert import
sed -i '/import { ChangelogTimeline } from ".\/Changelog"/a \
import { AppGallery } from ".\/Gallery"\
' src/App.jsx

# Remove the existing small hero image to make space for the Gallery, or we can keep the logo and add the gallery below it.
# Actually, the user wants "gambar aplikasi nya extension nya lengkap". Let's put the gallery right below the hero section.
sed -i '/{/\* Spotlight Section \*\/}/i \
        {/* App Showcase Gallery */}\
        <AppGallery />\
' src/App.jsx
