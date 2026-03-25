function toRad(value) {
  return (value * Math.PI) / 180;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export function formatDistance(distance) {
  if (distance == null) {
    return null;
  }

  if (distance < 10) {
    return `${distance.toFixed(1)} km away`;
  }

  return `${Math.round(distance)} km away`;
}

export function sortPlacesByDistance(places, lat, lon) {
  const sortedPlaces = places.map((place) => ({
    ...place,
    distance: calculateDistance(lat, lon, place.lat, place.lon),
  }));

  sortedPlaces.sort((a, b) => {
    return a.distance - b.distance;
  });

  return sortedPlaces;
}
