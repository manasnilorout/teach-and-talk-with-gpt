import * as dotenv from "dotenv";
dotenv.config();

import prompt from 'prompt';
import {askQuestion} from './main.js';

// Write code to read question from command line
const doIt = async () => {
    prompt.start();
    const { question } = await prompt.get([{ name: 'question', description: `What's your question?` }]);
    await askQuestion(question);
}

doIt();
