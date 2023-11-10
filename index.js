const express = require('express');
const multer = require('multer');
const { OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configure Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize OpenAI
const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY });

// Define the main route for uploading and explaining memes
app.post('/explainthismeme', upload.single('meme'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer.toString('base64');

    // Create a message for OpenAI's GPT-4 model
    const message = [
      {
        role: 'user',
        content: [
          { type: 'text', text: req.body.explain ? 'Explain this meme:' : 'What’s in this image?' },
          { type: 'image', image: { base64: imageBuffer } },
        ],
      },
    ];

    // Make a request to OpenAI
    const response = await openai.chat.create({
      model: 'gpt-4.0-turbo',
      messages: message,
    });

    // Send the AI response as JSON
    res.json({ explanation: response.choices[0].message.content[0].content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the meme.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
