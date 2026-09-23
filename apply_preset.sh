#!/bin/bash

# Misty Atmospheric Preset Application Script
# Usage: ./apply_preset.sh input_image.jpg output_image.jpg

if [ $# -lt 2 ]; then
    echo "Usage: $0 <input_image> <output_image>"
    echo "Example: $0 photo.jpg photo_atmospheric.jpg"
    exit 1
fi

INPUT_IMAGE="$1"
OUTPUT_IMAGE="$2"
PRESET_FILE="misty_atmospheric_preset.json"

if [ ! -f "$INPUT_IMAGE" ]; then
    echo "Error: Input image '$INPUT_IMAGE' not found!"
    exit 1
fi

if [ ! -f "$PRESET_FILE" ]; then
    echo "Error: Preset file '$PRESET_FILE' not found!"
    echo "Using default preset..."
    
    cat > "$PRESET_FILE" << 'EOF'
{
  "name": "Misty Atmospheric",
  "description": "Creates a soft, misty, atmospheric look",
  "adjustments": {
    "brightness": 0.9281167313772964,
    "contrast": 0.8484436611893117,
    "saturation": 0.9858629664904486,
    "blur_radius": 1.5,
    "vignette_strength": 0.15,
    "color_temperature": "cooler",
    "temperature_shift": -10.243561608686264
  }
}
EOF
fi

echo "Applying Misty Atmospheric preset..."
echo "Input: $INPUT_IMAGE"
echo "Output: $OUTPUT_IMAGE"
echo ""

python3 image_preset_analyzer.py --apply \
    --image1 "$INPUT_IMAGE" \
    --preset "$PRESET_FILE" \
    --output "$OUTPUT_IMAGE"

if [ $? -eq 0 ]; then
    echo ""
    echo "Success! Image processed and saved to: $OUTPUT_IMAGE"
else
    echo ""
    echo "Error: Failed to process image"
    exit 1
fi
