// pages/polityka-prywatnosci.tsx
import React from "react";

export default function PolitykaPrywatnosci() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-justify leading-relaxed">
      <h1 className="text-3xl font-bold mb-8 text-center">Polityka prywatności serwisu AutiVora</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Niniejsza Polityka prywatności określa zasady przetwarzania i ochrony
        danych osobowych użytkowników serwisu <strong>AutiVora</strong>, działającego pod adresem{" "}
        <strong>www.autivora.pl</strong>, zgodnie z Rozporządzeniem Parlamentu
        Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO),
        ustawą o ochronie danych osobowych oraz innymi obowiązującymi przepisami prawa.
      </p>

      {/* 1 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">1. Administrator danych</h2>
      <p className="mb-6">
        Administratorem danych osobowych jest <strong>[Twoja firma/nazwa]</strong>, z siedzibą w{" "}
        <strong>[adres]</strong>. W sprawach związanych z ochroną danych
        osobowych można kontaktować się pod adresem e-mail:{" "}
        <strong>[email@example.com]</strong>.
      </p>

      {/* 2 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">2. Zakres przetwarzanych danych</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Dane podawane dobrowolnie przez użytkowników (np. imię, nazwisko, adres e-mail, numer telefonu).</li>
        <li>Dane niezbędne do realizacji usług (np. informacje o transakcjach, ogłoszeniach).</li>
        <li>Dane techniczne automatycznie zbierane (np. adres IP, pliki cookies, dane o urządzeniu i przeglądarce).</li>
        <li>Dane lokalizacyjne – wyłącznie za zgodą użytkownika.</li>
      </ul>

      {/* 3 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">3. Cele przetwarzania danych</h2>
      <p className="mb-6">
        Dane osobowe są przetwarzane na podstawie art. 6 ust. 1 lit. a–f RODO w
        następujących celach:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Świadczenie usług elektronicznych i umożliwienie korzystania z serwisu.</li>
        <li>Obsługa konta użytkownika i publikacja ogłoszeń.</li>
        <li>Realizacja płatności i usług dodatkowych.</li>
        <li>Kontakt z użytkownikami i udzielanie odpowiedzi na zapytania.</li>
        <li>Zapewnienie bezpieczeństwa i przeciwdziałanie nadużyciom.</li>
        <li>Marketing własny (newsletter, powiadomienia) – tylko za zgodą użytkownika.</li>
      </ul>

      {/* 4 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">4. Podstawy prawne przetwarzania</h2>
      <p className="mb-6">
        Dane są przetwarzane zgodnie z przepisami prawa, w szczególności:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>art. 6 ust. 1 lit. a RODO – zgoda osoby, której dane dotyczą,</li>
        <li>art. 6 ust. 1 lit. b RODO – niezbędność do wykonania umowy,</li>
        <li>art. 6 ust. 1 lit. c RODO – obowiązki prawne administratora,</li>
        <li>art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes administratora (np. zapobieganie oszustwom).</li>
      </ul>

      {/* 5 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">5. Pliki cookies i technologie śledzące</h2>
      <p className="mb-6">
        Serwis wykorzystuje pliki cookies w celach:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>zapewnienia prawidłowego działania strony,</li>
        <li>zapamiętywania preferencji użytkownika,</li>
        <li>tworzenia statystyk odwiedzin i analizy ruchu (np. Google Analytics),</li>
        <li>personalizacji treści i reklam (za zgodą użytkownika).</li>
      </ul>

      {/* 6 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">6. Odbiorcy danych</h2>
      <p className="mb-6">
        Dane użytkowników mogą być przekazywane podmiotom współpracującym z
        administratorem wyłącznie w zakresie niezbędnym do realizacji usług
        (np. operatorom płatności, firmom IT, kancelariom prawnym).
      </p>

      {/* 7 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">7. Prawa użytkowników</h2>
      <p className="mb-6">Zgodnie z RODO użytkownik ma prawo do:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>dostępu do swoich danych (art. 15 RODO),</li>
        <li>sprostowania danych (art. 16 RODO),</li>
        <li>usunięcia danych – „prawo do bycia zapomnianym” (art. 17 RODO),</li>
        <li>ograniczenia przetwarzania (art. 18 RODO),</li>
        <li>przenoszenia danych (art. 20 RODO),</li>
        <li>wniesienia sprzeciwu wobec przetwarzania (art. 21 RODO),</li>
        <li>cofnięcia zgody na przetwarzanie danych w dowolnym momencie.</li>
      </ul>

      {/* 8 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">8. Okres przechowywania danych</h2>
      <p className="mb-6">
        Dane osobowe są przechowywane przez okres niezbędny do realizacji usług
        i obowiązków prawnych, a w przypadku danych przetwarzanych na podstawie
        zgody – do momentu jej wycofania.
      </p>

      {/* 9 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">9. Środki bezpieczeństwa</h2>
      <p className="mb-6">
        Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu
        ochrony danych osobowych przed nieuprawnionym dostępem, utratą lub zniszczeniem,
        m.in. szyfrowanie, certyfikaty SSL, systemy zapobiegania włamaniom.
      </p>

      {/* 10 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">10. Zmiany polityki prywatności</h2>
      <p className="mb-6">
        Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej
        Polityce prywatności. Aktualna wersja dokumentu jest zawsze dostępna na stronie serwisu.
      </p>

      <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 italic">
        Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
      </p>
    </div>
  );
}
