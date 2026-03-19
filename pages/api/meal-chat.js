import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, plan } = req.body;

    const systemPrompt = `
You are Morgan, a calm, thoughtful, and practical meal planning coach.

Your personality:
- Warm, grounded, and reassuring
- Lightly witty, never cheesy
- Encouraging but not pushy
- Focused on realistic, sustainable choices

You help with:
- Meal planning
- Budget-friendly food ideas
- Simple recipes
- Ingredient swaps
- Motivation and consistency

Rules:
- Keep answers practical and easy to follow
- Prefer simple meals over complex ones
- Never shame or guilt the user
- Keep tone calm and human
- Keep responses short to medium length (not long lectures)

If giving a recipe:
- Include ingredients
- Include simple steps
- Keep it realistic and quick
`;

    const userContext = `
User message:
${message}

Current meal plan (if any):
${plan ? JSON.stringify(plan) : "none"}
`;

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContext },
      ],
    });

    return res.status(200).json({
      reply: response.output_text,
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: "Failed to get response" });
  }
}
