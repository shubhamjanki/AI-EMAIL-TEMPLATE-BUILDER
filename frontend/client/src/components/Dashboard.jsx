import React, { useState } from "react";

const templates = [
  { name: "Birthday", icon: "🎂" },
  { name: "Anniversary", icon: "💍" },
  { name: "Official Greetings", icon: "🏢" },
  { name: "Custom Template", icon: "📝" },
];

const Dashboard = ({ onSelectTemplate }) => {
  const [emailPrompt, setEmailPrompt] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyA_muI9r0gYrERgbYVewOLayoLSNeIJLuU"; // Your original API key

  const handleTextareaChange = (e) => {
    if (generatedEmail) return; // Prevent changes when email is generated
    setEmailPrompt(e.target.value);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      console.log("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const generateEmail = async () => {
    if (!emailPrompt.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: emailPrompt }] }],
          }),
        }
      );

      const data = await response.json();
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setGeneratedEmail(data.candidates[0].content.parts[0].text);
      } else {
        setGeneratedEmail("Failed to generate email. Please try again.");
      }
    } catch (error) {
      console.error("Error generating email:", error);
      setGeneratedEmail("Error occurred while generating email.");
    }
    setLoading(false);
  };

  const resetEmail = () => {
    setEmailPrompt("");
    setGeneratedEmail("");
  };

  return (
    <div className="min-h-screen p-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        AI Email Template Generator X Scheduler
      </h1>

      {/* AI Email Generator */}
      <div className="bg-white/10 p-6 rounded-lg shadow-xl mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">⚡ AI Generation</h2>
        <p className="text-white/80 mb-4">Describe your email, and AI will generate a custom template.</p>

        <textarea
          className="w-full h-16 bg-transparent p-4 border border-white/30 rounded-lg text-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-y-auto"
          placeholder="E.g., Write a professional follow-up email to a client..."
          value={generatedEmail || emailPrompt}
          onChange={handleTextareaChange}
          disabled={!!generatedEmail}
        />

        <div className="flex gap-4 mt-4">
          <button
            className={`w-full p-3 rounded-lg text-lg font-semibold transition-all ${
              emailPrompt && !generatedEmail
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            onClick={generateEmail}
            disabled={!emailPrompt || !!generatedEmail || loading}
          >
            {loading ? "Generating..." : "✨ Generate Email"}
          </button>

          {generatedEmail && (
            <>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white"
              >
                📋 Copy
              </button>
              <button
                onClick={resetEmail}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
              >
                🔄 Reset
              </button>
            </>
          )}
        </div>
      </div>

      {/* Template Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.name}
            onClick={() => onSelectTemplate(template.name)}
            className="cursor-pointer backdrop-blur-lg bg-white/10 hover:bg-white/20 rounded-2xl p-8 text-center shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-white/20"
          >
            <div className="text-6xl mb-4">{template.icon}</div>
            <h3 className="text-xl font-semibold text-white">{template.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
