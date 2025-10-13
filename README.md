# **🗺️ Places Finder App — Summary**

A React app that fetches and displays nearby places, sorted by the user’s current location. It includes error handling, modals, loading states, and confirmation dialogs.

### Main Features:

* Fetches available places from a backend API.

* Sorts results by distance using geolocation.

* Displays places with images and titles.

* Handles loading, empty, and error states.

* Includes reusable components like Modal, Error, and DeleteConfirmation.

### Key Components:

* AvailablePlaces: Fetches and shows sorted places.

* Places: Renders clickable place cards.

* DeleteConfirmation: Auto-timed confirmation dialog.

* Error: Displays error messages.

* Modal: General-purpose dialog wrapper.

### Utilities:

fetchAvailablePlaces() – fetches data.

sortPlacesByDistance() – sorts places by proximity.

### Run the App:
~~~~

npm install
npm run dev
~~~~

