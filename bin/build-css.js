import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import postcss from 'postcss';
import tailwindcssPostcss from '@tailwindcss/postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = join(__dirname, '../resources/css/index.css');
const outputFile = join(__dirname, '../resources/dist/filament-autograph.css');

async function buildCSS() {
    try {
        const css = readFileSync(inputFile, 'utf8');

        const result = await postcss([
            tailwindcssPostcss
        ]).process(css, {
            from: inputFile,
            to: outputFile,
        });

        writeFileSync(outputFile, result.css);
        console.log('CSS built successfully!');
    } catch (error) {
        console.error('Error building CSS:', error);
        process.exit(1);
    }
}

buildCSS(); 