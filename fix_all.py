with open("src/App.jsx", "r") as f:
    lines = f.readlines()

new_lines = []
imported = False
for line in lines:
    if "import { AppGallery } from" in line:
        if imported:
            continue
        imported = True
    new_lines.append(line)

with open("src/App.jsx", "w") as f:
    f.writelines(new_lines)

