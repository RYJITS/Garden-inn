import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve(process.cwd(), 'public/images');
const quality = 80;

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const outputPath = fullPath.replace(/\.[^.]+$/i, '.webp');
        try {
          await sharp(fullPath).webp({ quality }).toFile(outputPath);
          console.log(`Converted: ${fullPath} -> ${outputPath}`);
          
          // Verify output exists and has size > 0
          const stat = await fs.stat(outputPath);
          if (stat.size > 0) {
            await fs.unlink(fullPath);
            console.log(`Deleted original: ${fullPath}`);
          }
        } catch (err) {
          console.error(`Failed to process ${fullPath}:`, err.message);
        }
      }
    }
  }
}

async function main() {
  console.log(`Starting image optimization in ${inputDir}`);
  await processDirectory(inputDir);
  console.log('Done!');
}

main().catch(console.error);
