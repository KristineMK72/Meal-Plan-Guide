// /pages/shoplist.js
import React from 'react';

const highProteinList = {
    Proteins: [
        "Chicken breasts/thighs", "Salmon & Cod", "Lean ground beef/turkey",
        "Shrimp", "Eggs, Canned tuna", "Cottage cheese, Greek yogurt", "Protein powder",
    ],
    Vegetables: [
        "Asparagus & Broccoli", "Spinach & Romaine", "Green beans",
        "Brussels sprouts", "Zucchini & Mushrooms", "Avocados",
    ],
    Fruits: ["Mixed Berries (low-carb)"],
    Pantry: [
        "Olive oil, Mayo", "Chia seeds", "Almonds & Walnuts",
        "Low-carb salsa/marinara", "Seasonings",
    ],
};

const mindDietList = {
    "Brain Boosters": [
        "Oily Fish (Salmon, Tuna, Mackerel)", "Blueberries & Strawberries",
        "Walnuts, Pecans, Almonds", "Dark Chocolate (70%+ cacao)",
    ],
    "Greens & Oils": [
        "Kale, Spinach, Collard Greens", "Broccoli, Cauliflower",
        "Extra Virgin Olive Oil", "Avocado Oil",
    ],
    "Grains & Pulses": [
        "Oatmeal, Whole Wheat Bread", "Brown Rice, Quinoa", "Lentils, Beans",
    ],
    "Spices & Herbs": [
        "Turmeric, Ginger (Anti-inflammatory)", "Rosemary, Oregano",
    ],
};

const ShoppingListCard = ({ category, items, color }) => (
    <div
        style={{
            background: color,
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
    >
        <h3 style={{ color: "#333", borderBottom: "2px solid #ccc", paddingBottom: "0.5rem", marginTop: 0 }}>{category}</h3>
        <ul style={{ listStyle: "none", paddingLeft: "0", marginTop: "0.5rem" }}>
            {items.map((item, i) => (
                <li key={i} style={{ marginBottom: "0.3rem" }}>
                    <span style={{ color: "#1845AD" }}>•</span> {item}
                </li>
            ))}
        </ul>
    </div>
);

export default function ShopList() {
    return (
        <main className="page-padding">

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
                🛒 Your Weekly Shopping Lists
            </h1>

            <h2 style={{ color: "#1845AD", textAlign: "center", borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginTop: '2rem', fontSize: '1.25rem' }}>
                High-Protein / Low-Carb List
            </h2>
            <div className="main-grid">
                {Object.entries(highProteinList).map(([category, items], idx) => (
                    <ShoppingListCard key={idx} category={category} items={items} color="#eef2ff" />
                ))}
            </div>

            <h2 style={{ color: "#8460F0", textAlign: "center", borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginTop: '3rem', fontSize: '1.25rem' }}>
                MIND Diet (Mental Health) List
            </h2>
            <div className="main-grid">
                {Object.entries(mindDietList).map(([category, items], idx) => (
                    <ShoppingListCard key={idx} category={category} items={items} color="#f0e9ff" />
                ))}
            </div>
        </main>
    );
}
