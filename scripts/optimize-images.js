import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const inputDir = path.join(__dirname, '..', 'public', 'img');
  const outputDir = inputDir;

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const imagesToOptimize = [
    {
      input: 'compomint-template-support.png',
      outputs: [
        { width: 380, suffix: '-380w', format: 'webp' },
        { width: 760, suffix: '-760w', format: 'webp' },
        { width: 1106, suffix: '-1106w', format: 'webp' },
        { width: 380, suffix: '-380w', format: 'png' },
        { width: 760, suffix: '-760w', format: 'png' },
      ]
    },
    {
      input: 'template-preview.png',
      outputs: [
        { width: 380, suffix: '-380w', format: 'webp' },
        { width: 760, suffix: '-760w', format: 'webp' },
        { width: 1650, suffix: '-1650w', format: 'webp' },
        { width: 380, suffix: '-380w', format: 'png' },
        { width: 760, suffix: '-760w', format: 'png' },
      ]
    },
    {
      input: 'icon.png',
      outputs: [
        { width: 32, suffix: '-32w', format: 'webp' },
        { width: 64, suffix: '-64w', format: 'webp' },
        { width: 128, suffix: '-128w', format: 'webp' },
        { width: 32, suffix: '-32w', format: 'png' },
        { width: 64, suffix: '-64w', format: 'png' },
      ]
    }
  ];

  for (const image of imagesToOptimize) {
    const inputPath = path.join(inputDir, image.input);
    const baseName = path.parse(image.input).name;

    console.log(`Processing ${image.input}...`);

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    console.log(`Original size: ${Math.round(originalStats.size / 1024)} KB`);

    for (const output of image.outputs) {
      const outputFileName = `${baseName}${output.suffix}.${output.format}`;
      const outputPath = path.join(outputDir, outputFileName);

      try {
        let processor = sharp(inputPath)
          .resize(output.width, null, { 
            withoutEnlargement: true,
            fit: 'inside' 
          });

        if (output.format === 'webp') {
          processor = processor.webp({ quality: 80 });
        } else if (output.format === 'png') {
          processor = processor.png({ compressionLevel: 9 });
        }

        await processor.toFile(outputPath);

        // Check new file size
        const newStats = fs.statSync(outputPath);
        const savings = Math.round((1 - newStats.size / originalStats.size) * 100);
        
        console.log(`  ${outputFileName}: ${Math.round(newStats.size / 1024)} KB (${savings}% reduction)`);
      } catch (error) {
        console.error(`Error processing ${outputFileName}:`, error);
      }
    }
  }
}

optimizeImages().catch(console.error);