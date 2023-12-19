const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = 4000; // Set the server port to 4000

app.use(bodyParser.json());

// Access the API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

app.post("/send-message", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Call the OpenAI API to generate a response
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Added the model parameter
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    res.json({ message: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error communicating with the OpenAI API" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
