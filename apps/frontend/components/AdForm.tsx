// components/AdForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

// Komponenty podrzędne
import AdFormFields from "./AdFormFields";
import ImageUploader from "./ImageUploader";
import PackageChooser from "./PackageChooser";
import { PackageTier } from "./helpers";

export default function AdForm() {
  const router = useRouter();

  // Dane formularza
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>(""); // zmiana na string
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>(""); // zmiana na string
  const [phone, setPhone] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [pkg, setPkg] = useState<PackageTier>("Basic");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Obsługa wysyłki formularza
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Walidacja
    if (
      !title ||
      !description ||
      price.trim() === "" ||
      isNaN(Number(price)) ||
      Number(price) <= 0 ||
      !brand ||
      !model ||
      !phone ||
      !year ||
      isNaN(Number(year)) ||
      Number(year) < 1900 ||
      Number(year) > 3000
    ) {
      return;
    }

    if (images.length === 0) {
      alert("Dodaj przynajmniej jedno zdjęcie!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("year", year);
      formData.append("phone", phone);
      formData.append("packageType", pkg);
      images.forEach((file) => formData.append("images", file));

      const res = await fetch("http://localhost:3001/api/ads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Błąd dodawania ogłoszenia");
      }

      router.push(`/`);
    } catch (err: any) {
      alert("Nie udało się dodać ogłoszenia 😞\n" + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdFormFields
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            brand={brand}
            setBrand={setBrand}
            model={model}
            setModel={setModel}
            year={year}
            setYear={setYear}
            phone={phone}
            setPhone={setPhone}
            submitted={submitted}
          />

          <ImageUploader
            images={images}
            setImages={setImages}
            submitted={submitted}
          />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <PackageChooser pkg={pkg} setPkg={setPkg} />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gray-900 text-white py-3 font-semibold hover:bg-black disabled:opacity-50 transition-colors"
          >
            {loading ? "Przetwarzanie..." : "Przejdź do płatności"}
          </button>
        </div>
      </div>
    </form>
  );
}
