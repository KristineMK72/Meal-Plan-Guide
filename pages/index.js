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
        <div style={styles.heroText}>
          <div style={styles.badge}>Meet Morgan</div>
          <h1 style={styles.title}>Your meal coach, shopping planner, and recipe guide</h1>
          <p style={styles.subtitle}>
            Build a realistic weekly plan, get a smarter grocery list, and ask Morgan for recipes,
            swaps, pantry ideas, and motivation along the way.
          </p>

          <div style={styles.quote}>
            “You do not need a perfect week. You need a doable one.”
          </div>
        </div>

        <div style={styles.morganCard}>
          <div style={styles.morganAvatar}>M</div>
          <h3 style={styles.morganName}>Morgan</h3>
          <p style={styles.morganCopy}>
            Calm, practical, and just witty enough to keep meal planning from feeling like homework.
          </p>
        </div>
      </section>

      <section style={styles.grid}>
        <PlannerForm
          form={form}
          presets={presets}
          loading={loading}
          error={error}
          updateField={updateField}
          applyPreset={applyPreset}
          onSubmit={generatePlan}
        />

        <div style={styles.rightColumn}>
          <MealPlanResults plan={plan} onSave={savePlan} savedMessage={savedMessage} />
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
    gridTemplateColumns: "1.35fr 0.8fr",
    gap: 22,
    marginBottom: 24,
    alignItems: "stretch",
  },
  heroText: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.7)",
    borderRadius: 30,
    padding: 30,
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
  },
  badge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0284c7",
    marginBottom: 12,
  },
  title: {
    margin: "0 0 12px 0",
    fontSize: 48,
    lineHeight: 1.02,
    color: "#0f172a",
    maxWidth: 760,
  },
  subtitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.55,
    color: "#475569",
    maxWidth: 760,
  },
  quote: {
    marginTop: 18,
    padding: "14px 16px",
    borderRadius: 18,
    background: "#f8fbff",
    border: "1px solid #dbeafe",
    color: "#1e3a8a",
    fontWeight: 600,
    display: "inline-block",
  },
  morganCard: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(240,249,255,0.92) 100%)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.7)",
    borderRadius: 30,
    padding: 28,
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  morganAvatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    background: "linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)",
    boxShadow: "0 16px 30px rgba(14,165,233,0.28)",
    marginBottom: 16,
  },
  morganName: {
    margin: "0 0 8px 0",
    fontSize: 28,
    color: "#0f172a",
  },
  morganCopy: {
    margin: 0,
    color: "#475569",
    lineHeight: 1.55,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.08fr",
    gap: 22,
    alignItems: "start",
  },
  rightColumn: {
    display: "grid",
    gap: 22,
  },
  chatSection: {
    marginTop: 24,
  },
};
