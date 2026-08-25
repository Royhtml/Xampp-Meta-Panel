with open("src/App.jsx", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if "<Github size={18}/> GitHub Repository" in line:
        continue
    new_lines.append(line)

with open("src/App.jsx", "w") as f:
    f.writelines(new_lines)
