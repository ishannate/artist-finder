#!/usr/bin/env python3
"""
Image Preset Analyzer
Analyzes the differences between two images and creates a preset to transform one into the other.
"""

import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import argparse
import json
import os


def analyze_image_differences(img1_path, img2_path):
    """Analyze the differences between two images."""
    
    img1 = cv2.imread(img1_path)
    img2 = cv2.imread(img2_path)
    
    if img1 is None or img2 is None:
        raise ValueError("Could not load images")
    
    # Resize img2 to match img1 if needed
    if img1.shape != img2.shape:
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))
    
    # Convert to different color spaces
    img1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    
    img1_hsv = cv2.cvtColor(img1, cv2.COLOR_BGR2HSV)
    img2_hsv = cv2.cvtColor(img2, cv2.COLOR_BGR2HSV)
    
    # Analyze brightness
    brightness1 = np.mean(img1_gray)
    brightness2 = np.mean(img2_gray)
    brightness_ratio = brightness2 / brightness1 if brightness1 > 0 else 1.0
    
    # Analyze contrast
    contrast1 = np.std(img1_gray)
    contrast2 = np.std(img2_gray)
    contrast_ratio = contrast2 / contrast1 if contrast1 > 0 else 1.0
    
    # Analyze saturation
    saturation1 = np.mean(img1_hsv[:,:,1])
    saturation2 = np.mean(img2_hsv[:,:,1])
    saturation_ratio = saturation2 / saturation1 if saturation1 > 0 else 1.0
    
    # Analyze color temperature (blue vs yellow shift)
    b1, g1, r1 = cv2.split(img1)
    b2, g2, r2 = cv2.split(img2)
    
    warmth1 = np.mean(r1) - np.mean(b1)
    warmth2 = np.mean(r2) - np.mean(b2)
    warmth_shift = warmth2 - warmth1
    
    # Analyze sharpness (edge detection)
    edges1 = cv2.Canny(img1_gray, 100, 200)
    edges2 = cv2.Canny(img2_gray, 100, 200)
    sharpness1 = np.sum(edges1)
    sharpness2 = np.sum(edges2)
    sharpness_ratio = sharpness2 / sharpness1 if sharpness1 > 0 else 1.0
    
    analysis = {
        "brightness": {
            "image1": float(brightness1),
            "image2": float(brightness2),
            "ratio": float(brightness_ratio),
            "change_percent": float((brightness_ratio - 1.0) * 100)
        },
        "contrast": {
            "image1": float(contrast1),
            "image2": float(contrast2),
            "ratio": float(contrast_ratio),
            "change_percent": float((contrast_ratio - 1.0) * 100)
        },
        "saturation": {
            "image1": float(saturation1),
            "image2": float(saturation2),
            "ratio": float(saturation_ratio),
            "change_percent": float((saturation_ratio - 1.0) * 100)
        },
        "sharpness": {
            "image1": float(sharpness1),
            "image2": float(sharpness2),
            "ratio": float(sharpness_ratio),
            "change_percent": float((sharpness_ratio - 1.0) * 100)
        },
        "warmth_shift": float(warmth_shift)
    }
    
    return analysis


def create_preset_from_analysis(analysis):
    """Create a preset configuration from the analysis."""
    
    preset = {
        "name": "Misty Atmospheric",
        "description": "Creates a soft, misty, atmospheric look",
        "adjustments": {
            "brightness": max(0.5, min(2.0, analysis["brightness"]["ratio"])),
            "contrast": max(0.5, min(2.0, analysis["contrast"]["ratio"])),
            "saturation": max(0.0, min(2.0, analysis["saturation"]["ratio"])),
            "blur_radius": 1.5,  # Slight blur for atmospheric effect
            "vignette_strength": 0.15,
            "color_temperature": "cooler" if analysis["warmth_shift"] < 0 else "warmer",
            "temperature_shift": float(analysis["warmth_shift"])
        }
    }
    
    return preset


def apply_preset(input_image_path, output_image_path, preset):
    """Apply a preset to an image."""
    
    # Open image with PIL
    img = Image.open(input_image_path)
    
    # Apply brightness
    brightness_factor = preset["adjustments"]["brightness"]
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(brightness_factor)
    
    # Apply contrast
    contrast_factor = preset["adjustments"]["contrast"]
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(contrast_factor)
    
    # Apply saturation
    saturation_factor = preset["adjustments"]["saturation"]
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(saturation_factor)
    
    # Apply slight blur for atmospheric effect
    blur_radius = preset["adjustments"]["blur_radius"]
    if blur_radius > 0:
        img = img.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    
    # Apply color temperature shift
    if abs(preset["adjustments"]["temperature_shift"]) > 1:
        img_array = np.array(img)
        shift = preset["adjustments"]["temperature_shift"] / 255.0
        
        if shift < 0:  # Cooler (more blue)
            img_array[:,:,2] = np.clip(img_array[:,:,2] - shift * 30, 0, 255)  # Increase blue
            img_array[:,:,0] = np.clip(img_array[:,:,0] + shift * 30, 0, 255)  # Decrease red
        else:  # Warmer (more yellow/red)
            img_array[:,:,0] = np.clip(img_array[:,:,0] + shift * 30, 0, 255)  # Increase red
            img_array[:,:,2] = np.clip(img_array[:,:,2] - shift * 30, 0, 255)  # Decrease blue
        
        img = Image.fromarray(img_array.astype('uint8'))
    
    # Save the result
    img.save(output_image_path, quality=95)
    print(f"Processed image saved to: {output_image_path}")


def main():
    parser = argparse.ArgumentParser(description='Analyze and apply image presets')
    parser.add_argument('--analyze', action='store_true', help='Analyze two images')
    parser.add_argument('--apply', action='store_true', help='Apply preset to an image')
    parser.add_argument('--image1', help='First image (or source image)')
    parser.add_argument('--image2', help='Second image (target style)')
    parser.add_argument('--preset', help='Preset file (JSON)')
    parser.add_argument('--output', help='Output image path')
    
    args = parser.parse_args()
    
    if args.analyze:
        if not args.image1 or not args.image2:
            print("Error: --analyze requires --image1 and --image2")
            return
        
        print(f"Analyzing differences between:\n  Image 1: {args.image1}\n  Image 2: {args.image2}\n")
        
        analysis = analyze_image_differences(args.image1, args.image2)
        
        print("Analysis Results:")
        print(json.dumps(analysis, indent=2))
        
        preset = create_preset_from_analysis(analysis)
        
        print("\nGenerated Preset:")
        print(json.dumps(preset, indent=2))
        
        # Save preset
        preset_path = "misty_atmospheric_preset.json"
        with open(preset_path, 'w') as f:
            json.dump(preset, f, indent=2)
        print(f"\nPreset saved to: {preset_path}")
        
    elif args.apply:
        if not args.image1 or not args.preset or not args.output:
            print("Error: --apply requires --image1 (source), --preset, and --output")
            return
        
        with open(args.preset, 'r') as f:
            preset = json.load(f)
        
        print(f"Applying preset to: {args.image1}")
        apply_preset(args.image1, args.output, preset)
        
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
