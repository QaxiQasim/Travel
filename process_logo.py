from PIL import Image

def remove_black_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        
        # Calculate alpha based on the maximum color component to preserve gold
        alpha = max(r, g, b)
        
        # Boost alpha slightly using square root curve so gold remains solid
        new_alpha = int((alpha / 255.0) ** 0.7 * 255)
        
        # We can also map very dark pixels (< 15) to pure transparent
        if alpha < 15:
            new_alpha = 0
            
        newData.append((r, g, b, new_alpha))

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_black_bg('artifacts/rayna-tours/public/logo.jpg', 'artifacts/rayna-tours/public/logo.png')
print("Successfully generated logo.png")
