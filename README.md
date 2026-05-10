# Evidence klientských poznatků

Školní full-stack projekt pro **Unicorn University**.

Aplikace slouží jako jednoduchý CRM systém pro evidenci klientů a poznatků, které se ke klientům vztahují.

## Funkce aplikace

- vytvoření klienta
- zobrazení seznamu klientů
- výběr klienta
- zobrazení detailu klienta
- přidání poznatku ke konkrétnímu klientovi
- zobrazení poznatků v tabulce
- filtrování poznatků podle kategorie
- vyhledávání v poznatcích
- mazání klientů a poznatků

## Entity

Projekt používá dvě propojené entity:

### Klient

Atributy:

- id
- name
- industry
- web
- note
- createdAt

### Poznatek

Atributy:

- id
- clientId
- title
- description
- category
- createdAt

Vztah:

```text
Klient 1:N Poznatek
```

Jeden klient může mít více poznatků. Jeden poznatek patří právě jednomu klientovi.

## Technologie

### Backend

- Node.js
- Express.js
- CommonJS modules
- JSON file storage
- CORS
- Nodemon
- crypto.randomUUID()
- new Date().toISOString()

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS 4
- shadcn/ui styl komponent
- Radix/shadcn dependencies

## Struktura projektu

```text
client-insights-app/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── data/
│   ├── dao/
│   ├── controllers/
│   ├── routes/
│   ├── validators/
│   └── utils/
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── components/ui/
    │   ├── layouts/
    │   ├── pages/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    └── vite.config.ts
```

## Spuštění projektu

Projekt se spouští ve dvou terminálech.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Backend běží na:

```text
http://localhost:3000
```

Kontrola backendu:

```bash
curl http://localhost:3000/clients
```

Očekávaná odpověď při prázdných datech:

```json
[]
```

### 2. Frontend

V druhém terminálu:

```bash
cd frontend
npm install
npm run dev
```

Frontend běží na:

```text
http://localhost:5173
```

Frontend komunikuje s backendem přes:

```text
VITE_API_BASE_URL=http://localhost:3000
```

Ukázka je v souboru:

```text
frontend/.env.example
```

## API endpointy

### Klienti

```text
POST   /clients
GET    /clients
GET    /clients/:id
PUT    /clients/:id
DELETE /clients/:id
```

Smazání klienta smaže i všechny jeho poznatky.

### Poznatky

```text
POST   /clients/:clientId/insights
GET    /clients/:clientId/insights
GET    /insights/:id
PUT    /insights/:id
DELETE /insights/:id
```

Filtrování poznatků:

```text
GET /clients/:clientId/insights?category=Produkt&search=text
```

## Poznámky k validaci

Klient:

- name je povinný
- web je nepovinný
- pokud je web vyplněný, musí být validní URL, například https://example.com

Poznatek:

- title je povinný
- description je povinný
- category je povinný

## Build a kontrola

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
node --check app.js
node --check server.js
```
