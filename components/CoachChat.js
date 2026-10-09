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
          <div
            key={i}
            className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}
          >
            {msg.text}
          </div>
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
