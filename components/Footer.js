// /components/Footer.js
import React from 'react';

export default function Footer() {
    return (
        <footer style={{
            background: '#333',
            color: '#ccc',
            padding: '1.5rem',
            textAlign: 'center',
            marginTop: '4rem',
            fontSize: '0.9rem',
            borderTop: '5px solid #1845AD', // Adds a nice color accent
        }}>
            <p style={{ margin: 0 }}>
                &copy; {new Date().getFullYear()} Powered by Resilience. All rights reserved.
            </p>
        </footer>
    );
}
