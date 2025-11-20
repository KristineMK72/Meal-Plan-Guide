// /pages/sustainability.js
import React from 'react';
import Link from 'next/link';

export default function Sustainability() {
    return (
        <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", lineHeight: 1.8 }}>
            <h1 style={{ textAlign: "center", color: "#00b386", marginBottom: "0.5rem" }}>
                Human Health and the Sustainability Loop
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#666", marginBottom: "3rem" }}>
                Understanding how personal well-being drives community resilience and economic stability.
            </p>

            <h2 style={{ color: "#333" }}>The Interconnected Pillars of Sustainability</h2>
            <p>
                Sustainability is often seen through an environmental lens, but human health forms the crucial foundation for all other pillars. When individual health declines, it creates a domino effect across society and the economy.
            </p>
            

[Image of Sustainability Three Pillars]


            <h3 style={{ color: "#1845AD" }}>1. Personal Health (The Foundation)</h3>
            <p>
                Access to nourishing food and mental wellness (like explored in the <Link href="/mind-diet">MIND Diet</Link>) is **Human Sustainability**. It ensures individuals have the energy, focus, and physical capacity to engage actively in their lives and work.
            </p>

            <h3 style={{ color: "#8460F0" }}>2. Social Sustainability (The Community)</h3>
            <p>
                A healthy individual contributes positively to their **Social** environment. Strong physical and mental health reduces stress on family members, decreases reliance on social services, and fosters community engagement, volunteering, and productivity. Conversely, widespread chronic illness weakens the social fabric.
            </p>

            <h3 style={{ color: "#00b386" }}>3. Economic Sustainability (The Outcome)</h3>
            <p>
                Social health directly impacts the **Economic** pillar. Healthier populations lead to:
                <ul>
                    <li>**Increased Workforce Productivity:** Fewer sick days and higher cognitive function.</li>
                    <li>**Lower Healthcare Costs:** Reduced prevalence of lifestyle diseases.</li>
                    <li>**Innovation and Growth:** Stable, thriving communities drive economic activity and innovation.</li>
                </ul>
                Investing in personal health is, therefore, a direct investment in the long-term economic stability of a nation.
            </p>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link href="/mind-diet" style={{ padding: '0.75rem 1.5rem', background: '#8460F0', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    See How Diet Supports Brain Health 🧠
                </Link>
            </div>
        </main>
    );
}
