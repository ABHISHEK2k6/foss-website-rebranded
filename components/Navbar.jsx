'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full max-w-full ${
        scrolled ? 'bg-black/30 backdrop-blur-lg border-b border-white/20 shadow-lg' : 'bg-transparent'
      }`}>
        <ul className="flex flex-row justify-between items-start py-3 px-4 text-white w-full max-w-full">
          <li className="flex-shrink-0">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="FOSS Logo" 
                width={140} 
                height={50}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </li>
          <li className="flex items-start pt-10">
            {/* Desktop links (unchanged) */}
            <div className="hidden md:flex flex-row gap-8">
              <a href="/" className="text-lg hover:text-gray-300 transition-colors">Home</a>
              <a href="#about" className="text-lg hover:text-gray-300 transition-colors">About</a>
              <a href="/blogs" className="text-lg hover:text-gray-300 transition-colors">Blog</a>
              <a href="/team" className="text-lg hover:text-gray-300 transition-colors">Team</a>
              <a href="#contact" className="text-lg hover:text-gray-300 transition-colors">Contact</a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </li>
        </ul>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 border-t border-white/20 bg-black/50 backdrop-blur-lg text-white shadow-lg">
            <ul className="px-4 py-3 space-y-2">
              <li><a href="/" className="block py-2 hover:text-gray-300 transition-colors" onClick={() => setOpen(false)}>Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-gray-300 transition-colors" onClick={() => setOpen(false)}>About</a></li>
              <li><a href="/blogs" className="block py-2 hover:text-gray-300 transition-colors" onClick={() => setOpen(false)}>Blog</a></li>
              <li><a href="/team" className="block py-2 hover:text-gray-300 transition-colors" onClick={() => setOpen(false)}>Team</a></li>
              <li><a href="#contact" className="block py-2 hover:text-gray-300 transition-colors" onClick={() => setOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
