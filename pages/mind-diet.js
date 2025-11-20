// /pages/mind-diet.js
import React from 'react';

export default function MindDiet() {
    return (
        <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.8 }}>

            <h1 style={{ textAlign: "center", color: "#8460F0", marginBottom: "0.5rem" }}>
                Nourish Your Mind: The Anti-Inflammatory Diet
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#666", marginBottom: "3rem" }}>
                A dietary approach designed to support cognitive function and mood.
            </p>

            <h2 style={{ color: "#333" }}>Understanding the Gut-Brain Axis</h2>
            <p>
                The **Gut-Brain Axis** is a constant two-way street of communication between your digestive system and your brain. A healthy, diverse gut microbiome (the community of bacteria in your gut) produces crucial neurotransmitters and reduces systemic inflammation, which directly supports good mental health and clear cognition. 



            </p>
            
            <h2 style={{ color: "#333", marginTop: "2rem" }}>MIND Diet Principles</h2>
            <p>
                The **MIND (Mediterranean-DASH Intervention for Neurodegenerative Delay) diet** is a hybrid of two established heart-healthy diets, tailored to maximize brain benefits by focusing on anti-inflammatory foods.
            </p>

           <div className="two-col-grid" style={{ marginTop: '2rem' }}>
                <div>
                    <h3 style={{ color: '#00b386' }}>✅ Foods to Embrace (Brain Boosters)</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>**Green Leafy Vegetables:** Daily (Spinach, Kale)</li>
                        <li>**Berries:** At least twice a week (Blueberries, Strawberries)</li>
                        <li>**Nuts:** Daily (Walnuts, Almonds)</li>
                        <li>**Olive Oil:** Use as the primary cooking oil</li>
                        <li>**Fish (Oily):** At least once a week (Salmon, Mackerel)</li>
                        <li>**Poultry:** Twice a week</li>
                    </ul>
                </div>
                <div>
                    <h3 style={{ color: '#ff6347' }}>❌ Foods to Limit (Cognitive Drainers)</h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li>**Red Meat:** &lt; 4 servings per week</li>
                        <li>**Butter/Margarine:** &lt; 1 tablespoon per day</li>
                        <li>**Cheese:** &lt; 1 serving per week</li>
                        <li>**Sweets/Pastries:** &lt; 5 servings per week</li>
                        <li>**Fried/Fast Food:** &lt; 1 serving per week</li>
                    </ul>
                </div>
            </div>

            <h2 style={{ color: "#8460F0", marginTop: "3rem" }}>Sample MIND Diet Day</h2>
            <div style={{ background: '#f5f5ff', padding: '1.5rem', borderRadius: '10px' }}>
                <p><strong>Breakfast:</strong> Oatmeal with mixed berries and walnuts.</p>
                <p><strong>Lunch:</strong> Large spinach salad with chicken breast, olive oil dressing, and slivered almonds.</p>
                <p><strong>Dinner:</strong> Baked salmon with a side of steamed broccoli and a small serving of brown rice.</p>
                <p><strong>Snack:</strong> Small apple and a handful of mixed nuts.</p>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '2rem' }}>
                *Note: This diet is intended for cognitive support. Always consult a healthcare professional or registered dietitian before starting any new diet plan.*
            </p>
        </main>
    );
}
