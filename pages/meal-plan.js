// /pages/meal-plan.js
import React from 'react';

// NOTE: Replace these URLs with your actual image links!
const BREAKFAST_ICON_URL = "https://i.imgur.com/breakfast-icon.png";
const LUNCH_ICON_URL = "https://i.imgur.com/lunch-icon.png";
const DINNER_ICON_URL = "https://i.imgur.com/dinner-icon.png";

export default function MealPlan() {
  const days = [
    {
      day: "Day 1",
      breakfast: "Greek yogurt + berries + chia",
      lunch: "Grilled chicken salad",
      dinner: "Salmon + asparagus + avocado",
    },
    // ... (rest of the days array is unchanged)
    {
      day: "Day 7",
      breakfast: "Protein pancakes",
      lunch: "Leftover protein bowl",
      dinner: "Turkey meatballs + zucchini noodles",
    },
  ];

  const shoppingList = {
    // ... (shoppingList object is unchanged)
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1
        style={{
          textAlign: "center",
          background: "#1845AD",
          color: "white",
          padding: "1.2rem",
          borderRadius: "12px",
          fontSize: "1.8rem",
          marginBottom: "2rem",
        }}
      >
        7-Day High-Protein, Low-Carb Meal Plan
      </h1>

      {/* Meal Plan Days */}
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {days.map((d, index) => (
          <div
            key={index}
            style={{
              padding: "1.5rem",
              borderRadius: "10px",
              background: "#f8faff",
              borderLeft: "5px solid #1845AD",
            }}
          >
            <h2 style={{ color: "#1845AD", marginBottom: "1rem" }}>{d.day}</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <img src={BREAKFAST_ICON_URL} width="32" height="32" alt="Breakfast Icon" style={{ borderRadius: "50%" }} />
              <p><strong>Breakfast:</strong> {d.breakfast}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <img src={LUNCH_ICON_URL} width="32" height="32" alt="Lunch Icon" style={{ borderRadius: "50%" }} />
              <p><strong>Lunch:</strong> {d.lunch}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src={DINNER_ICON_URL} width="32" height="32" alt="Dinner Icon" style={{ borderRadius: "50%" }} />
              <p><strong>Dinner:</strong> {d.dinner}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping List Banner and Grid code is unchanged and omitted for brevity */}
    </main>
  );
}
