// /pages/meal-plan.js
// No imports needed beyond React if you are not using 'next/image'
import React from 'react';

export default function MealPlan() {
  const days = [
    {
      day: "Day 1",
      breakfast: "Greek yogurt + berries + chia",
      lunch: "Grilled chicken salad",
      dinner: "Salmon + asparagus + avocado",
    },
    {
      day: "Day 2",
      breakfast: "Spinach & feta omelet",
      lunch: "Turkey lettuce wraps",
      dinner: "Beef taco bowl (no tortilla)",
    },
    {
      day: "Day 3",
      breakfast: "Protein smoothie",
      lunch: "Tuna salad bowl",
      dinner: "Chicken thighs + green beans",
    },
    {
      day: "Day 4",
      breakfast: "Eggs + turkey sausage",
      lunch: "Shrimp salad",
      dinner: "Pork chops + broccoli",
    },
    {
      day: "Day 5",
      breakfast: "Greek yogurt + nuts",
      lunch: "Chicken Caesar salad",
      dinner: "Steak + mushrooms + salad",
    },
    {
      day: "Day 6",
      breakfast: "Eggs + cottage cheese",
      lunch: "Egg salad lettuce wraps",
      dinner: "Cod + Brussels sprouts",
    },
    {
      day: "Day 7",
      breakfast: "Protein pancakes",
      lunch: "Leftover protein bowl",
      dinner: "Turkey meatballs + zucchini noodles",
    },
  ];

  const shoppingList = {
    Proteins: [
      "Chicken breasts/thighs",
      "Salmon & Cod",
      "Lean ground beef/turkey",
      "Shrimp",
      "Eggs, Canned tuna",
      "Cottage cheese, Greek yogurt",
      "Protein powder",
    ],
    Vegetables: [
      "Asparagus & Broccoli",
      "Spinach & Romaine",
      "Green beans",
      "Brussels sprouts",
      "Zucchini & Mushrooms",
      "Avocados",
    ],
    Fruits: ["Mixed Berries (low-carb)"],
    Pantry: [
      "Olive oil, Mayo",
      "Chia seeds",
      "Almonds & Walnuts",
      "Low-carb salsa/marinara",
      "Seasonings",
    ],
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
              {/* Note: Icons assumed to be in public/icons/ */}
              <img src="/icons/breakfast.png" width="32" height="32" alt="Breakfast Icon" style={{ borderRadius: "50%" }} />
              <p><strong>Breakfast:</strong> {d.breakfast}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <img src="/icons/lunch.png" width="32" height="32" alt="Lunch Icon" style={{ borderRadius: "50%" }} />
              <p><strong>Lunch:</strong> {d.lunch}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src="/icons/dinner.png" width="32" height="32" alt="Dinner Icon" style={{ borderRadius: "50%" }} />
              <p><strong>Dinner:</strong> {d.dinner}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping List Banner */}
      <h1
        style={{
          textAlign: "center",
          marginTop: "3rem",
          background: "#333",
          color: "white",
          padding: "1rem",
          borderRadius: "10px",
          fontSize: "1.6rem",
        }}
      >
        🛒 Weekly Shopping List
      </h1>

      {/* Shopping List Grid */}
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginTop: "1.5rem",
        }}
      >
        {Object.entries(shoppingList).map(([category, items], idx) => (
          <div
            key={idx}
            style={{
              background: "#f0f0f0",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ color: "#333", borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>{category}</h3>
            <ul style={{ listStyle: "none", paddingLeft: "0", marginTop: "0.5rem" }}>
              {items.map((item, i) => (
                <li key={i} style={{ marginBottom: "0.3rem" }}>
                  <span style={{ color: "#1845AD" }}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
