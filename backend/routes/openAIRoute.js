import express from "express";
import * as dotenv from "dotenv";
const router = express.Router();
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/', (req, res) => {
    res.send('Hello from OpenAI Router!');
  });

router.post('/', async (req, res) => {
  try{

    const prompt =req.body.prompt;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0,
    })
    res.status(200).send({
        aiResponse: response.data.choices[0].text
    })
}catch(error){
    console.log(error);
    res.status(500).send({error});
}
})
  
export default router;
