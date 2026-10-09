import { useEffect, useRef, useState } from "react";

const starters = [
  "Give me a cheap high-protein dinner",
  "What can I make with chicken, rice, and eggs?",
  "Swap one dinner for something easier",
  "Give me a quick breakfast recipe",
  "Motivate me for the week",
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """);
}

function inlineFormat(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function parseRecipe(text) {
  if (!text || typeof text !== "string") return null;

  const normalized = text.replace(/\r\n/g, "\n").trim();
  const hasRecipeMarkers =
    /\b(ingredients?|instructions?|directions?|steps?|method)\b/i.test(normalized) &&
    (/\n[-*•]\s/.test(normalized) ||
      /\n\d+[.)]\s/.test(normalized) ||
      /\*\*ingredients?\*\*/i.test(normalized));

  if (!hasRecipeMarkers) return null;

  const lines = normalized.split("\n");
  let title = "";
  let time = "";
  let servings = "";
  let intro = [];
  let section = "intro";
  const ingredients = [];
  const steps = [];
  const notes = [];

  const sectionOf = (line) => {
    const t = line.replace(/\*\*/g, "").replace(/:$/, "").trim().toLowerCase();
    if (/^title\b/.test(t)) return "title";
    if (/^(time|prep|cook|total)\b/.test(t)) return "meta";
    if (/^servings?\b|^serves\b|^yield\b/.test(t)) return "servings";
    if (/^ingredients?\b/.test(t)) return "ingredients";
    if (/^(instructions?|directions?|steps?|method)\b/.test(t)) return "steps";
    if (/^(notes?|tips?|swaps?|variations?)\b/.test(t)) return "notes";
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const sec = sectionOf(line);
    if (sec === "title") {
      const rest = line.replace(/\*\*/g, "").replace(/^title\s*:?\s*/i, "").trim();
      if (rest) title = rest;
      section = "intro";
      continue;
    }
    if (sec === "ingredients") {
      section = "ingredients";
      continue;
    }
    if (sec === "steps") {
      section = "steps";
      continue;
    }
    if (sec === "notes") {
      section = "notes";
      continue;
    }
    if (sec === "servings") {
      servings = line
        .replace(/\*\*/g, "")
        .replace(/^servings?\s*:?\s*/i, "")
        .replace(/^serves\s*:?\s*/i, "")
        .trim();
      continue;
    }
    if (sec === "meta") {
      const cleaned = line.replace(/\*\*/g, "");
      if (/servings?|serves|yield/i.test(cleaned) && !/minute|hour|prep|cook|total/i.test(cleaned)) {
        servings = cleaned
          .replace(/^servings?\s*:?\s*/i, "")
          .replace(/^serves\s*:?\s*/i, "")
          .trim();
      } else {
        time = cleaned
          .replace(/^(time|prep time|cook time|total time)\s*:?\s*/i, "")
          .trim();
      }
      continue;
    }

    if (
      !title &&
      section === "intro" &&
      !line.startsWith("-") &&
      !line.startsWith("*") &&
      !/^\d+[.)]/.test(line)
    ) {
      const maybeTitle = line.replace(/\*\*/g, "").replace(/^#+\s*/, "");
      if (maybeTitle.length < 80 && !maybeTitle.endsWith(".")) {
        title = maybeTitle;
        continue;
      }
    }

    const bullet = line
      .replace(/^[-*•]\s+/, "")
      .replace(/^\d+[.)]\s+/, "")
      .replace(/\*\*/g, "");

    if (section === "ingredients") {
      ingredients.push(
        line
          .replace(/^[-*•]\s+/, "")
          .replace(/^\d+[.)]\s+/, "")
          .replace(/\*\*/g, "")
          .trim()
      );
      continue;
    }
    if (section === "steps") {
      steps.push(bullet.trim());
      continue;
    }
    if (section === "notes") {
      notes.push(bullet.trim());
      continue;
    }

    if (/^(time|prep|cook|total|servings?|serves)\s*:/i.test(line.replace(/\*\*/g, ""))) {
      const cleaned = line.replace(/\*\*/g, "");
      if (/servings?|serves/i.test(cleaned)) {
        servings = cleaned.split(":").slice(1).join(":").trim();
      } else {
        time = cleaned.split(":").slice(1).join(":").trim() || cleaned;
      }
      continue;
    }

    intro.push(line.replace(/\*\*/g, "").trim());
  }

  if (ingredients.length < 2 && steps.length < 2) return null;

  return {
    title: title || "Recipe",
    time,
    servings,
    intro: intro.join(" ").trim(),
    ingredients,
    steps,
    notes,
  };
}

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <div className="recipe-card-kicker">Recipe</div>
        <h3 className="recipe-card-title">{recipe.title}</h3>
        {(recipe.time || recipe.servings) && (
          <div className="recipe-meta">
            {recipe.time ? <span className="recipe-meta-pill">⏱️ {recipe.time}</span> : null}
            {recipe.servings ? (
              <span className="recipe-meta-pill">🍽️ {recipe.servings}</span>
            ) : null}
          </div>
        )}
      </div>
      <div className="recipe-card-body">
        {recipe.intro ? (
          <p className="muted-text" style={{ marginBottom: 4 }}>
            {recipe.intro}
          </p>
        ) : null}

        {recipe.ingredients.length > 0 ? (
          <div className="recipe-section">
            <h4 className="recipe-section-title">Ingredients</h4>
            <ul className="recipe-list">
              {recipe.ingredients.map((item, i) => (
                <li key={`ing-${i}`}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {recipe.steps.length > 0 ? (
          <div className="recipe-section">
            <h4 className="recipe-section-title">Steps</h4>
            <ol className="recipe-steps">
              {recipe.steps.map((step, i) => (
                <li key={`step-${i}`}>{step}</li>
              ))}
            </ol>
          </div>
        ) : null}

        {recipe.notes.length > 0 ? (
          <div className="recipe-note">
            <strong>Tip:</strong> {recipe.notes.join(" ")}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RichText({ text }) {
  const lines = String(text || "").split("\n");
  const blocks = [];
  let list = null;

  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const item = (bullet || numbered)[1];
      if (!list || list.type !== (bullet ? "ul" : "ol")) {
        flushList();
        list = { type: bullet ? "ul" : "ol", items: [] };
      }
      list.items.push(item);
    } else {
      flushList();
      blocks.push({ type: "p", text: trimmed });
    }
  }
  flushList();

  return (
    <div className="chat-rich">
      {blocks.map((b, i) => {
        if (b.type === "p") {
          return (
            <p key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(b.text) }} />
          );
        }
        const Tag = b.type;
        return (
          <Tag key={i}>
            {b.items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            ))}
          </Tag>
        );
      })}
    </div>
  );
}

function MessageBubble({ msg }) {
  if (msg.role === "user") {
    return <div className="chat-bubble chat-bubble-user">{msg.text}</div>;
  }

  const recipe = parseRecipe(msg.text);
  if (recipe) {
    return (
      <div className="chat-bubble chat-bubble-bot is-recipe">
        <RecipeCard recipe={recipe} />
      </div>
    );
  }

  return (
    <div className="chat-bubble chat-bubble-bot">
      <RichText text={msg.text} />
    </div>
  );
}

export default function CoachChat({ plan }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Morgan. Let’s make this week feel a little more doable. Ask me for a recipe and I’ll lay it out step by step.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendRawMessage(text) {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/meal-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, plan }),
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply || "I’ve got a few ideas for that." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Something hiccupped there. Try me again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    const text = input;
    setInput("");
    await sendRawMessage(text);
  }

  return (
    <section className="glass-panel animate-in animate-in-delay-3">
      <div className="header-row">
        <div>
          <div className="page-eyebrow">Morgan Coach</div>
          <h2 className="panel-heading panel-title-mobile">Ask Morgan anything</h2>
          <p className="muted-text">
            Recipes, swaps, pantry ideas, grocery help, or a little motivation.
          </p>
        </div>
        <div className="chat-avatar morgan-orb-live">M</div>
      </div>

      <div className="preset-wrap">
        {starters.map((item) => (
          <button
            key={item}
            type="button"
            className="preset-btn"
            onClick={() => sendRawMessage(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {loading ? (
          <div className="chat-loading">
            <span className="typing-dots" aria-label="Morgan is typing">
              <span />
              <span />
              <span />
            </span>{" "}
            Morgan is thinking…
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-form">
        <input
          className="field-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a recipe, a swap, or a smarter grocery plan..."
          aria-label="Message Morgan"
        />
        <button className="action-btn action-btn-primary" disabled={loading}>
          Send
        </button>
      </form>
    </section>
  );
}
