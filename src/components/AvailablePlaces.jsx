import { useEffect, useRef, useState } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}

function getLocationFallback(error) {
  if (error?.code === 1) {
    return {
      label: 'Location access is off',
      message:
        'Recommendations are still available, but they are no longer ranked by distance until location permission is enabled.',
    };
  }

  if (error?.code === 2) {
    return {
      label: 'Location could not be determined',
      message:
        'We could not detect your current position, so the full curated destination list is shown instead.',
    };
  }

  if (error?.code === 3) {
    return {
      label: 'Location request timed out',
      message:
        'Your connection or device took too long to return a position, so the app fell back to the full destination list.',
    };
  }

  return {
    label: 'Location unavailable',
    message:
      error?.message ||
      'We could not use your position right now, so the recommendations are shown without distance ranking.',
  };
}

export default function AvailablePlaces({ onSelectPlace, selectedPlaces }) {
  const initialRequestDone = useRef(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [allPlaces, setAllPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const [locationStatus, setLocationStatus] = useState({
    label: 'Detecting your location',
    message:
      'We are ranking destinations from nearest to farthest using your current position.',
  });
  const [error, setError] = useState();

  useEffect(() => {
    if (refreshKey === 0 && initialRequestDone.current) {
      return;
    }

    initialRequestDone.current = true;

    let isCancelled = false;

    async function loadPlaces() {
      setIsFetching(true);
      setError(null);
      setUserLocation(undefined);
      setLocationStatus({
        label: 'Detecting your location',
        message:
          'We are ranking destinations from nearest to farthest using your current position.',
      });

      try {
        const places = await fetchAvailablePlaces();

        if (isCancelled) {
          return;
        }

        setAllPlaces(places);

        try {
          const position = await getCurrentPosition();

          if (isCancelled) {
            return;
          }

          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus({
            label: 'Distance ranking is live',
            message:
              'These destinations are sorted around your current position so nearby ideas rise to the top.',
          });
        } catch (geoError) {
          if (isCancelled) {
            return;
          }

          setUserLocation(null);
          setLocationStatus(getLocationFallback(geoError));
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setError({
          message:
            error.message ||
            'Could not fetch places, please try again later.',
        });
      } finally {
        if (!isCancelled) {
          setIsFetching(false);
        }
      }
    }

    loadPlaces();

    return () => {
      isCancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    const selectedPlaceIds = new Set(selectedPlaces.map((place) => place.id));
    const filteredPlaces = allPlaces.filter((place) => !selectedPlaceIds.has(place.id));

    if (userLocation) {
      setAvailablePlaces(
        sortPlacesByDistance(
          filteredPlaces,
          userLocation.latitude,
          userLocation.longitude
        )
      );
      return;
    }

    setAvailablePlaces(filteredPlaces);
  }, [allPlaces, selectedPlaces, userLocation]);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  const hasLocation = Boolean(userLocation);

  return (
    <Places
      eyebrow="Discover nearby"
      title="Smart holiday suggestions"
      description={
        hasLocation
          ? 'Fresh destination ideas sorted by distance from where you are right now.'
          : 'A curated travel list ready to explore even when location data is unavailable.'
      }
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching travel recommendations..."
      fallbackText="You have already saved every destination in this collection."
      onSelectPlace={onSelectPlace}
      kind="discover"
      action={
        <div className={`location-panel ${hasLocation ? 'location-panel--active' : ''}`}>
          <p className="location-panel-label">{locationStatus.label}</p>
          <p className="location-panel-copy">{locationStatus.message}</p>
          <button
            type="button"
            className="ghost-button"
            onClick={() => setRefreshKey((prevKey) => prevKey + 1)}
          >
            Refresh suggestions
          </button>
        </div>
      }
    />
  );
}
