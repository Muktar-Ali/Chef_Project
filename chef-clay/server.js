import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { InferenceClient } from "@huggingface/inference";


const PORT = 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

const client = new InferenceClient(process.env.HF_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
 Format your response in markdown to make it easier to render to a web page
`;
app.post('/api/recipe', async (req, res) => {
  const ingredientsArr = req.body.ingredients;
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await client.chatCompletion({
      model: "moonshotai/Kimi-K2-Thinking:novita",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_new_tokens: 1024
    });
    const recipe = response.choices?.[0]?.message?.content || "No recipe found.";
    res.json({ recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
