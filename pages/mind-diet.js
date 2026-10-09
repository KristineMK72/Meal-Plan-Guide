// /pages/mind-diet.js
import React from 'react';

export default function MindDiet() {
    return (
        <main className="page-padding" style={{ maxWidth: "900px", lineHeight: 1.8 }}>

            <h1 style={{ textAlign: "center", color: "#8460F0", marginBottom: "0.5rem", fontSize: "1.6rem", lineHeight: 1.3 }}>
                Nourish Your Mind: The Anti-Inflammatory Diet
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.05rem", color: "#666", marginBottom: "2rem" }}>
                A dietary approach designed to support cognitive function and mood.
            </p>

            <h2 style={{ color: "#333", fontSize: "1.3rem" }}>Understanding the Gut-Brain Axis</h2>
            <p>
                The <strong>Gut-Brain Axis</strong> is a constant two-way street of communication between your digestive system and your brain. A healthy, diverse gut microbiome (the community of bacteria in your gut) produces crucial neurotransmitters and reduces systemic inflammation, which directly supports good mental health and clear cognition.
            </p>

            <h2 style={{ color: "#333", marginTop: "2rem", fontSize: "1.3rem" }}>MIND Diet Principles</h2>
            <p>
                The <strong>MIND (Mediterranean-DASH Intervention for Neurodegenerative Delay) diet</strong> is a hybrid of two established heart-healthy diets, tailored to maximize brain benefits by focusing on anti-inflammatory foods.
            </p>

           <div className="two-col-grid" style={{ marginTop: '2rem' }}>
                <div>
                    <h3 style={{ color: '#00b386' }}>✅ Foods to Embrace (Brain Boosters)</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li><strong>Green Leafy Vegetables:</strong> Daily (Spinach, Kale)</li>
                        <li><strong>Berries:</strong> At least twice a week (Blueberries, Strawberries)</li>
                        <li><strong>Nuts:</strong> Daily (Walnuts, Almonds)</li>
                        <li><strong>Olive Oil:</strong> Use as the primary cooking oil</li>
                        <li><strong>Fish (Oily):</strong> At least once a week (Salmon, Mackerel)</li>
                        <li><strong>Poultry:</strong> Twice a week</li>
                    </ul>
                </div>
                <div>
                    <h3 style={{ color: '#ff6347' }}>❌ Foods to Limit (Cognitive Drainers)</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li><strong>Red Meat:</strong> &lt; 4 servings per week</li>
                        <li><strong>Butter/Margarine:</strong> &lt; 1 tablespoon per day</li>
                        <li><strong>Cheese:</strong> &lt; 1 serving per week</li>
                        <li><strong>Sweets/Pastries:</strong> &lt; 5 servings per week</li>
                        <li><strong>Fried/Fast Food:</strong> &lt; 1 serving per week</li>
                    </ul>
                </div>
            </div>

            <h2 style={{ color: "#8460F0", marginTop: "3rem", fontSize: "1.3rem" }}>Sample MIND Diet Day</h2>
            <div style={{ background: '#f5f5ff', padding: '1.25rem', borderRadius: '10px' }}>
                <p><strong>Breakfast:</strong> Oatmeal with mixed berries and walnuts.</p>
                <p><strong>Lunch:</strong> Large spinach salad with chicken breast, olive oil dressing, and slivered almonds.</p>
                <p><strong>Dinner:</strong> Baked salmon with a side of steamed broccoli and a small serving of brown rice.</p>
                <p style={{ marginBottom: 0 }}><strong>Snack:</strong> Small apple and a handful of mixed nuts.</p>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '2rem' }}>
                *Note: This diet is intended for cognitive support. Always consult a healthcare professional or registered dietitian before starting any new diet plan.*
            </p>
        </main>
    );
}
