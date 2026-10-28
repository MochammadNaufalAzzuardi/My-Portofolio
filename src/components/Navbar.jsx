import React, { useEffect, useState } from 'react';

// Simple pill‑shaped floating navbar
// Uses Tailwind CSS for styling. Adjust items as needed.
const NAV_ITEMS = [
  { id: 'home', label: 'Home', targetId: 'hero-section' },
  { id: 'about', label: 'About', targetId: 'about-section' },
  { id: 'portfolio', label: 'Portfolio', targetId: 'portfolio-section' },
  { id: 'contact', label: 'Contact', targetId: 'contact-section' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');

  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Simple heuristic: find the section whose top is closest to current scroll
      let current = 'home';
      NAV_ITEMS.forEach(item => {
        const el = document.getElementById(item.targetId);
        if (el) {
          const offset = Math.abs(el.offsetTop - scrollY);
          if (offset < 200) {
            current = item.id;
          }
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 inset-x-0 mx-auto max-w-3xl z-20">
      <ul className="flex justify-center items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm text-white">
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <button
              className={`px-3 py-1 rounded transition-colors ${active === item.id ? 'bg-white/30' : ''}`}
              onClick={() => scrollToSection(item.targetId)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
