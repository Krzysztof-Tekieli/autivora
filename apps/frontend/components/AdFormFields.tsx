// components/AdFormFields.tsx
import React from "react";

interface Props {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  price: string; // zmiana: było number | ""
  setPrice: (v: string) => void; // zmiana: było (v: number | "") => void
  brand: string;
  setBrand: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
  year: string; // zmiana: było number
  setYear: (v: string) => void; // zmiana: było (v: number) => void
  phone: string;
  setPhone: (v: string) => void;
  submitted?: boolean;
}

export default function AdFormFields({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  brand,
  setBrand,
  model,
  setModel,
  year,
  setYear,
  phone,
  setPhone,
  submitted = false,
}: Props) {
  const isError = (field: string, type: string) => {
    if (!submitted) return false;

    switch (type) {
      case "required":
        return !field.trim();
      case "description":
        return field.trim().length < 20;
      case "price":
        return !field.trim() || isNaN(Number(field)) || Number(field) <= 0;
      case "phone":
        return !/^\d{9,15}$/.test(field.replace(/\D/g, ""));
      case "year":
        return (
          !field.trim() ||
          isNaN(Number(field)) ||
          Number(field) < 1900 ||
          Number(field) > 3000
        );
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tytuł */}
      <div>
        <label className="block text-sm font-medium">Tytuł</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
            isError(title, "required") ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Np. Audi A4 B9 2.0 TDI"
        />
      </div>

      {/* Opis */}
      <div>
        <label className="block text-sm font-medium">Opis</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
            isError(description, "description")
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Stan techniczny, wyposażenie, historia serwisowa..."
        />
      </div>

      {/* Cena, Marka, Model */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Cena (PLN)</label>
          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
              isError(price, "price") ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Np. 35000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Marka</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
              isError(brand, "required") ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Np. Audi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
              isError(model, "required") ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Np. A4 B9"
          />
        </div>
      </div>

      {/* Rok i Telefon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Rok</label>
          <input
            type="text"
            inputMode="numeric"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
              isError(year, "year") ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Np. 2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Telefon</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Np. 600123456"
            className={`mt-1 w-full rounded-2xl border px-3 py-2 ${
              isError(phone, "phone") ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
