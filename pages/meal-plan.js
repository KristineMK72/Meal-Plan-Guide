import Link from "next/link";
import AppShell from "../components/AppShell";

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

export default function MealPlan() {
  return (
    <AppShell>
      <section className="glass-dark animate-in" style={{ padding: 24, marginBottom: 24 }}>
        <div className="page-eyebrow" style={{ color: "#7dd3fc" }}>
          Sample week
        </div>
        <h1 className="hero-title-mobile" style={{ margin: "0 0 10px", color: "#f8fafc", fontSize: 36 }}>
          7-Day High-Protein, Low-Carb Meal Plan
        </h1>
        <p style={{ margin: 0, color: "#cbd5e1", maxWidth: 640, lineHeight: 1.6 }}>
          A ready-made week you can follow as-is or use as inspiration when you generate a custom
          plan with Morgan.
        </p>
      </section>

      <div style={{ display: "grid", gap: 16 }}>
        {days.map((d, index) => (
          <article
            key={d.day}
            className="glass-panel animate-in day-card-enter"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <h2 style={{ margin: "0 0 14px", color: "var(--accent)", fontSize: "1.25rem" }}>
              {d.day}
            </h2>
            <div className="meal-row">
              <span className="meal-emoji" aria-hidden>
                🌅
              </span>
              <p style={{ margin: 0 }}>
                <strong>Breakfast:</strong> {d.breakfast}
              </p>
            </div>
            <div className="meal-row">
              <span className="meal-emoji" aria-hidden>
                🥗
              </span>
              <p style={{ margin: 0 }}>
                <strong>Lunch:</strong> {d.lunch}
              </p>
            </div>
            <div className="meal-row">
              <span className="meal-emoji" aria-hidden>
                🍽️
              </span>
              <p style={{ margin: 0 }}>
                <strong>Dinner:</strong> {d.dinner}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <Link href="/shoplist" className="action-btn action-btn-primary" style={{ textDecoration: "none" }}>
          View shopping list 🛒
        </Link>
        <Link href="/" className="action-btn" style={{ textDecoration: "none" }}>
          Build your own with Morgan
        </Link>
      </div>
    </AppShell>
  );
}
