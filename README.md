# Places Finder App

A React travel planner that fetches destination suggestions from a local Express API, ranks them by the user's current location, and lets the user build a saved holiday shortlist.

## Features

- Fetches destinations from a backend API
- Sorts recommendations by distance when location access is available
- Handles loading, permission, empty, and error states
- Lets users save and remove destinations from their itinerary
- Uses reusable UI pieces such as `Modal`, `Error`, and destination cards

## Project Structure

- `src/`: React frontend
- `backend/`: Express API and image/data files

## Run The Project

Install both parts first:

```bash
npm install
npm install --prefix backend
```

Then run everything together:

```bash
npm run dev:all
```

You can also run them separately:

```bash
npm run dev:client
npm run dev:server
```

## Common Issue

If you see `ERR_CONNECTION_REFUSED`, the frontend is running but the backend API is not. Start the backend with:

```bash
npm run dev:server
```

or run both apps together with:

```bash
npm run dev:all
```
