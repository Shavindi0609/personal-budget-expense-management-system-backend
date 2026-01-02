import { Request, Response } from "express";
import axios from "axios";

// ✅ Gemini 2.5 Flash stable model
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const financeChat = async (req: Request, res: Response) => {
  try {
    const { question, context } = req.body;

    // 🛑 Validation
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 🧠 Prompt (Sinhala + English mix)
    const prompt = `
ඔබ friendly personal finance assistant එකක්.
User Question:
${question}

User Finance Context:
${context || "No additional context provided"}

Give practical advice.
Answer in simple Sinhala + English mix.
`;

    // 📦 Gemini request body
    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 400,
      },
    };

    // 🚀 Call Gemini API
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // 🧾 Extract reply safely
    const reply =
      response.data?.candidates?.[0]?.content?.[0]?.text;

    return res.json({
      success: true,
      reply: reply || "AI response empty",
    });
  } catch (err: any) {
    console.error("❌ Gemini Error:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "AI request failed",
      details: err.response?.data || err.message,
    });
  }
};
