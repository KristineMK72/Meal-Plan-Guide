// /pages/meal-plan.js
import React from 'react';
import Link from 'next/link';

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

    return (
        <main className="page-padding" style={{ maxWidth: "900px" }}>

            <h1
                style={{
                    textAlign: "center",
                    background: "#1845AD",
                    color: "white",
                    padding: "1.2rem",
                    borderRadius: "12px",
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    lineHeight: 1.3,
                }}
            >
                7-Day High-Protein, Low-Carb Meal Plan
            </h1>

            <div style={{ display: "grid", gap: "1.5rem" }}>
                {days.map((d, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "1.25rem",
                            borderRadius: "10px",
                            background: "#f8faff",
                            borderLeft: "5px solid #1845AD",
                        }}
                    >
                        <h2 style={{ color: "#1845AD", marginBottom: "1rem", fontSize: "1.25rem" }}>{d.day}</h2>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
                            <img src={BREAKFAST_ICON_URL} width="32" height="32" alt="Breakfast" style={{ borderRadius: "50%", flexShrink: 0 }} />
                            <p style={{ margin: 0 }}><strong>Breakfast:</strong> {d.breakfast}</p>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
                            <img src={LUNCH_ICON_URL} width="32" height="32" alt="Lunch" style={{ borderRadius: "50%", flexShrink: 0 }} />
                            <p style={{ margin: 0 }}><strong>Lunch:</strong> {d.lunch}</p>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                            <img src={DINNER_ICON_URL} width="32" height="32" alt="Dinner" style={{ borderRadius: "50%", flexShrink: 0 }} />
                            <p style={{ margin: 0 }}><strong>Dinner:</strong> {d.dinner}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <Link
                    href="/shoplist"
                    style={{
                        padding: "1rem 1.5rem",
                        background: "#00b386",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        textDecoration: "none",
                        display: "inline-block",
                    }}
                >
                    View Full Weekly Shopping List 🛒
                </Link>
            </div>
        </main>
    );
}
