// /pages/index.js
// /pages/index.js
import Image from "next/image";

// NOTE: Replace these URLs with your actual image links!
const BANNER_URL = "https://i.imgur.com/your-banner-image.png";
const BREAKFAST_ICON_URL = "https://i.imgur.com/breakfast-icon.png";
const LUNCH_ICON_URL = "https://i.imgur.com/lunch-icon.png";
const DINNER_ICON_URL = "https://i.imgur.com/dinner-icon.png";

export default function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
        High-Protein, Low-Carb Meal Plan
      </h1>

      <Image 
        src={BANNER_URL} 
        alt="Meal Plan Banner"
        width={900} 
        height={250}
        // Next.js requires configuration for external images. 
        // You'll need to add the image domain (e.g., 'i.imgur.com') to your next.config.js
        unoptimized={true} 
        style={{ borderRadius: "12px", margin: "2rem 0" }}
      />

      <h2>Weekly Meal Plan</h2>

      {/* Breakfast */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Image src={BREAKFAST_ICON_URL} width={64} height={64} alt="Breakfast Icon" unoptimized={true}/>
        <h3>Breakfast Ideas</h3>
      </div>
      <ul>
        <li>Greek yogurt + berries + chia</li>
        <li>Egg white omelette with spinach</li>
        <li>Cottage cheese + almonds</li>
      </ul>

      {/* Lunch */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Image src={LUNCH_ICON_URL} width={64} height={64} alt="Lunch Icon" unoptimized={true}/>
        <h3>Lunch Ideas</h3>
      </div>
      <ul>
        <li>Chicken salad with avocado</li>
        <li>Turkey roll-ups</li>
        <li>Grilled shrimp + greens</li>
      </ul>

      {/* Dinner */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Image src={DINNER_ICON_URL} width={64} height={64} alt="Dinner Icon" unoptimized={true}/>
        <h3>Dinner Ideas</h3>
      </div>
      <ul>
        <li>Salmon + roasted broccoli</li>
        <li>Steak + asparagus</li>
        <li>Chicken stir-fry (no rice)</li>
      </ul>
    </div>
  );
}


