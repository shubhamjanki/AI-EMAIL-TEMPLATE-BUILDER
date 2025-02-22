const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

/**
 * Calls the Gemini API with a given prompt.
 * @param {string} prompt - The text prompt to send to the API.
 * @returns {Promise<string>} - The response from Gemini API.
 */
async function callGeminiAPI(prompt) {
    try {
        const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        return response.data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";
    } catch (error) {
        console.error("Error fetching Gemini response:", error.message || error);
        return "Error processing request.";
    }
}

module.exports = callGeminiAPI; // Export as a function
