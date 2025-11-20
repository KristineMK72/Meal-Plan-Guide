// /pages/shoplist.js
import React from 'react';

// Shopping List Data (High-Protein/Low-Carb)
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

// NEW Shopping List Data (MIND/Anti-Inflammatory)
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


export default function ShopList() {
    return (
        <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>

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
                🛒 Your Weekly Shopping Lists
            </h1>

            {/* High-Protein/Low-Carb List */}
            <h2 style={{ color: "#1845AD", textAlign: "center", borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginTop: '3rem' }}>
                High-Protein / Low-Carb List
            </h2>
            <div style={listGridStyle}>
                {Object.entries(highProteinList).map(([category, items], idx) => (
                    <ShoppingListCard key={idx} category={category} items={items} color="#eef2ff" />
                ))}
            </div>

            {/* MIND Diet List */}
            <h2 style={{ color: "#8460F0", textAlign: "center", borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginTop: '3rem' }}>
                MIND Diet (Mental Health) List
            </h2>
            <div style={listGridStyle}>
                {Object.entries(mindDietList).map(([category, items], idx) => (
                    <ShoppingListCard key={idx} category={category} items={items} color="#f0e9ff" />
                ))}
            </div>
        </main>
    );
}

// Reusable card component and styles
const ShoppingListCard = ({ category, items, color }) => (
    <div
        style={{
            background: color,
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
);

const listGridStyle = {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    marginTop: "1.5rem",
};
