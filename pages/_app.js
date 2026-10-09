// /pages/_app.js
import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/global.css";

function applyTheme(next) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", next);
  document.documentElement.style.colorScheme = next;
  document.body?.setAttribute("data-theme", next);
}

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("morgan-theme");
    const preferred =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("morgan-theme", next);
      } catch (e) {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <>
      <Head>
        <title>Morgan — Meal Plan Guide</title>
        <meta
          name="description"
          content="Build a doable week of meals with Morgan — plans, shopping lists, and coaching."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme === "dark" ? "#0b1220" : "#e0f2fe"} />
      </Head>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Component {...pageProps} theme={theme} />
      <Footer />
    </>
  );
}

export default MyApp;
