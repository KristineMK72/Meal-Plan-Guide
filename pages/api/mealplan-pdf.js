import PDFDocument from "pdfkit";

export default function handler(req, res) {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=meal-plan.pdf");

  doc.pipe(res);

  doc.fontSize(24).text("High Protein, Low Carb Meal Plan", { align: "center" });
  doc.moveDown();

  doc.fontSize(18).text("Breakfast:");
  doc.fontSize(12).list([
    "Greek yogurt + berries + chia",
    "Egg white omelette with spinach",
    "Cottage cheese + almonds"
  ]);
  doc.moveDown();

  doc.fontSize(18).text("Lunch:");
  doc.fontSize(12).list([
    "Chicken salad with avocado",
    "Turkey roll-ups",
    "Grilled shrimp + greens"
  ]);
  doc.moveDown();

  doc.fontSize(18).text("Dinner:");
  doc.fontSize(12).list([
    "Salmon + roasted broccoli",
    "Steak + asparagus",
    "Chicken stir-fry (no rice)"
  ]);

  doc.end();
}
