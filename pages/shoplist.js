import AppShell from "../components/AppShell";

const highProteinList = {
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

const mindDietList = {
  "Brain Boosters": [
    "Oily Fish (Salmon, Tuna, Mackerel)",
    "Blueberries & Strawberries",
    "Walnuts, Pecans, Almonds",
    "Dark Chocolate (70%+ cacao)",
  ],
  "Greens & Oils": [
    "Kale, Spinach, Collard Greens",
    "Broccoli, Cauliflower",
    "Extra Virgin Olive Oil",
    "Avocado Oil",
  ],
  "Grains & Pulses": ["Oatmeal, Whole Wheat Bread", "Brown Rice, Quinoa", "Lentils, Beans"],
  "Spices & Herbs": ["Turmeric, Ginger (Anti-inflammatory)", "Rosemary, Oregano"],
};

function ListCard({ category, items, tone }) {
  return (
    <div className={`shop-static-card shop-static-card--${tone}`}>
      <h3 style={{ marginTop: 0, borderBottom: "2px solid var(--border)", paddingBottom: 8 }}>
        {category}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0" }}>
        {items.map((item) => (
          <li key={item} style={{ marginBottom: 6 }}>
            <span style={{ color: "var(--accent)" }}>•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ShopList() {
  return (
    <AppShell>
      <section className="glass-dark animate-in" style={{ padding: 24, marginBottom: 28 }}>
        <div className="page-eyebrow" style={{ color: "#7dd3fc" }}>
          Groceries
        </div>
        <h1 className="hero-title-mobile" style={{ margin: "0 0 10px", color: "#f8fafc", fontSize: 36 }}>
          Weekly shopping lists
        </h1>
        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>
          Two ready-made lists — high-protein low-carb, and MIND diet brain support.
        </p>
      </section>

      <h2 className="section-heading">High-Protein / Low-Carb</h2>
      <div className="main-grid" style={{ marginBottom: 36 }}>
        {Object.entries(highProteinList).map(([category, items]) => (
          <ListCard key={category} category={category} items={items} tone="blue" />
        ))}
      </div>

      <h2 className="section-heading section-heading--purple">MIND Diet (Mental Health)</h2>
      <div className="main-grid">
        {Object.entries(mindDietList).map(([category, items]) => (
          <ListCard key={category} category={category} items={items} tone="purple" />
        ))}
      </div>
    </AppShell>
  );
}
