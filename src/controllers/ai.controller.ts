import { Request, Response } from "express";
import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const financeChat = async (req: Request, res: Response) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 🔥 VERY STRONG & SAFE PROMPT
    const prompt = `
You are a senior personal finance advisor.

IMPORTANT INSTRUCTIONS (DO NOT IGNORE):
- Answer ONLY in English
- Your answer MUST be complete
- Do NOT stop mid sentence
- Do NOT give partial numbers
- Use clear calculations
- Use the exact data provided
- Finish with a conclusion

USER QUESTION:
${question}

USER FINANCIAL DATA:
${context || "No financial data provided"}

YOU MUST FOLLOW THIS STRUCTURE EXACTLY:

1. Financial Overview
- Restate income, expenses, savings, and remaining balance clearly.

2. Expense Analysis
- Explain where money is going and what can be improved.

3. Step-by-Step Savings Plan
- Provide numbered actionable steps.

4. Monthly Savings Calculation
- Show calculations clearly using numbers.

5. Final Conclusion
- Short, motivating summary.

DO NOT END RESPONSE UNTIL ALL 5 SECTIONS ARE COMPLETED.
`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.25,      // 🔑 very focused
        maxOutputTokens: 1500,  // 🔑 enough space
        topP: 0.8,
      },
    };

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

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
