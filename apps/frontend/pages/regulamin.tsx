// pages/regulamin.tsx
import React from "react";

export default function Regulamin() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-justify leading-relaxed">
      <h1 className="text-3xl font-bold mb-8 text-center">Regulamin serwisu AutiVora</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Niniejszy Regulamin określa zasady korzystania z serwisu ogłoszeniowego AutiVora,
        dostępnego pod adresem <strong>www.autivora.pl</strong>. Każdy użytkownik, korzystając
        z serwisu, akceptuje wszystkie postanowienia niniejszego Regulaminu.
      </p>

      {/* 1 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">1. Definicje</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Serwis</strong> – platforma internetowa AutiVora służąca do publikowania i przeglądania ogłoszeń.</li>
        <li><strong>Użytkownik</strong> – osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z serwisu.</li>
        <li><strong>Konto</strong> – zbiór danych przypisanych do użytkownika, umożliwiający korzystanie z funkcjonalności serwisu.</li>
        <li><strong>Ogłoszenie</strong> – treść zamieszczona w serwisie przez użytkownika w celu sprzedaży, kupna, wymiany lub promocji.</li>
        <li><strong>Administrator</strong> – właściciel i podmiot zarządzający serwisem [Twoja firma/nazwa].</li>
      </ul>

      {/* 2 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">2. Postanowienia ogólne</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Serwis działa w oparciu o przepisy prawa polskiego oraz prawo Unii Europejskiej.</li>
        <li>Celem serwisu jest umożliwienie użytkownikom publikacji i przeglądania ogłoszeń.</li>
        <li>Administrator zastrzega sobie prawo do wprowadzania zmian w serwisie oraz w niniejszym Regulaminie.</li>
      </ul>

      {/* 3 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">3. Rejestracja i konto</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Rejestracja konta jest dobrowolna i bezpłatna.</li>
        <li>Użytkownik zobowiązuje się do podania prawdziwych danych podczas rejestracji.</li>
        <li>Użytkownik ponosi pełną odpowiedzialność za działania wykonywane przy użyciu swojego konta.</li>
        <li>Administrator ma prawo zablokować lub usunąć konto naruszające regulamin.</li>
      </ul>

      {/* 4 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">4. Publikacja ogłoszeń</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Dodanie ogłoszenia jest możliwe po wypełnieniu formularza dostępnego w serwisie.</li>
        <li>Ogłoszenie musi być zgodne z prawem, dobrymi obyczajami i nie może naruszać praw osób trzecich.</li>
        <li>Zakazane jest publikowanie treści obraźliwych, wprowadzających w błąd, promujących nielegalne działania.</li>
        <li>Administrator ma prawo odmówić publikacji lub usunąć ogłoszenie bez podania przyczyny.</li>
        <li>Ogłoszenia mogą być moderowane przed publikacją lub w trakcie ich wyświetlania.</li>
      </ul>

      {/* 5 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">5. Płatności i pakiety</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Dodawanie podstawowych ogłoszeń może być bezpłatne. Dodatkowe opcje promowania są płatne zgodnie z cennikiem.</li>
        <li>Użytkownik może wykupić płatne pakiety zwiększające widoczność ogłoszeń.</li>
        <li>Płatności obsługiwane są przez zewnętrznych operatorów i realizowane w sposób bezpieczny.</li>
        <li>Użytkownik otrzymuje potwierdzenie płatności w formie elektronicznej.</li>
      </ul>

      {/* 6 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">6. Prawa i obowiązki użytkowników</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Użytkownik zobowiązany jest do korzystania z serwisu zgodnie z obowiązującym prawem i zasadami etyki.</li>
        <li>Użytkownik nie może podejmować działań zmierzających do zakłócenia funkcjonowania serwisu.</li>
        <li>Użytkownik ponosi odpowiedzialność za wszystkie treści, które publikuje.</li>
        <li>Użytkownik ma prawo do zgłaszania nadużyć i nieprawidłowości w serwisie.</li>
      </ul>

      {/* 7 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">7. Odpowiedzialność administratora</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Administrator nie odpowiada za treści publikowane przez użytkowników.</li>
        <li>Administrator nie jest stroną transakcji zawieranych między użytkownikami.</li>
        <li>Administrator nie ponosi odpowiedzialności za ewentualne szkody wynikające z korzystania z serwisu.</li>
        <li>Administrator zobowiązuje się do zapewnienia możliwie najwyższej dostępności serwisu.</li>
      </ul>

      {/* 8 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">8. Ochrona danych osobowych</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Administrator przetwarza dane osobowe użytkowników zgodnie z obowiązującymi przepisami prawa.</li>
        <li>Szczegółowe informacje dotyczące przetwarzania danych znajdują się w <a href="/polityka-prywatnosci" className="text-blue-600 hover:underline">Polityce Prywatności</a>.</li>
        <li>Użytkownik ma prawo do wglądu, poprawiania i usuwania swoich danych osobowych.</li>
      </ul>

      {/* 9 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">9. Reklamacje</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Reklamacje dotyczące działania serwisu można zgłaszać za pomocą formularza kontaktowego.</li>
        <li>Administrator rozpatruje reklamacje w terminie 14 dni roboczych.</li>
        <li>Odpowiedź na reklamację przesyłana jest drogą elektroniczną.</li>
      </ul>

      {/* 10 */}
      <h2 className="text-xl font-semibold mt-8 mb-3">10. Postanowienia końcowe</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Regulamin dostępny jest bezpłatnie na stronie serwisu.</li>
        <li>Administrator zastrzega sobie prawo do zmiany Regulaminu, o czym użytkownicy będą informowani z 7-dniowym wyprzedzeniem.</li>
        <li>W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego.</li>
      </ul>

      <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 italic">
        Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}
      </p>
    </div>
  );
}
