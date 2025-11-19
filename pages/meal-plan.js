import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function MealPlan() {
  const pdfRef = useRef();

  const generatePDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("meal-plan.pdf");
  };

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

  const shoppingList = {
    Proteins: [
      "Chicken breasts",
      "Chicken thighs",
      "Salmon",
      "Cod",
      "Lean ground beef",
      "Turkey slices",
      "Shrimp",
      "Eggs",
      "Cottage cheese",
      "Greek yogurt",
      "Protein powder"
    ],
    Vegetables: [
      "Asparagus",
      "Broccoli",
      "Zucchini",
      "Spinach",
      "Mushrooms",
      "Green beans",
      "Brussels sprouts"
    ],
    Fruits: [
      "Berries"
    ],
    Pantry: [
      "Olive oil",
      "Chia seeds",
      "Almonds",
      "Walnuts",
      "Almond butter",
      "Seasonings"
    ],
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <button
        onClick={generatePDF}
        style={{
          padding: "1rem 2rem",
          background: "#6a4fb6",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "1.2rem",
          marginBottom: "2rem",
        }}
      >
        Download Meal Plan PDF
      </button>

      <div ref={pdfRef} style={{ background: "white", padding: "2rem" }}>
        <h1
          style={{
            textAlign: "center",
            background: "#6a4fb6",
            color: "white",
            padding: "1.2rem",
            borderRadius: "12px",
          }}
        >
          7-Day High-Protein, Low-Carb Meal Plan
        </h1>

        {days.map((d, index) => (
          <div
            key={index}
            style={{
              marginTop: "2rem",
              padding: "1rem",
              borderRadius: "10px",
              background: "#f1ecff",
            }}
          >
            <h2
              style={{
                marginBottom: "1rem",
                background: "#d7caff",
                padding: "0.6rem",
                borderRadius: "8px",
              }}
            >
              {d.day}
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src="/icons/breakfast.png" width="40" height="40" />
              <p><strong>Breakfast:</strong> {d.breakfast}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src="/icons/lunch.png" width="40" height="40" />
              <p><strong>Lunch:</strong> {d.lunch}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img src="/icons/dinner.png" width="40" height="40" />
              <p><strong>Dinner:</strong> {d.dinner}</p>
            </div>
          </div>
        ))}

        <h1
          style={{
            textAlign: "center",
            marginTop: "3rem",
            background: "#6a4fb6",
            color: "white",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          Shopping List
        </h1>

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
                background: "#e9e5ff",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <h3 style={{ color: "#4e3f84" }}>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
