<<<<<<< HEAD
# autivora
=======
# MVP - Tablica ogłoszeń

Monorepo zawierające frontend, backend, moduł uwierzytelniania, płatności oraz konfigurację do deployu.  
Celem projektu jest przygotowanie minimalnej działającej wersji (MVP) tablicy ogłoszeń.

---

## 📂 Struktura repozytorium

mvp-board/
│
├── apps/
│ ├── frontend/ # Next.js (UI)
│ ├── backend/ # API (Node/Express/Nest)
│
├── packages/
│ ├── auth/ # logika uwierzytelniania
│ ├── payments/ # integracje płatności
│
├── deploy/ # configi do hostingu (Docker, Vercel, Railway itp.)
│
├── .env.example # wzór pliku konfiguracyjnego
├── package.json # główny package.json z workspace'ami
├── README.md # instrukcja uruchomienia


---

## ⚙️ Wymagania

- **Node.js**: `>=18.0.0`  
- **npm**: `>=9`  
- **Next.js**: `14.x` (dla frontend)  
- **Express/Nest**: `^10` (dla backend)  

---

## 🚀 Instrukcja uruchomienia (PowerShell)

```powershell
# 1. Klonowanie repo
git clone https://github.com/TwojUser/mvp-board.git
cd mvp-board

# 2. Instalacja zależności (workspace)
npm install

# 3. Utworzenie pliku .env
Copy-Item .env.example .env

# 4. Uruchomienie frontend
cd apps/frontend
npm run dev

# 5. Uruchomienie backend (w nowej sesji PowerShell)
cd ../../apps/backend
npm run dev
>>>>>>> 7187495 (Czysty commit MVP (bez node_modules))
