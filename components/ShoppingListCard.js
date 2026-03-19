function Group({ title, items }) {
  if (!items || !items.length) return null;

  return (
    <div style={styles.group}>
      <h3 style={styles.groupTitle}>{title}</h3>
      <ul style={styles.ul}>
        {items.map((item, idx) => (
          <li key={`${title}-${idx}`} style={styles.li}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ShoppingListCard({ shoppingList }) {
  async function copyList() {
    if (!shoppingList) return;

    const text = Object.entries(shoppingList)
      .map(([key, items]) => {
        const label = key.replaceAll("_", " ");
        const lines = (items || []).map((item) => `- ${item}`).join("\n");
        return `${label.toUpperCase()}\n${lines}`;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Shopping list copied.");
    } catch {
      alert("Could not copy shopping list.");
    }
  }

  return (
    <section style={styles.panel}>
      <div style={styles.header}>
        <h2 style={styles.title}>Shopping List</h2>
        {shoppingList ? (
          <button type="button" onClick={copyList} style={styles.copyBtn}>
            Copy List
          </button>
        ) : null}
      </div>

      {!shoppingList ? (
        <p style={styles.empty}>Your grocery list will show up here after you generate a plan.</p>
      ) : (
        <>
          <Group title="Proteins" items={shoppingList.proteins} />
          <Group title="Vegetables" items={shoppingList.vegetables} />
          <Group title="Fruits" items={shoppingList.fruits} />
          <Group title="Grains & Starches" items={shoppingList.grains_and_starches} />
          <Group title="Dairy / Alternatives" items={shoppingList.dairy_or_alternatives} />
          <Group title="Pantry" items={shoppingList.pantry} />
        </>
      )}
    </section>
  );
}

const styles = {
  panel: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 22,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  title: {
    margin: 0,
    fontSize: 28,
    color: "#0f172a",
  },
  copyBtn: {
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: 12,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
  },
  empty: {
    color: "#64748b",
    marginBottom: 0,
  },
  group: {
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
    background: "#fafcff",
  },
  groupTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: 18,
    color: "#0f172a",
  },
  ul: {
    margin: 0,
    paddingLeft: 18,
  },
  li: {
    marginBottom: 6,
    color: "#334155",
  },
};
