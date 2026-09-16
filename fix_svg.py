import xml.etree.ElementTree as ET

tree = ET.parse("src/src_assets/new_astronaut.svg")
root = tree.getroot()
ns = {'svg': 'http://www.w3.org/2000/svg'}
ET.register_namespace('', ns['svg'])

width = int(root.attrib['width'])
height = int(root.attrib['height'])

grid = [[0 for _ in range(height)] for _ in range(width)]

# 0 = other
# 1 = black rect
# 2 = flood filled background

rects = []
for el in root.findall("{http://www.w3.org/2000/svg}rect"):
    fill = el.attrib.get('fill', '').upper()
    if fill == '#000000':
        x = int(el.attrib['x'])
        y = int(el.attrib['y'])
        w = int(el.attrib['width'])
        h = int(el.attrib['height'])
        rects.append((el, x, y, w, h))
        for ix in range(x, x + w):
            for iy in range(y, y + h):
                grid[ix][iy] = 1

# Flood fill from boundaries
q = []
for x in range(width):
    if grid[x][0] == 1:
        grid[x][0] = 2
        q.append((x, 0))
    if grid[x][height-1] == 1:
        grid[x][height-1] = 2
        q.append((x, height-1))

for y in range(height):
    if grid[0][y] == 1:
        grid[0][y] = 2
        q.append((0, y))
    if grid[width-1][y] == 1:
        grid[width-1][y] = 2
        q.append((width-1, y))

while q:
    x, y = q.pop(0)
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = x+dx, y+dy
        if 0 <= nx < width and 0 <= ny < height:
            if grid[nx][ny] == 1:
                grid[nx][ny] = 2
                q.append((nx, ny))

# Now remove any rect that is entirely composed of grid == 2
to_remove = []
for el, x, y, w, h in rects:
    is_bg = True
    for ix in range(x, x+w):
        for iy in range(y, y+h):
            if grid[ix][iy] != 2:
                is_bg = False
                break
    if is_bg:
        to_remove.append(el)

print(f"Total black rects: {len(rects)}")
print(f"Background rects to remove: {len(to_remove)}")

for el in to_remove:
    root.remove(el)

tree.write("src/src_assets/new_astronaut.svg", xml_declaration=True, encoding='utf-8')
