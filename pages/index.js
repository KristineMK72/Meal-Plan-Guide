// /pages/index.js
import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.8 }}>
            
            <h1 style={{ textAlign: "center", color: "#1845AD" }}>
                Fueling Performance: Low-Carb, High-Protein Guide
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: "3rem", color: "#666" }}>
                Discover the science-backed benefits of shifting your diet toward protein and healthy fats.
            </p>

            {/* Benefit Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <Link href="/meal-plan" style={{ padding: '0.75rem 1.5rem', background: '#1845AD', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    View 7-Day Meal Plan 🍽️
                </Link>
                <Link href="/shoplist" style={{ padding: '0.75rem 1.5rem', background: '#00b386', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Get Shopping List 🛒
                </Link>
            </div>

            <hr />

            <h2 style={{ color: "#333", marginTop: "2rem" }}>Benefits of Low-Carb, High-Protein (LCHP)</h2>
            <p>
                A well-formulated LCHP diet prioritizes **protein**, which is vital for building and repairing tissues, and healthy **fats** (like those from avocado and nuts) for sustained energy. By significantly reducing dietary carbohydrates, the body may enter a state known as **ketosis** or simply rely on fat as the primary fuel source.
            </p>

            <h3 style={{ color: "#1845AD" }}>Key Advantages:</h3>
            <ul>
                <li>
                    <strong>Sustained Energy & Focus:</strong> Replacing unstable sugar-based energy with fat and protein can lead to more stable blood sugar levels, preventing energy crashes.
                </li>
                <li>
                    <strong>Increased Satiety:</strong> Protein is the most satiating macronutrient. High intake helps reduce hunger hormones, making it easier to manage portion sizes.
                </li>
                <li>
                    <strong>Body Composition:</strong> A high-protein intake helps preserve **lean muscle mass** during caloric deficits, ensuring weight loss comes primarily from fat.
                </li>
            </ul>

            <h2 style={{ color: "#333" }}>Sources and Further Reading</h2>
            <blockquote style={{ borderLeft: '4px solid #ccc', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic' }}>
                <p>— **Source 1 (Metabolism):** Dietary protein intake is associated with reduced body fat and improved satiety. (e.g., *Schoeller, D.A., and A.M. Buchholz, 2005*)</p>
                <p>— **Source 2 (Weight Management):** Low-carbohydrate diets are effective for weight loss and cardiovascular risk factors, at least in the short term. (e.g., *Volek, J.S., and R.D. Feinman, 2008*)</p>
                <p>— **Source 3 (Appetite Control):** The role of protein in energy balance and body weight regulation. (e.g., *Halton, T.L., and F.B. Hu, 2004*)</p>
            </blockquote>

            <p style={{ fontSize: '0.9rem', color: '#888' }}>
                *Note: Always consult a healthcare professional or registered dietitian before starting any new diet plan.*
            </p>
        </main>
    );
}
