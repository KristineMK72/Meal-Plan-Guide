// /pages/_app.js (FIXED VERSION)
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp; // 
