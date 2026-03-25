const API_BASE_URL = 'http://localhost:3000';

async function sendRequest(path, options) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error(
      'Cannot connect to the travel API at http://localhost:3000. Start the backend with "npm run dev:server" or run both apps with "npm run dev:all".'
    );
  }

  let resData = {};

  try {
    resData = await response.json();
  } catch {
    resData = {};
  }

  if (!response.ok) {
    throw new Error(resData.message || 'Request failed.');
  }

  return resData;
}

export async function fetchAvailablePlaces() {
  const resData = await sendRequest('/places');
  return resData.places;
}

export async function fetchUserPlaces() {
  const resData = await sendRequest('/user-places');
  return resData.places;
}

export async function updateUserPlaces(places) {
  const resData = await sendRequest('/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return resData.message;
}

export function getPlaceImageUrl(imageSrc) {
  return `${API_BASE_URL}/${imageSrc}`;
}
