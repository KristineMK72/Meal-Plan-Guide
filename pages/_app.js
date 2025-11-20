// /pages/_app.js (UPDATE THIS FILE)
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; // <-- ADD THIS IMPORT

function MyApp({ Component, pageProps }) {
// ... rest of the file is unchanged
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer /> {/* <-- ADD FOOTER HERE */}
    </>
  );
}

export default MyApp;
