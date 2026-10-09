import { useEffect, useRef, useState } from "react";

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
    <section className="glass-panel animate-in animate-in-delay-3">
      <div className="header-row">
        <div>
          <div style={styles.eyebrow}>Morgan Coach</div>
          <h2 style={styles.title} className="panel-title-mobile">
            Ask Morgan anything
          </h2>
          <p style={styles.sub}>
            Recipes, swaps, pantry ideas, grocery help, or a little motivation.
          </p>
        </div>
        <div style={styles.avatar} className="morgan-orb-live">
          M
        </div>
      </div>

      <div style={styles.starters}>
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
        {loading ? (
          <div style={styles.loading}>
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
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a recipe, a swap, or a smarter grocery plan..."
          aria-label="Message Morgan"
        />
        <button
          className="action-btn action-btn-primary"
          style={styles.btn}
          disabled={loading}
        >
          Send
        </button>
      </form>
    </section>
  );
}

const styles = {
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
    flexShrink: 0,
  },
  starters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
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
    maxWidth: "90%",
    lineHeight: 1.45,
    wordBreak: "break-word",
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
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 16,
  },
  btn: {
    padding: "12px 16px",
    borderRadius: 14,
  },
};
