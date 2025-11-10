'use client';
import { useState } from "react";
import "../app/globals.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* full-page background behind everything */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/galaxy.jpg')" }}
        />
      </div>

      <nav className="bg-transparent">
        <ul className="flex flex-row justify-between items-center p-4 text-white">
          <li className="flex-shrink-0">
            <h1 className="font-bold text-4xl">Foss</h1>
          </li>
          <li className="flex items-center">
            {/* Desktop links (unchanged) */}
            <div className="hidden md:flex flex-row gap-8">
              <a href="#" className="text-lg">Home</a>
              <a href="#" className="text-lg">About</a>
              <a href="#" className="text-lg">Achievements</a>
              <a href="#" className="text-lg">Team</a>
              <a href="#" className="text-lg">Contact</a>
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
          <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-sm text-white">
            <ul className="px-4 py-3 space-y-2">
              <li><a href="#" className="block py-2" onClick={() => setOpen(false)}>Home</a></li>
              <li><a href="#" className="block py-2" onClick={() => setOpen(false)}>About</a></li>
              <li><a href="#" className="block py-2" onClick={() => setOpen(false)}>Achievements</a></li>
              <li><a href="#" className="block py-2" onClick={() => setOpen(false)}>Team</a></li>
              <li><a href="#" className="block py-2" onClick={() => setOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
