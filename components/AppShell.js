export default function AppShell({ children }) {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>{children}</div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fbff 0%, #eefaf4 100%)",
    padding: "24px 16px 48px",
    fontFamily: "Arial, sans-serif",
  },
  shell: {
    maxWidth: 1180,
    margin: "0 auto",
  },
};
