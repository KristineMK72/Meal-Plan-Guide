export default function AppShell({ children }) {
  return (
    <main className="app-shell">
      <div className="app-shell-glow app-shell-glow-one" />
      <div className="app-shell-glow app-shell-glow-two" />
      <div className="app-shell-inner">{children}</div>
    </main>
  );
}
