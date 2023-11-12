import { readFileSync, writeFileSync } from 'fs';
import { askQuestion }from './main.js';

export async function processFile(filePath = 'src/core/instructions.txt', createFile = true) {
    try {
        const fileToRead = process.argv[2] || filePath;
        const data = readFileSync(fileToRead, 'utf8');
        const answer = await askQuestion(data);
        console.log('GPT:\n', answer);

        if (createFile) {
            const fileName = `src/core/output_hooks/${Math.random().toString(36).substring(7)}.js`;
            writeFileSync(fileName, answer);
        }
    } catch (err) {
        console.error(err);
    }
}

processFile();