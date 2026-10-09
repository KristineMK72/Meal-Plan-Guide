import { useEffect, useState } from "react";

function Group({ title, items, checked, onToggle }) {
  if (!items || !items.length) return null;

  return (
    <div style={styles.group}>
      <h3 style={styles.groupTitle}>{title}</h3>
      <div>
        {items.map((item, idx) => {
          const key = `${title}-${idx}`;
          const isChecked = !!checked[key];
          return (
            <label
              key={key}
              className={`shop-item${isChecked ? " checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(key)}
              />
              <span className="shop-item-text">{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function ShoppingListCard({ shoppingList }) {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    setChecked({});
  }, [shoppingList]);

  function onToggle(key) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  }

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

  const totalItems = shoppingList
    ? Object.values(shoppingList).reduce((n, arr) => n + (arr?.length || 0), 0)
    : 0;
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <section className="glass-panel animate-in animate-in-delay-2">
      <div className="header-row">
        <div>
          <h2 style={styles.title} className="panel-title-mobile">
            Shopping List
          </h2>
          {shoppingList ? (
            <p style={styles.progress}>
              {checkedCount} of {totalItems} checked off
            </p>
          ) : null}
        </div>
        {shoppingList ? (
          <button type="button" onClick={copyList} className="action-btn">
            📋 Copy List
          </button>
        ) : null}
      </div>

      {!shoppingList ? (
        <p style={styles.empty}>
          Your grocery list will show up here after you generate a plan. Check
          items off as you shop.
        </p>
      ) : (
        <>
          {totalItems > 0 ? (
            <div style={styles.barTrack}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${Math.round((checkedCount / totalItems) * 100)}%`,
                }}
              />
            </div>
          ) : null}
          <Group
            title="Proteins"
            items={shoppingList.proteins}
            checked={checked}
            onToggle={onToggle}
          />
          <Group
            title="Vegetables"
            items={shoppingList.vegetables}
            checked={checked}
            onToggle={onToggle}
          />
          <Group
            title="Fruits"
            items={shoppingList.fruits}
            checked={checked}
            onToggle={onToggle}
          />
          <Group
            title="Grains & Starches"
            items={shoppingList.grains_and_starches}
            checked={checked}
            onToggle={onToggle}
          />
          <Group
            title="Dairy / Alternatives"
            items={shoppingList.dairy_or_alternatives}
            checked={checked}
            onToggle={onToggle}
          />
          <Group
            title="Pantry"
            items={shoppingList.pantry}
            checked={checked}
            onToggle={onToggle}
          />
        </>
      )}
    </section>
  );
}

const styles = {
  title: {
    margin: 0,
    fontSize: 28,
    color: "#0f172a",
  },
  progress: {
    margin: "6px 0 0",
    fontSize: 13,
    color: "#64748b",
  },
  empty: {
    color: "#64748b",
    marginBottom: 0,
  },
  barTrack: {
    height: 8,
    borderRadius: 999,
    background: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 14,
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #0284c7, #16a34a)",
    transition: "width 0.25s ease",
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
};
