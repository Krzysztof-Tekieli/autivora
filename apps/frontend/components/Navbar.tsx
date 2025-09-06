import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo po lewej */}
        <Link href="/" className="font-bold text-3xl tracking-tight">
          AutiVora
        </Link>

        {/* Nawigacja po prawej */}
        <nav className="flex items-center gap-8 text-sm">
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Ogłoszenia
          </Link>

          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors font-medium"
          >
            Kontakt
          </Link>

          <Link
            href="/add"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-1.5 bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
          >
            <span className="text-lg">+</span>
            Dodaj ogłoszenie
          </Link>
        </nav>
      </div>
    </header>
  );
}
