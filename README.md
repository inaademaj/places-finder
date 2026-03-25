# Places Finder App

Places Finder is a small full-stack travel planning project built with React and Express. The frontend fetches destination data from a local backend, optionally uses the browser's geolocation API to rank places by distance, and lets users build a personal saved itinerary that is persisted on the server.

This project is useful for practicing:

- HTTP requests in React
- Loading, error, and empty states
- Working with browser geolocation
- Sorting fetched data on the client
- Sending `GET` and `PUT` requests to a backend
- Managing optimistic UI updates with rollback on failure

## Demo Overview

The app is split into two main sections:

- `Saved itinerary`: destinations the user has already selected
- `Smart holiday suggestions`: available destinations fetched from the backend

When location access is allowed, the suggestion list is reordered from nearest to farthest. When location access is denied, unavailable, or times out, the app still works and falls back to the full curated destination list.

Selecting a destination adds it to the saved itinerary. Removing a saved destination opens a confirmation modal before updating the backend.

## Features

- Fetches destination data from a local Express API
- Loads previously saved places from the backend on startup
- Uses browser geolocation to sort destinations by proximity
- Falls back gracefully when geolocation is denied or unavailable
- Prevents duplicate saved destinations
- Uses optimistic updates when adding or removing places
- Rolls back UI changes if a backend update fails
- Displays clear loading, sync, and request error states
- Serves place images directly from the backend

## Tech Stack

- Frontend: React 19 + Vite
- Backend: Express 4
- Data storage: local JSON files
- Styling: plain CSS
- Runtime: Node.js

## Project Structure

```text
.
├── backend/
│   ├── app.js                 # Express server
│   ├── data/
│   │   ├── places.json        # Available destination dataset
│   │   └── user-places.json   # Persisted saved itinerary
│   ├── images/                # Place images served statically
│   └── package.json
├── public/
├── scripts/
│   └── dev.js                 # Runs frontend and backend together
├── src/
│   ├── components/            # UI building blocks
│   ├── App.jsx                # Main application flow
│   ├── http.js                # API request helpers
│   ├── loc.js                 # Distance calculation and formatting
│   ├── placeDetails.js        # Extra UI metadata per place
│   └── main.jsx
├── package.json
└── README.md
```

## How It Works

### 1. Initial page load

When the app starts, it sends a request to:

- `GET /user-places`

This populates the saved itinerary shown on the left side of the UI.

### 2. Loading available destinations

The app then requests:

- `GET /places`

These places are displayed in the discovery section. If geolocation is available, the list is sorted on the frontend using latitude and longitude values from the dataset.

### 3. Geolocation-based sorting

The file `src/loc.js` contains the distance calculation logic. It uses a Haversine-style calculation to estimate the distance between the user's current coordinates and each destination.

If location access fails, the app does not break. Instead, it shows a helpful fallback message and renders the unsorted list.

### 4. Saving and removing places

When a user adds or removes a destination, the frontend updates its UI immediately and sends:

- `PUT /user-places`

If the request fails, the app restores the previous state and shows an error modal.

## API Endpoints

The Express server runs on `http://localhost:3000` and exposes the following endpoints:

## Getting Started

### Install dependencies

Install frontend dependencies in the project root:

```bash
npm install
```

Install backend dependencies:

```bash
npm install --prefix backend
```

## Running The Project

### Start frontend and backend together

```bash
npm run dev:all
```

This starts:

- Vite frontend on its default local development port
- Express backend on `http://localhost:3000`

### Start only the frontend

```bash
npm run dev
```

### Start only the backend

```bash
npm run dev
```

The frontend is configured to call the backend directly at:

```text
http://localhost:3000
```

## License

This project is for learning and personal practice.
