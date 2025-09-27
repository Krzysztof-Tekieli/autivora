"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

export default function ContactPage() {
  const contactCards: { icon: IconType; title: string; value: string }[] = [
    { icon: FiPhone, title: "Telefon", value: "+48 123 456 789" },
    { icon: FiMail, title: "E-mail", value: "kontakt@autivora.pl" },
    { icon: FiMapPin, title: "Adres", value: "ul. Luksusowa 7, Warszawa" },
  ];

  const socialIcons: { icon: IconType; href: string; colorClass?: string }[] = [
    { icon: FiFacebook, href: "#", colorClass: "hover:text-blue-800" },
    { icon: FiInstagram, href: "#", colorClass: "hover:text-pink-600" },
    { icon: FiLinkedin, href: "#", colorClass: "hover:text-blue-700" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-28 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center px-6 relative z-10"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Skontaktuj się z nami ✨
          </h1>
          <p className="text-lg sm:text-xl text-blue-100">
            Masz pytania? Chcesz dowiedzieć się więcej o AutiVora? Jesteśmy tu, aby pomóc 🚀
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 blur-3xl animate-pulse"></div>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-20">
        {contactCards.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl text-center flex flex-col items-center gap-4 transition"
            >
              <div className="text-blue-600 dark:text-blue-400">
                {/* Użycie size zamiast className */}
                <Icon size={32} />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.value}</p>
            </motion.div>
          );
        })}
      </section>

      {/* Form + Map */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6">Wyślij wiadomość 📩</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Imię i nazwisko"
              className="p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Adres e-mail"
              className="p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <textarea
              rows={5}
              placeholder="Twoja wiadomość"
              className="p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              🚀 Wyślij wiadomość
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.678819471462!2d21.012229315800708!3d52.229675779757995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc6690d4a7ab%3A0x2d3f6e2d6a0f4a9!2sWarszawa!5e0!3m2!1spl!2spl!4v1670000000000"
            width="100%"
            height="100%"
            className="min-h-[400px] border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </section>

      {/* Socials */}
      <section className="text-center py-16 border-t dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-6">Znajdziesz nas też tutaj 🌍</h3>
        <div className="flex justify-center gap-6 text-2xl text-blue-600 dark:text-blue-400">
          {socialIcons.map((item, i) => {
            const Icon = item.icon;
            return (
              <a key={i} href={item.href} className={`${item.colorClass} transition`}>
                <Icon size={32} />
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
