import { useState } from "react";

const starters = [
  "Give me a cheap high-protein dinner",
  "What can I make with chicken, rice, and eggs?",
  "Swap one dinner for something easier",
  "Give me a quick breakfast recipe",
  "Motivate me for the week",
];

export default function CoachChat({ plan }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Morgan. Let’s make this week feel a little more doable.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendRawMessage(text) {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/meal-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          plan,
        }),
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.reply || "I’ve got a few ideas for that.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Something hiccupped there. Try me again.",
        },
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
    <section style={styles.panel}>
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>Morgan Coach</div>
          <h2 style={styles.title}>Ask Morgan anything</h2>
          <p style={styles.sub}>
            Recipes, swaps, pantry ideas, grocery help, or a little motivation.
          </p>
        </div>
        <div style={styles.avatar}>M</div>
      </div>

      <div style={styles.starters}>
        {starters.map((item) => (
          <button
            key={item}
            type="button"
            style={styles.starterBtn}
            onClick={() => sendRawMessage(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              ...(msg.role === "user" ? styles.userMsg : styles.assistantMsg),
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading ? <div style={styles.loading}>Morgan is thinking…</div> : null}
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a recipe, a swap, or a smarter grocery plan..."
        />
        <button style={styles.btn} disabled={loading}>
          Send
        </button>
      </form>
    </section>
  );
}

const styles = {
  panel: {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.7)",
    borderRadius: 28,
    padding: 22,
    boxShadow: "0 18px 50px rgba(15, 23, 42, 0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0284c7",
    marginBottom: 6,
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: 28,
    color: "#0f172a",
  },
  sub: {
    margin: 0,
    color: "#475569",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    color: "#fff",
    background: "linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)",
    boxShadow: "0 12px 24px rgba(14,165,233,0.28)",
    flexShrink: 0,
  },
  starters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  starterBtn: {
    border: "1px solid #dbeafe",
    background: "#f8fbff",
    color: "#1e3a8a",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 13,
    cursor: "pointer",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxHeight: 360,
    overflowY: "auto",
    padding: "8px 2px",
    marginBottom: 12,
  },
  msg: {
    padding: "12px 14px",
    borderRadius: 16,
    maxWidth: "82%",
    lineHeight: 1.45,
  },
  userMsg: {
    alignSelf: "flex-end",
    background: "#dbeafe",
    color: "#0f172a",
  },
  assistantMsg: {
    alignSelf: "flex-start",
    background: "#f1f5f9",
    color: "#0f172a",
  },
  loading: {
    color: "#64748b",
    fontSize: 14,
    paddingLeft: 2,
  },
  form: {
    display: "flex",
    gap: 10,
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 15,
  },
  btn: {
    padding: "12px 16px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #0284c7 0%, #16a34a 100%)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
};
