import AdForm from "../components/AdForm";

export default function AddPage() {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-4">Dodaj ogłoszenie</h1>
      <AdForm />
    </div>
  );
}
