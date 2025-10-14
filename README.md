
# HomeRentals (React + TS + Tailwind + Axios + json-server)

A simple listings app implementing **GET, POST, PUT, DELETE** against `json-server`.

## Quick Start

```bash
npm install
npm run dev
```
This starts **Vite** (client at http://localhost:5173) and **json-server** (API at http://localhost:5174) concurrently.

> If ports are busy, edit them in `vite.config.ts` and `package.json` (dev:api script).

## API

- `GET /homes` – list
- `GET /homes/:id` – detail
- `POST /homes` – create
- `PUT /homes/:id` – update
- `DELETE /homes/:id` – delete

Base URL: `http://localhost:5174` (configured in `src/api/axios.ts`)

## Pages

- `/` – list view with search
- `/homes/:id` – detail view with delete
- `/homes/new` – create form
- `/homes/:id/edit` – edit form

## Type

```ts
export type Home = {
  id?: number
  title: string
  description: string
  pricePerNight: number
  location: string
  imageUrl: string
  guests: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
}
```

## Tech

- React + TypeScript (Vite)
- TailwindCSS
- Axios + React Router
- json-server + concurrently
```

# homerentals
