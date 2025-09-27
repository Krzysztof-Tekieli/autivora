import AdForm from "../components/AdForm";

export default function AddPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Dodaj ogłoszenie</h1>

      <section className="bg-white shadow-md rounded-xl p-6">
        <p className="text-gray-600 mb-4">
          Wypełnij formularz, aby dodać nowe ogłoszenie. Pola oznaczone <span className="text-red-500">*</span> są wymagane.
        </p>

        <AdForm />
      </section>
    </main>
  );
}
