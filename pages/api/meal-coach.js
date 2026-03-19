import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      goal = "high-protein",
      days = 7,
      calories = "",
      protein = "",
      dislikes = "",
      allergies = "",
      budget = "",
      notes = "",
    } = req.body || {};

    const prompt = `
You are a helpful meal planner.

Create a ${days}-day meal plan.

User preferences:
- Goal: ${goal}
- Calories: ${calories || "not specified"}
- Protein: ${protein || "not specified"}
- Dislikes: ${dislikes || "none"}
- Allergies: ${allergies || "none"}
- Budget: ${budget || "not specified"}
- Notes: ${notes || "none"}

Rules:
- Keep meals simple and realistic
- Reuse ingredients when possible
- Include breakfast, lunch, dinner, snacks
- Include prep tips
- Return ONLY valid JSON (no markdown)

Use this format:
{
  "title": "string",
  "days": [
    {
      "day": 1,
      "breakfast": "string",
      "lunch": "string",
      "dinner": "string",
      "snacks": ["string"],
      "prep_tip": "string"
    }
  ],
  "shopping_list": {
    "proteins": ["string"],
    "vegetables": ["string"],
    "pantry": ["string"]
  }
}
`;

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: prompt,
    });

    const text = response.output_text || "";
    const parsed = safeParse(text);

    if (!parsed) {
      return res.status(200).json({
        error: "AI response was not valid JSON",
        raw: text,
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Meal API error:", err);
    return res.status(500).json({
      error: "Failed to generate meal plan",
    });
  }
}
