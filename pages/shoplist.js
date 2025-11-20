// /pages/shoplist.js
import React from 'react';

// Shopping List Data
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

export default function ShopList() {
    return (
        <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
            <h1
                style={{
                    textAlign: "center",
                    background: "#333",
                    color: "white",
                    padding: "1.2rem",
                    borderRadius: "12px",
                    fontSize: "1.8rem",
                    marginBottom: "2rem",
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
