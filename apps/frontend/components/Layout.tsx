import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Główny content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 p-4 text-center border-t border-gray-200 mt-auto">
        © {new Date().getFullYear()} AutiVora
      </footer>
    </div>
  );
};

export default Layout;
