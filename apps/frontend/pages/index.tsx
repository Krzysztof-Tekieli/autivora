import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-center py-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Twoje wymarzone auto w <span className="text-yellow-300">zasięgu ręki</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-blue-100">
            Najszybsza, najbardziej przejrzysta i luksusowa platforma do przeglądania samochodów.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/ads"
              className="px-6 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:bg-gray-100 transition"
            >
              🚗 Przeglądaj samochody
            </Link>
            <Link
              href="/add"
              className="px-6 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              + Dodaj ogłoszenie
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto -mt-12 relative z-20 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          🔍 Szybkie wyszukiwanie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <input type="text" placeholder="Kategoria" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="text" placeholder="Marka" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="text" placeholder="Model" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="number" placeholder="Rok od" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="number" placeholder="Rok do" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="number" placeholder="Cena od" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="number" placeholder="Cena do" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="text" placeholder="Paliwo" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <input type="text" placeholder="Skrzynia" className="p-3 rounded-full border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"/>
          <button className="bg-blue-600 text-white font-semibold p-3 rounded-full hover:bg-blue-700 transition">
            Szukaj
          </button>
        </div>
      </section>

      {/* Polecane samochody */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          🌟 Polecane samochody
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { name: "BMW X5", price: "450 000 PLN", img: "https://source.unsplash.com/800x600/?bmw" },
            { name: "Toyota Corolla", price: "120 000 PLN", img: "https://source.unsplash.com/800x600/?toyota" },
            { name: "Audi A4", price: "200 000 PLN", img: "https://source.unsplash.com/800x600/?audi" },
            { name: "Mercedes C-Class", price: "250 000 PLN", img: "https://source.unsplash.com/800x600/?mercedes" },
            { name: "Honda Civic", price: "110 000 PLN", img: "https://source.unsplash.com/800x600/?honda" },
          ].map((car) => (
            <motion.div
              key={car.name}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 transition-all"
            >
              <img src={car.img} alt={car.name} className="w-full h-48 object-cover"/>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{car.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{car.price}</p>
                <Link
                  href="/ads"
                  className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Szczegóły
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
