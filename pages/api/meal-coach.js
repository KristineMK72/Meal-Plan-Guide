import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function safeParseJSON(text) {
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
      household = "",
      notes = "",
    } = req.body || {};

    const prompt = `
You are a practical meal-planning assistant.

Create a realistic ${days}-day meal plan for this person.

User preferences:
- Goal: ${goal}
- Daily calories target: ${calories || "not specified"}
- Daily protein target: ${protein || "not specified"}
- Dislikes: ${dislikes || "none"}
- Allergies/restrictions: ${allergies || "none"}
- Budget: ${budget || "not specified"}
- Household size: ${household || "not specified"}
- Extra notes: ${notes || "none"}

Rules:
- Keep meals realistic and easy to grocery shop for.
- Reuse ingredients when possible to reduce cost and waste.
- Include breakfast, lunch, dinner, and 1-2 snack ideas each day.
- Include brief prep guidance.
- Avoid medical claims.
- Return VALID JSON ONLY.
- Do not wrap the JSON in markdown fences.

Use this exact shape:
{
  "title": "string",
  "summary": "string",
  "days": [
    {
      "day": 1,
      "breakfast": "string",
      "lunch": "string",
      "dinner": "string",
      "snacks": ["string", "string"],
      "estimated_macros": {
        "calories": "string",
        "protein": "string",
        "carbs": "string",
        "fat": "string"
      },
      "prep_tip": "string"
    }
  ],
  "shopping_list": {
    "proteins": ["string"],
    "vegetables": ["string"],
    "fruits": ["string"],
    "grains_and_starches": ["string"],
    "dairy_or_alternatives": ["string"],
    "pantry": ["string"]
  }
}
`;

    const response = await client.responses.create({
      model: "gpt-5.4",
      input: prompt,
    });

    const text = response.output_text || "";
    const parsed = safeParseJSON(text);

    if (!parsed) {
      return res.status(200).json({
        warning: "The model returned text instead of clean JSON.",
        raw: text,
      });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("meal-coach error:", error);
    return res.status(500).json({
      error: "Failed to generate meal plan",
      details: error?.message || "Unknown error",
    });
  }
}
