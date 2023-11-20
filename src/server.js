import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { json, urlencoded } = bodyParser;
import { askQuestion } from './core/main.js';

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.send(`I'm alive`);
});

app.post('/ai/get-answer', async (req, res) => {
    try {
        const question = req.body?.question || req.body?.message;
        const answer = await askQuestion(question);
        return res.send({ answer });
    } catch (e) {
        console.error('Oops something went wrong', e);
        return res.status(500).send({ error: e });
    }
});

app.post('/ai/get-answer-raw', async (req, res) => {
    console.log('req.body', req.body);
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port 3000`);
});