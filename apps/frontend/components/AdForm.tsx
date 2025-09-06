// components/AdForm.tsx
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import PackageSelector from "./PackageSelector";
import { PackageTier } from "./helpers";

export default function AdForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [pkg, setPkg] = useState<PackageTier>("Basic");

  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Wysyłanie wielu plików do backendu
  const onFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    try {
      const res = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Błąd podczas wysyłania zdjęć");
      const data = await res.json();
      // Dokładamy nowe zdjęcia do już istniejących
      setImages(prev => [...prev, ...data.urls]);
      setCurrentImage(0); // ustawiamy pierwsze zdjęcie jako aktywne
    } catch (err) {
      console.error("Upload error", err);
      alert("Nie udało się wysłać zdjęć");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          brand,
          model,
          year,
          phone,
          images,
          packageType: pkg,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Błąd dodawania ogłoszenia");
      }

      await res.json();
      router.push(`/`);
    } catch (err: any) {
      console.error(err);
      alert("Nie udało się dodać ogłoszenia 😞\n" + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Karuzela zdjęć
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Tytuł i opis */}
          <div>
            <label className="block text-sm font-medium">Tytuł</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-2xl border px-3 py-2"
              placeholder="Np. Audi A4 B9 2.0 TDI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Opis</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-2xl border px-3 py-2"
              placeholder="Stan techniczny, wyposażenie, historia serwisowa..."
            />
          </div>

          {/* Cena, marka, model */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Cena (PLN)</label>
              <input
                required
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-2xl border px-3 py-2"
                placeholder="Np. 35000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Marka</label>
              <input
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 w-full rounded-2xl border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Model</label>
              <input
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="mt-1 w-full rounded-2xl border px-3 py-2"
              />
            </div>
          </div>

          {/* Rok, telefon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Rok</label>
              <input
                required
                type="number"
                min={1950}
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="mt-1 w-full rounded-2xl border px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Telefon</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Np. 600123456"
                className="mt-1 w-full rounded-2xl border px-3 py-2"
              />
            </div>
          </div>

          {/* Karuzela zdjęć */}
          <div>
            <label className="block text-sm font-medium mb-1">Zdjęcia</label>
            <div className="mt-1 flex items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) onFiles(Array.from(files));
                }}
                className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-2xl file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-white hover:file:bg-black"
              />
            </div>

            {images.length > 0 && (
              <div className="relative mt-3">
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={images[currentImage]}
                    alt={`Podgląd ${currentImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Strzałki */}
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full"
                >
                  ▶
                </button>

                {/* Wskaźniki */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${idx === currentImage ? "bg-white" : "bg-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pakiet + przycisk */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium mb-2">Wybierz pakiet</label>
          <PackageSelector value={pkg} onChange={setPkg} />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-gray-900 text-white py-3 font-semibold hover:bg-black"
          >
            {loading ? "Przetwarzanie..." : "Dodaj ogłoszenie"}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Kliknięcie przeniesie Cię do Stripe Checkout (w przyszłości).
          </p>
        </div>
      </div>
    </form>
  );
}
