// /pages/_app.js 
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // <-- IMPORT FOOTER

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
