import Image from "next/image";

export default function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
        High-Protein, Low-Carb Meal Plan
      </h1>

      <Image 
        src="/banner.png" 
        alt="Meal Plan Banner"
        width={900}
        height={250}
        style={{ borderRadius: "12px", margin: "2rem 0" }}
      />

      <h2>Weekly Meal Plan</h2>

      {/* Breakfast */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Image src="/icons/breakfast.png" width={64} height={64} />
        <h3>Breakfast Ideas</h3>
      </div>
      <ul>
        <li>Greek yogurt + berries + chia</li>
        <li>Egg white omelette with spinach</li>
        <li>Cottage cheese + almonds</li>
      </ul>

      {/* Lunch */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Image src="/icons/lunch.png" width={64} height={64} />
        <h3>Lunch Ideas</h3>
      </div>
      <ul>
        <li>Chicken salad with avocado</li>
        <li>Turkey roll-ups</li>
        <li>Grilled shrimp + greens</li>
      </ul>

      {/* Dinner */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Image src="/icons/dinner.png" width={64} height={64} />
        <h3>Dinner Ideas</h3>
      </div>
      <ul>
        <li>Salmon + roasted broccoli</li>
        <li>Steak + asparagus</li>
        <li>Chicken stir-fry (no rice)</li>
      </ul>

      <button
        style={{
          padding: "1rem 2rem",
          background: "#000",
          color: "#fff",
          borderRadius: "8px",
          marginTop: "2rem"
        }}
        onClick={() => window.location.href = "/api/mealplan-pdf"}
      >
        Download Full PDF Guide
      </button>
    </div>
  );
}
