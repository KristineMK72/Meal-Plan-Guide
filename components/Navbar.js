// /components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      background: '#1845AD',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    }}>
      <Link href="/" style={{ 
        color: 'white', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        textDecoration: 'none' 
      }}>
        Fuel & Flourish 🌱
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link href="/" style={navLinkStyle}>Home</Link>
        <Link href="/meal-plan" style={navLinkStyle}>Meal Plan</Link>
        <Link href="/shoplist" style={navLinkStyle}>Shopping List</Link>
        <Link href="/mind-diet" style={navLinkStyle}>Mind Diet</Link>
        <Link href="/sustainability" style={navLinkStyle}>Sustainability</Link> {/* New Page Link */}
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.1rem',
  padding: '0.5rem 0',
  transition: 'color 0.2s',
};
