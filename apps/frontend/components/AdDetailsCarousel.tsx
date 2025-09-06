// components/AdDetailsCarousel.tsx
import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function AdDetailsCarousel({ images, title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-100 grid place-items-center text-gray-400 rounded-2xl">
        Brak zdjęcia
      </div>
    );
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <img
        src={images[currentIndex]}
        alt={`${title} - ${currentIndex + 1}`}
        className="w-full h-[400px] object-cover rounded-2xl shadow-md"
      />

      {/* Strzałki */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          >
            ▶
          </button>
        </>
      )}

      {/* Miniaturki */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {images.map((url, idx) => (
            <button key={idx} onClick={() => setCurrentIndex(idx)}>
              <img
                src={url}
                alt={`mini ${idx}`}
                className={`h-16 w-24 object-cover rounded-md border-2 ${
                  idx === currentIndex ? "border-blue-500" : "border-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
