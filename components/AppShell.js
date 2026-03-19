export default function AppShell({ children }) {
  return (
    <main style={styles.page}>
      <div style={styles.bgGlowOne} />
      <div style={styles.bgGlowTwo} />
      <div style={styles.shell}>{children}</div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "radial-gradient(circle at top left, #e0f2fe 0%, transparent 28%), radial-gradient(circle at top right, #dcfce7 0%, transparent 24%), linear-gradient(180deg, #f8fbff 0%, #eef8ff 45%, #f6fffb 100%)",
    padding: "28px 16px 56px",
    fontFamily: "Arial, sans-serif",
  },
  shell: {
    maxWidth: 1220,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  bgGlowOne: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: "rgba(14, 165, 233, 0.12)",
    filter: "blur(70px)",
    top: -80,
    left: -60,
  },
  bgGlowTwo: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "rgba(34, 197, 94, 0.12)",
    filter: "blur(70px)",
    bottom: 10,
    right: -40,
  },
};
