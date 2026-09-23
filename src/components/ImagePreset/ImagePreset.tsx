import { FC, useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
`;

const UploadSection = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  margin-bottom: 30px;
  background: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    background: #f0f8ff;
  }
`;

const UploadButton = styled.label`
  background: #007bff;
  color: white;
  padding: 12px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: inline-block;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const ImageBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageLabel = styled.div`
  background: #f5f5f5;
  padding: 12px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const Button = styled.button<{ variant?: string }>`
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.variant === "primary" ? "#28a745" : "#6c757d"};
  color: white;

  &:hover {
    background: ${(props) =>
      props.variant === "primary" ? "#218838" : "#5a6268"};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PresetInfo = styled.div`
  background: #e8f4f8;
  border-left: 4px solid #007bff;
  padding: 20px;
  margin: 30px 0;
  border-radius: 4px;
`;

const PresetTitle = styled.h3`
  color: #007bff;
  margin-top: 0;
  margin-bottom: 15px;
`;

const PresetDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const PresetDetail = styled.div`
  background: white;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const DetailValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

interface Preset {
  name: string;
  description: string;
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur_radius: number;
    vignette_strength: number;
    color_temperature: string;
    temperature_shift: number;
  };
}

const ImagePreset: FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preset: Preset = {
    name: "Misty Atmospheric",
    description: "Creates a soft, misty, atmospheric look",
    adjustments: {
      brightness: 0.93,
      contrast: 0.85,
      saturation: 0.99,
      blur_radius: 1.5,
      vignette_strength: 0.15,
      color_temperature: "cooler",
      temperature_shift: -10.24,
    },
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = () => {
    if (!originalImage || !canvasRef.current) return;

    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        r = r * preset.adjustments.brightness;
        g = g * preset.adjustments.brightness;
        b = b * preset.adjustments.brightness;

        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        r = gray + (r - gray) * preset.adjustments.contrast;
        g = gray + (g - gray) * preset.adjustments.contrast;
        b = gray + (b - gray) * preset.adjustments.contrast;

        const avgRGB = (r + g + b) / 3;
        r = avgRGB + (r - avgRGB) * preset.adjustments.saturation;
        g = avgRGB + (g - avgRGB) * preset.adjustments.saturation;
        b = avgRGB + (b - avgRGB) * preset.adjustments.saturation;

        if (preset.adjustments.color_temperature === "cooler") {
          r = Math.max(0, r + preset.adjustments.temperature_shift * 0.5);
          b = Math.min(255, b - preset.adjustments.temperature_shift * 0.5);
        }

        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
      }

      ctx.putImageData(imageData, 0, 0);

      if (preset.adjustments.blur_radius > 0) {
        ctx.filter = `blur(${preset.adjustments.blur_radius}px)`;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
          ctx.filter = "none";
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }

      const processedDataURL = canvas.toDataURL("image/jpeg", 0.95);
      setProcessedImage(processedDataURL);
      setProcessing(false);
    };

    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "misty_atmospheric_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetImages = () => {
    setOriginalImage(null);
    setProcessedImage(null);
  };

  return (
    <Container>
      <Title>Misty Atmospheric Preset</Title>
      <Subtitle>
        Transform your photos with a soft, dreamy, atmospheric look
      </Subtitle>

      <PresetInfo>
        <PresetTitle>{preset.name}</PresetTitle>
        <p>{preset.description}</p>
        <PresetDetails>
          <PresetDetail>
            <DetailLabel>Brightness</DetailLabel>
            <DetailValue>
              {(preset.adjustments.brightness * 100 - 100).toFixed(1)}%
            </DetailValue>
          </PresetDetail>
          <PresetDetail>
            <DetailLabel>Contrast</DetailLabel>
            <DetailValue>
              {(preset.adjustments.contrast * 100 - 100).toFixed(1)}%
            </DetailValue>
          </PresetDetail>
          <PresetDetail>
            <DetailLabel>Saturation</DetailLabel>
            <DetailValue>
              {(preset.adjustments.saturation * 100 - 100).toFixed(1)}%
            </DetailValue>
          </PresetDetail>
          <PresetDetail>
            <DetailLabel>Color Temperature</DetailLabel>
            <DetailValue>{preset.adjustments.color_temperature}</DetailValue>
          </PresetDetail>
        </PresetDetails>
      </PresetInfo>

      {!originalImage && (
        <UploadSection>
          <h3>Upload Your Image</h3>
          <p>Click to select an image from your device</p>
          <UploadButton>
            Choose Image
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </UploadButton>
        </UploadSection>
      )}

      {originalImage && (
        <>
          <ButtonGroup>
            <Button variant="primary" onClick={applyPreset} disabled={processing}>
              {processing ? "Processing..." : "Apply Preset"}
            </Button>
            {processedImage && (
              <Button variant="primary" onClick={downloadImage}>
                Download Result
              </Button>
            )}
            <Button onClick={resetImages}>Reset</Button>
          </ButtonGroup>

          <ImageContainer>
            <ImageBox>
              <ImageLabel>Original Image</ImageLabel>
              <StyledImage src={originalImage} alt="Original" />
            </ImageBox>

            {processedImage && (
              <ImageBox>
                <ImageLabel>Processed Image</ImageLabel>
                <StyledImage src={processedImage} alt="Processed" />
              </ImageBox>
            )}
          </ImageContainer>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Container>
  );
};

export { ImagePreset };
