import { useState } from "react";

export default function CoachChat({ plan }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Morgan. Tell me what you’re working with, and we’ll build something you can actually stick to.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/meal-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          plan,
        }),
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Something went wrong. Let’s try that again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={styles.panel}>
      <h2 style={styles.title}>Ask Morgan</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              background: msg.role === "user" ? "#dbeafe" : "#f1f5f9",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a recipe, swap a meal, or get help..."
        />

        <button style={styles.btn} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </section>
  );
}

const styles = {
  panel: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 20,
  },
  title: {
    marginTop: 0,
    marginBottom: 10,
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxHeight: 300,
    overflowY: "auto",
    marginBottom: 10,
  },
  msg: {
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
  },
  form: {
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  },
  btn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: "#0284c7",
    color: "#fff",
    cursor: "pointer",
  },
};
