// /pages/_app.js
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("morgan-theme");
    const preferred =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(preferred);
    document.documentElement.setAttribute("data-theme", preferred);
    setReady(true);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("morgan-theme", next);
  }

  return (
    <>
      <Head>
        <title>Morgan — Meal Plan Guide</title>
        <meta
          name="description"
          content="Build a doable week of meals with Morgan — plans, shopping lists, and coaching."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme === "dark" ? "#0f172a" : "#e0f2fe"} />
      </Head>
      <Navbar theme={theme} onToggleTheme={toggleTheme} themeReady={ready} />
      <Component {...pageProps} theme={theme} />
      <Footer />
    </>
  );
}

export default MyApp;
