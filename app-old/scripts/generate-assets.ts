import { PNG } from 'pngjs';
import fs from 'fs';

const SKY = { r: 14, g: 165, b: 233 };
const WHITE = { r: 255, g: 255, b: 255 };
const SLATE_50 = { r: 248, g: 250, b: 252 };
const SLATE_200 = { r: 226, g: 232, b: 240 };

function fillRect(
  png: PNG,
  x: number,
  y: number,
  w: number,
  h: number,
  color: { r: number; g: number; b: number }
) {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      if (px < 0 || px >= png.width || py < 0 || py >= png.height) continue;
      const idx = (png.width * py + px) << 2;
      png.data[idx] = color.r;
      png.data[idx + 1] = color.g;
      png.data[idx + 2] = color.b;
      png.data[idx + 3] = 255;
    }
  }
}

function roundedRect(
  png: PNG,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  color: { r: number; g: number; b: number }
) {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      const dx = Math.max(0, Math.max(x + r - px, px - (x + w - 1 - r)));
      const dy = Math.max(0, Math.max(y + r - py, py - (y + h - 1 - r)));
      if (dx * dx + dy * dy > r * r) continue;
      if (px < 0 || px >= png.width || py < 0 || py >= png.height) continue;
      const idx = (png.width * py + px) << 2;
      png.data[idx] = color.r;
      png.data[idx + 1] = color.g;
      png.data[idx + 2] = color.b;
      png.data[idx + 3] = 255;
    }
  }
}

function generateOgImage() {
  const width = 1200;
  const height = 630;
  const png = new PNG({ width, height });

  // Gradient-ish background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const t = y / height;
      const idx = (width * y + x) << 2;
      png.data[idx] = Math.round(SLATE_50.r + (SLATE_200.r - SLATE_50.r) * t);
      png.data[idx + 1] = Math.round(SLATE_50.g + (SLATE_200.g - SLATE_50.g) * t);
      png.data[idx + 2] = Math.round(SLATE_50.b + (SLATE_200.b - SLATE_50.b) * t);
      png.data[idx + 3] = 255;
    }
  }

  // Icon background
  roundedRect(png, 80, 80, 160, 160, 32, SKY);
  // Document
  roundedRect(png, 104, 108, 112, 128, 12, WHITE);
  // Lines
  fillRect(png, 120, 136, 80, 10, SKY);
  fillRect(png, 120, 160, 80, 10, SKY);
  fillRect(png, 120, 184, 56, 10, SKY);
  fillRect(png, 120, 208, 72, 10, SKY);

  // CTA button
  roundedRect(png, 80, 520, 240, 56, 28, SKY);

  const buffer = PNG.sync.write(png);
  fs.writeFileSync('public/og-image.png', buffer);
  console.log('Generated public/og-image.png');
}

function generateAppleTouchIcon() {
  const size = 180;
  const png = new PNG({ width: size, height: size });

  roundedRect(png, 0, 0, size, size, 36, SKY);
  const docSize = 100;
  const docX = (size - docSize) / 2;
  const docY = (size - docSize) / 2;
  roundedRect(png, docX, docY, docSize, docSize, 16, WHITE);
  fillRect(png, docX + 18, docY + 28, 64, 8, SKY);
  fillRect(png, docX + 18, docY + 48, 64, 8, SKY);
  fillRect(png, docX + 18, docY + 68, 48, 8, SKY);

  const buffer = PNG.sync.write(png);
  fs.writeFileSync('public/apple-touch-icon.png', buffer);
  console.log('Generated public/apple-touch-icon.png');
}

generateOgImage();
generateAppleTouchIcon();
