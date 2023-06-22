import express from "express";
import * as dotenv from "dotenv";
const router = express.Router();
import { Configuration, OpenAIApi } from "openai";


dotenv.config();

router.get('/', (req, res) => {
    res.send('Hello from Router!');
  });
  
export default router;
