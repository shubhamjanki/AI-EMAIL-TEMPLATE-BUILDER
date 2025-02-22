const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const reminderRoutes = require('./routes/reminderRoutes');
const scheduleReminders = require('./scheduler');
const callGeminiAPI = require('./utils/gemini'); // Modularized Gemini API utility

require('dotenv').config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database
connectDB();

// Routes
app.use('/api/reminders', reminderRoutes);

// Start Scheduler
scheduleReminders();

// Gemini API Integration
 app.get('/api/generate-greeting', (req, res) => {
  res.json({ message: 'Hello, World!' });
 });

app.post('/api/generate-greeting', async (req, res) => {
  const { context } =   req.body;

  if (!context) {
    return res.status(400).json({ error: 'Context is required to generate a greeting.' });
  }

  try {
    const greetingMessage = await callGeminiAPI(`Generate a professional greeting for: ${context}`);
    res.json({ greeting: greetingMessage });
  } catch (error) {
    console.error('Error generating greeting:', error.message || error);
    res.status(500).json({ error: 'Failed to generate greeting message. Please try again.' });
  }
});

app.post('/api/chatbot', async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: 'User input is required to generate a response.' });
  }

  try {
    const chatbotMessage = await callGeminiAPI(`Respond to the following query: ${userInput}`);
    res.json({ response: chatbotMessage });
  } catch (error) {
    console.error('Error generating chatbot response:', error.message || error);
    res.status(500).json({ error: 'Failed to generate chatbot response. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));