from PIL import Image

img = Image.open('public/notebook.png')
print(f"Image mode: {img.mode}, size: {img.size}")
bbox = img.getbbox()
print(f"Non-transparent bounding box: {bbox}")

# Let's sample a row across the middle to see where the dark pixels are
# The notebook is dark, but the shadow is darker or more transparent
# We'll print the alpha values across y = height // 2
w, h = img.size
y = h // 2
alphas = []
for x in range(0, w, 10):
    pixel = img.getpixel((x, y))
    alphas.append(pixel[3]) # Alpha channel

print("Alpha values across the middle row (every 10 pixels):")
print(alphas)
