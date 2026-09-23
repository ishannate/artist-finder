# Misty Atmospheric Image Preset

This project includes a powerful image preset system that transforms photos with a soft, misty, atmospheric look - perfect for scenic landscape and travel photos.

## Features

### Analysis Results

The preset was created by analyzing the differences between two sample images:

- **Brightness**: -7.2% (darker for atmospheric depth)
- **Contrast**: -15.2% (softer for dreamy effect)
- **Saturation**: -1.4% (subtle desaturation)
- **Sharpness**: -70.3% (significant softening for misty effect)
- **Color Temperature**: Cooler (-10.24 shift towards blue tones)

### What the Preset Does

The "Misty Atmospheric" preset creates:
- Soft, dreamy atmosphere
- Reduced contrast for a gentle look
- Slight blur for atmospheric haze
- Cooler color temperature (more blues, less warm tones)
- Lower sharpness to mimic fog/mist

## How to Use

### Web Application (React)

1. **Start the development server:**
   ```bash
   npm install
   npm start
   ```

2. **Navigate to the Image Preset page:**
   - Click on "Image Preset" in the navigation menu
   - Or go to `http://localhost:3000/image-preset`

3. **Upload and process your image:**
   - Click "Choose Image" to upload your photo
   - Click "Apply Preset" to transform the image
   - Compare original vs processed side-by-side
   - Click "Download Result" to save the processed image

### Command Line Tool (Python)

#### Analyze Two Images

To analyze differences between two images and create a custom preset:

```bash
python3 image_preset_analyzer.py --analyze \
  --image1 path/to/original.jpg \
  --image2 path/to/target_style.jpg
```

This will:
- Analyze brightness, contrast, saturation, sharpness differences
- Generate a preset JSON file
- Save it as `misty_atmospheric_preset.json`

#### Apply Preset to an Image

To apply the preset to a new image:

```bash
python3 image_preset_analyzer.py --apply \
  --image1 path/to/input.jpg \
  --preset misty_atmospheric_preset.json \
  --output path/to/output.jpg
```

## Technical Details

### Preset Configuration

The preset is stored as a JSON file with these adjustments:

```json
{
  "name": "Misty Atmospheric",
  "description": "Creates a soft, misty, atmospheric look",
  "adjustments": {
    "brightness": 0.93,
    "contrast": 0.85,
    "saturation": 0.99,
    "blur_radius": 1.5,
    "color_temperature": "cooler",
    "temperature_shift": -10.24
  }
}
```

### Image Processing Pipeline

1. **Brightness Adjustment**: Scales RGB values
2. **Contrast Adjustment**: Pulls colors toward/away from gray
3. **Saturation Adjustment**: Modifies color intensity
4. **Color Temperature**: Shifts red/blue balance
5. **Blur Effect**: Applies Gaussian blur for atmosphere

## Use Cases

Perfect for:
- Landscape photography
- Travel photos
- Scenic train/mountain shots
- Creating moody, atmospheric images
- Instagram/social media content
- Photo editing workflows

## Files

- `image_preset_analyzer.py` - Command-line tool for analysis and processing
- `misty_atmospheric_preset.json` - The preset configuration file
- `src/components/ImagePreset/ImagePreset.tsx` - React web component
- `src/pages/ImagePresetPage/ImagePresetPage.tsx` - Web page wrapper

## Requirements

### For Python Tool
- Python 3.x
- Pillow (PIL)
- OpenCV (opencv-python-headless)
- NumPy

Install with:
```bash
pip install Pillow numpy opencv-python-headless
```

### For React App
- Node.js
- React 18+
- TypeScript
- styled-components

## Example Results

The preset transforms clear, bright images into soft, atmospheric versions with:
- Misty, dreamy quality
- Reduced harsh shadows
- Cooler color palette
- Softer overall appearance
- Professional aesthetic

## Customization

You can modify the preset by:
1. Editing `misty_atmospheric_preset.json` manually
2. Analyzing your own image pairs to create custom presets
3. Adjusting individual parameters in the code

## Browser Compatibility

The web application works in all modern browsers supporting:
- Canvas API
- File API
- ES6+ JavaScript

## License

This preset system is part of the Label-A project.
