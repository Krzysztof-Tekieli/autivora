import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import {
  ArrowUp,
  Facebook,
  Instagram,
  X as XIcon,
  Linkedin,
  Mail,
} from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
          scrolled ? "shadow-md bg-white dark:bg-gray-800" : "bg-transparent"
        }`}
      >
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

/* ---------------- PREMIUM FOOTER ---------------- */
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & opis */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AutiVora
          </h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Najlepszy serwis ogłoszeniowy w Polsce – szybkie, bezpieczne i
            skuteczne ogłoszenia motoryzacyjne.
          </p>
        </div>

        {/* Dla użytkowników */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Dla użytkowników
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/add-ad" className="hover:underline transition">
                Dodaj ogłoszenie
              </Link>
            </li>
            <li>
              <Link href="/ads" className="hover:underline transition">
                Przeglądaj ogłoszenia
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:underline transition">
                Cennik i pakiety
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline transition">
                Pomoc / FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline transition">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        {/* Informacje prawne */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Informacje prawne
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/regulamin" className="hover:underline transition">
                Regulamin
              </Link>
            </li>
            <li>
              <Link
                href="/polityka-prywatnosci"
                className="hover:underline transition"
              >
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:underline transition">
                Polityka cookies
              </Link>
            </li>
            <li>
              <Link href="/rodo" className="hover:underline transition">
                RODO
              </Link>
            </li>
          </ul>
        </div>

        {/* Social media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Bądźmy w kontakcie
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Śledź nas w social media i bądź na bieżąco z nowościami.
          </p>
          <div className="flex gap-3">
            <SocialIcon href="https://facebook.com" Icon={Facebook} color="text-blue-600" />
            <SocialIcon href="https://instagram.com" Icon={Instagram} color="text-pink-600" />
            <SocialIcon href="https://x.com" Icon={XIcon} color="text-black dark:text-white" />
            <SocialIcon href="https://linkedin.com" Icon={Linkedin} color="text-indigo-600" />
            <SocialIcon href="mailto:u4246116278@gmail.com" Icon={Mail} color="text-red-500" />
          </div>
        </div>
      </div>

      {/* Dolna belka */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>© {new Date().getFullYear()} AutiVora. Wszelkie prawa zastrzeżone.</span>
          <span className="mt-2 sm:mt-0">Made with ❤️ by AutiVora Team</span>
        </div>
      </div>
    </footer>
  );
};

/* ---------------- SOCIAL ICON ---------------- */
const SocialIcon: React.FC<{ href: string; Icon: any; color: string }> = ({
  href,
  Icon,
  color,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transform transition ${color}`}
  >
    <Icon size={20} />
  </a>
);

/* ---------------- SCROLL TO TOP ---------------- */
const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default Layout;
