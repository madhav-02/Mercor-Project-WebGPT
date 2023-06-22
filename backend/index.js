import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import openAIRoute from './routes/openAIRoute.js';

const app = express();
const PORT = 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/openai', openAIRoute);

app.get('/', (req, res) => {
    res.send("Welcome to home page");
})

app.listen(process.env.PORT_NO, () => {
    console.log("Application started on PORT-",process.env.PORT_NO);
})
