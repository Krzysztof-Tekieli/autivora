import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const { adId, package: pkg } = router.query;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Finalizacja zakupu</h1>

      {adId && pkg ? (
        <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <p className="text-gray-700">
            Potwierdź zakup pakietu <span className="font-semibold">{pkg}</span> dla ogłoszenia <span className="font-semibold">#{adId}</span>.
          </p>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-gray-600 text-sm mb-2">Podsumowanie płatności:</p>
            <ul className="text-gray-800">
              <li>Ogłoszenie ID: {adId}</li>
              <li>Wybrany pakiet: {pkg}</li>
              <li>Cena: <span className="font-bold">do ustalenia</span></li>
            </ul>
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            onClick={() => alert("Tutaj integracja Stripe")}
          >
            Przejdź do płatności
          </button>
        </section>
      ) : (
        <p className="text-red-500">Brak danych ogłoszenia lub pakietu.</p>
      )}
    </main>
  );
}
