// components/AdDetailsCarousel.tsx
import { useState, useEffect } from "react";

type Props = {
  images: string[];
  title: string;
  autoPlay?: boolean;
  interval?: number;
  watermarkText?: string; // np. "autivora.pl"
  watermarkLogo?: string; // np. "/logo.png"
};

export default function AdDetailsCarousel({
  images,
  title,
  autoPlay = true,
  interval = 5000,
  watermarkText = "autivora.pl",
  watermarkLogo = "/logo.png", // <- podmień na swoje logo
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Dodajemy reklamę jako ostatnie "zdjęcie"
  const fullImages = [
    ...images,
    "/banner_autivora.png", // <- tu wrzuć grafikę reklamową Twojej strony
  ];

  // Autoplay z pauzowaniem na hoverze
  useEffect(() => {
    if (!autoPlay || fullImages.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === fullImages.length - 1 ? 0 : prev + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, fullImages.length, isHovered]);

  if (!fullImages || fullImages.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 grid place-items-center text-gray-400 rounded-2xl">
        Brak zdjęcia
      </div>
    );
  }

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? fullImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === fullImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Obrazki */}
      <div className="relative h-[450px] sm:h-[350px] overflow-hidden rounded-2xl shadow-md">
        {fullImages.map((src, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              idx === currentIndex
                ? "opacity-100 translate-x-0"
                : idx < currentIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <img
              src={src}
              alt={`${title} - ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Watermark na zdjęciach użytkownika */}
            {idx < images.length && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/50 text-white text-xs px-3 py-2 rounded-lg">
                <img
                  src={watermarkLogo}
                  alt="logo"
                  className="h-4 w-4 object-contain"
                />
                <span className="font-semibold">{watermarkText}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Strzałki */}
      {fullImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-1 rounded-full hover:bg-black/70 transition"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-1 rounded-full hover:bg-black/70 transition"
          >
            ▶
          </button>
        </>
      )}

      {/* Wskaźniki (dots) */}
      {fullImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {fullImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentIndex ? "bg-blue-500" : "bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Miniaturki */}
      {fullImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 overflow-x-auto pb-2">
          {fullImages.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="shrink-0"
            >
              <img
                src={url}
                alt={`mini ${idx}`}
                className={`h-16 w-24 object-cover rounded-md border-2 transition ${
                  idx === currentIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
