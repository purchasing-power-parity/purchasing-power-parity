"use client";

import { useState } from "react";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#calculator", label: "Calculator" },
  { href: "#countries", label: "Countries" },
  { href: "#api", label: "API" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold text-slate-900">
          PPP
        </a>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/rwieruch/purchasing-power-parity"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 md:block"
        >
          GitHub
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-600 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-200 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/rwieruch/purchasing-power-parity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600"
            >
              GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
