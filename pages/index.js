import { useState } from "react";
import AppShell from "../components/AppShell";
import PlannerForm from "../components/PlannerForm";
import MealPlanResults from "../components/MealPlanResults";
import ShoppingListCard from "../components/ShoppingListCard";
import CoachChat from "../components/CoachChat";

const presets = [
  "high-protein fat loss",
  "budget-friendly meals",
  "easy meal prep",
  "family dinners",
  "low-carb",
  "brain-friendly meals",
  "muscle gain",
];

export default function Home() {
  const [form, setForm] = useState({
    goal: "high-protein fat loss",
    days: 7,
    calories: "",
    protein: "",
    dislikes: "",
    allergies: "",
    budget: "",
    household: "1",
    pantry: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function applyPreset(preset) {
    setForm((prev) => ({ ...prev, goal: preset }));
  }

  async function generatePlan(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);
    setSavedMessage("");

    try {
      const res = await fetch("/api/meal-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          days: Number(form.days) || 7,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate meal plan");
      }

      if (data.error && data.raw) {
        throw new Error("Morgan hit a formatting snag. Try again.");
      }

      setPlan(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function savePlan() {
    if (!plan) return;

    try {
      const existing = JSON.parse(localStorage.getItem("savedMealPlans") || "[]");
      const next = [
        {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          form,
          plan,
        },
        ...existing,
      ];
      localStorage.setItem("savedMealPlans", JSON.stringify(next));
      setSavedMessage("Morgan saved this plan on your device.");
    } catch {
      setSavedMessage("Could not save this plan.");
    }
  }

  return (
    <AppShell>
      <section style={styles.hero}>
        <div style={styles.heroMain}>
          <div style={styles.heroBadge}>Morgan Meal Coach</div>

          <h1 style={styles.heroTitle}>
            Build a week that feels
            <span style={styles.heroAccent}> strong, smart, and actually doable.</span>
          </h1>

          <p style={styles.heroText}>
            Morgan helps you create a meal plan, shape a grocery list, ask for
            recipes, swap meals, and stay motivated without making food feel like
            a second job.
          </p>

          <div style={styles.heroQuote}>
            “You do not need a perfect week. You need a week you can actually live through.”
          </div>

          <div style={styles.heroStats}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>7-day</div>
              <div style={styles.statLabel}>meal planning</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>Smart</div>
              <div style={styles.statLabel}>shopping lists</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>Morgan</div>
              <div style={styles.statLabel}>recipes + coaching</div>
            </div>
          </div>
        </div>

        <div style={styles.heroSide}>
          <div style={styles.morganOrb}>M</div>
          <h2 style={styles.sideTitle}>Meet Morgan</h2>
          <p style={styles.sideText}>
            Calm. Practical. Slightly witty. Built to help you plan meals, shop
            smarter, and keep going when real life gets messy.
          </p>

          <div style={styles.sideList}>
            <div style={styles.sideItem}>Recipes that look like real recipes</div>
            <div style={styles.sideItem}>Budget-friendly meal ideas</div>
            <div style={styles.sideItem}>Pantry-based suggestions</div>
            <div style={styles.sideItem}>Meal swaps without the chaos</div>
          </div>
        </div>
      </section>

      <section style={styles.grid}>
        <div style={styles.leftRail}>
          <PlannerForm
            form={form}
            presets={presets}
            loading={loading}
            error={error}
            updateField={updateField}
            applyPreset={applyPreset}
            onSubmit={generatePlan}
          />

          <div style={styles.morganTipCard}>
            <div style={styles.tipEyebrow}>Morgan says</div>
            <p style={styles.tipText}>
              Repeating a few good meals is not boring. It is strategy in a nice outfit.
            </p>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <MealPlanResults
            plan={plan}
            onSave={savePlan}
            savedMessage={savedMessage}
          />
          <ShoppingListCard shoppingList={plan?.shopping_list} />
        </div>
      </section>

      <section style={styles.chatSection}>
        <CoachChat plan={plan} />
      </section>
    </AppShell>
  );
}

const styles = {
  hero: {
    display: "grid",
    gridTemplateColumns: "1.35fr 0.82fr",
    gap: 24,
    marginBottom: 28,
    alignItems: "stretch",
  },

  heroMain: {
    background: "rgba(15, 23, 42, 0.68)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 30,
    padding: 32,
    boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
  },

  heroSide: {
    background: "rgba(15, 23, 42, 0.76)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 30,
    padding: 28,
    boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  heroBadge: {
    display: "inline-block",
    marginBottom: 14,
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(14, 165, 233, 0.16)",
    border: "1px solid rgba(56, 189, 248, 0.28)",
    color: "#7dd3fc",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  heroTitle: {
    margin: "0 0 14px 0",
    fontSize: 54,
    lineHeight: 1.02,
    color: "#f8fafc",
    maxWidth: 780,
  },

  heroAccent: {
    display: "block",
    color: "#86efac",
  },

  heroText: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.65,
    color: "#cbd5e1",
    maxWidth: 760,
  },

  heroQuote: {
    marginTop: 20,
    display: "inline-block",
    padding: "14px 16px",
    borderRadius: 18,
    background: "rgba(2, 132, 199, 0.14)",
    border: "1px solid rgba(56, 189, 248, 0.18)",
    color: "#e0f2fe",
    fontWeight: 600,
  },

  heroStats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
    marginTop: 24,
  },

  statCard: {
    borderRadius: 20,
    padding: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  statNumber: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: 800,
    marginBottom: 4,
  },

  statLabel: {
    color: "#94a3b8",
    fontSize: 14,
  },

  morganOrb: {
    width: 76,
    height: 76,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontSize: 30,
    fontWeight: 800,
    color: "#ffffff",
    background: "linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)",
    boxShadow: "0 18px 34px rgba(14,165,233,0.28)",
    marginBottom: 18,
  },

  sideTitle: {
    margin: "0 0 10px 0",
    color: "#f8fafc",
    fontSize: 32,
  },

  sideText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.65,
  },

  sideList: {
    display: "grid",
    gap: 10,
    marginTop: 18,
  },

  sideItem: {
    padding: "12px 14px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "#e2e8f0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "420px 1fr",
    gap: 24,
    alignItems: "start",
  },

  leftRail: {
    display: "grid",
    gap: 18,
    alignSelf: "start",
  },

  rightColumn: {
    display: "grid",
    gap: 22,
    alignSelf: "start",
  },

  morganTipCard: {
    background: "rgba(15, 23, 42, 0.7)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 18,
    boxShadow: "0 18px 50px rgba(0,0,0,0.24)",
  },

  tipEyebrow: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#7dd3fc",
    marginBottom: 8,
  },

  tipText: {
    margin: 0,
    color: "#dbeafe",
    lineHeight: 1.55,
  },

  chatSection: {
    marginTop: 28,
  },
};
