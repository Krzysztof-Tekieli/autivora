// components/ImageUploader.tsx
import React, { useState } from "react";

interface Props {
  images: File[];
  setImages: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  submitted?: boolean;
}

export default function ImageUploader({
  images,
  setImages,
  maxFiles = 10,
  maxSizeMB = 5,
  submitted = false,
}: Props) {
  const [error, setError] = useState<string>("");

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: File[] = [];
    let errorMsg = "";

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        errorMsg = "Tylko pliki graficzne są akceptowane";
        return;
      }

      if (file.size / 1024 / 1024 > maxSizeMB) {
        errorMsg = `Plik ${file.name} przekracza ${maxSizeMB} MB`;
        return;
      }

      if (images.length + newFiles.length >= maxFiles) {
        errorMsg = `Możesz dodać maksymalnie ${maxFiles} plików`;
        return;
      }

      newFiles.push(file);
    });

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setImages([...images, ...newFiles]);
    setError("");
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const showError = submitted && images.length === 0;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Zdjęcia</label>

      {/* Ukryty input */}
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Ładny przycisk */}
      <label
        htmlFor="file-input"
        className={`cursor-pointer inline-block rounded-2xl bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300 ${
          showError ? "border border-red-500" : ""
        }`}
      >
        Dodaj zdjęcia
      </label>

      {(error || showError) && (
        <p className="text-red-500 text-sm mt-1">
          {error || "Dodaj przynajmniej jedno zdjęcie!"}
        </p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
          {images.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-20 object-cover rounded-2xl"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-200"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-gray-500 text-sm">
        Maksymalnie {maxFiles} zdjęć, każde do {maxSizeMB} MB
      </p>
    </div>
  );
}
