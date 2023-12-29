import { askQuestion } from './core/main.js';

module.exports = {
    handler: async (req, res) => {
        try {
            const question = req.body?.question || req.body?.message;
            const answer = await askQuestion(question);
            return res.send({ answer });
        } catch (e) {
            console.error('Oops something went wrong', e);
            return res.status(500).send({ error: e });
        }
    }
};
