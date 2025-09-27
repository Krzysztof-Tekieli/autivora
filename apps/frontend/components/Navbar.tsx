// apps/frontend/components/Navbar.tsx
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { MdDirectionsCar, MdPerson } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Tu podłączysz auth
  const isLoggedIn = false;

  const navLinks: { href: string; label: string }[] = [
    { href: "/ads", label: "Ogłoszenia" },
    { href: "/contact", label: "Kontakt" },
  ];

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md transition-all">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-2 rounded-md"
      >
        Przejdź do treści
      </a>

      <div className="flex items-center justify-between h-16 px-2 sm:px-4">
        {/* Lewa strona: logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-2xl sm:text-3xl tracking-tight text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity"
        >
          <MdDirectionsCar
            className="w-7 h-7 text-blue-500 dark:text-blue-300"
            {...({} as any)}
          />
          <span>AutiVora</span>
        </Link>

        {/* Prawa strona: linki + akcje */}
        <div className="hidden md:flex items-center gap-6">
          {/* Linki */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Przełącznik dark/light */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Zmień tryb kolorów"
          >
            {dark ? (
              <BsSun className="w-5 h-5 text-yellow-400" {...({} as any)} />
            ) : (
              <BsMoon
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                {...({} as any)}
              />
            )}
          </button>

          {/* Login / profil */}
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
            >
              <MdPerson className="w-5 h-5" {...({} as any)} />
              Mój profil
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all font-medium"
            >
              <MdPerson className="w-5 h-5" {...({} as any)} />
              Zaloguj się
            </Link>
          )}

          {/* Dodaj ogłoszenie */}
          <Link
            href="/add"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-all"
          >
            <span className="text-lg">+</span> Dodaj ogłoszenie
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setIsOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX size={28} {...({} as any)} /> : <HiMenu size={28} {...({} as any)} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 shadow-inner backdrop-blur-sm px-2 pt-2 pb-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Dark/Light toggle */}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-left"
          >
            {dark ? "☀️ Jasny motyw" : "🌙 Ciemny motyw"}
          </button>

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              👤 Mój profil
            </Link>
          ) : (
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              🔑 Zaloguj się
            </Link>
          )}

          <Link
            href="/add"
            className="block px-3 py-2 mt-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center font-medium hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            + Dodaj ogłoszenie
          </Link>
        </nav>
      )}
    </header>
  );
}
