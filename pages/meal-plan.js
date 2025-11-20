// /pages/meal-plan.js
import React from 'react';
import Link from 'next/link'; 

// ICON URLS: These are pointing to externally hosted images
const BREAKFAST_ICON_URL = "https://img.icons8.com/material-outlined/32/breakfast.png";
const LUNCH_ICON_URL = "https://img.icons8.com/material-outlined/32/lunch.png";
const DINNER_ICON_URL = "https://img.icons8.com/material-outlined/32/dinner.png";

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

    // NOTE: The shoppingList data object has been removed from this file.

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

            {/* Dynamic Link to Shopping List (New Feature) */}
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <Link 
                    href="/shoplist"
                    style={{
                        padding: "1rem 2rem",
                        background: "#00b386", // Green color for Shopping
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        textDecoration: "none", // Remove underline from link
                        display: "inline-block"
                    }}
                >
                    View Full Weekly Shopping List 🛒
                </Link>
            </div>
        </main>
    );
}
