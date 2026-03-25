import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';
import { getPlaceDetails } from './placeDetails.js';

function App() {
  const selectedPlace = useRef();
  const initialFetchDone = useRef(false);
  const userPlacesRef = useRef([]);

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    userPlacesRef.current = userPlaces;
  }, [userPlaces]);

  useEffect(() => {
    if (initialFetchDone.current) {
      return;
    }

    initialFetchDone.current = true;

    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchUserPlaces();
        userPlacesRef.current = places;
        setUserPlaces(places);
      } catch (error) {
        setError({
          message: error.message || 'Failed to fetch your saved places.',
        });
      } finally {
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    selectedPlace.current = place;
    setModalIsOpen(true);
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(place) {
    const currentPlaces = userPlacesRef.current ?? [];

    if (currentPlaces.some((savedPlace) => savedPlace.id === place.id)) {
      return;
    }

    const nextPlaces = [place, ...currentPlaces];

    userPlacesRef.current = nextPlaces;
    setUserPlaces(nextPlaces);

    try {
      await updateUserPlaces(nextPlaces);
    } catch (error) {
      userPlacesRef.current = currentPlaces;
      setUserPlaces(currentPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to save this place.',
      });
    }
  }

  async function handleRemovePlace() {
    if (!selectedPlace.current) {
      return;
    }

    const currentPlaces = userPlacesRef.current ?? [];
    const nextPlaces = currentPlaces.filter(
      (place) => place.id !== selectedPlace.current.id
    );

    userPlacesRef.current = nextPlaces;
    setUserPlaces(nextPlaces);
    setModalIsOpen(false);

    try {
      await updateUserPlaces(nextPlaces);
    } catch (error) {
      userPlacesRef.current = currentPlaces;
      setUserPlaces(currentPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update your itinerary.',
      });
    }
  }

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  const nextDestination = userPlaces[0];
  const nextDestinationDetails = nextDestination
    ? getPlaceDetails(nextDestination)
    : null;

  return (
    <>
      <Modal open={Boolean(errorUpdatingPlaces)} onClose={handleError}>
        {errorUpdatingPlaces ? (
          <Error
            title="Sync problem"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        ) : null}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <div className="app-shell">
        <header className="hero">
          <div className="hero-copy">
            <div className="hero-brand">
              <img src={logoImg} alt="Stylized globe" />
              <p>Geo-guided travel planner</p>
            </div>
            <h1>Plan better getaways with location-aware holiday ideas.</h1>
            <p className="hero-text">
              This app uses live HTTP requests and your current position to rank
              memorable places nearby, then lets you build a saved itinerary in
              a single tap.
            </p>
            <div className="hero-stats">
              <article>
                <strong>{userPlaces.length}</strong>
                <span>saved destinations</span>
              </article>
              <article>
                <strong>GPS</strong>
                <span>ranked recommendations</span>
              </article>
              <article>
                <strong>Live</strong>
                <span>backend sync</span>
              </article>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="hero-panel-label">Next on your shortlist</p>
            <h2>{nextDestination ? nextDestination.title : 'Start your next itinerary'}</h2>
            <p>
              {nextDestinationDetails
                ? nextDestinationDetails.blurb
                : 'Save destinations you love and build a personal holiday board that stays synced with the backend.'}
            </p>
            <dl className="hero-panel-details">
              <div>
                <dt>Style</dt>
                <dd>{nextDestinationDetails ? nextDestinationDetails.vibe : 'Smart discovery'}</dd>
              </div>
              <div>
                <dt>Region</dt>
                <dd>{nextDestinationDetails ? nextDestinationDetails.region : 'Worldwide curation'}</dd>
              </div>
              <div>
                <dt>Best pace</dt>
                <dd>{nextDestinationDetails ? nextDestinationDetails.stay : 'Choose as you go'}</dd>
              </div>
            </dl>
          </aside>
        </header>

        <main className="content-grid">
          {error ? <Error title="An error occurred!" message={error.message} /> : null}

          {!error ? (
            <Places
              eyebrow="Saved itinerary"
              title="Places you want to visit"
              description="Keep your favorite destinations in one short list and remove them anytime."
              fallbackText="Select a place below to start building your travel shortlist."
              isLoading={isFetching}
              loadingText="Loading your itinerary..."
              places={userPlaces}
              onSelectPlace={handleStartRemovePlace}
              kind="saved"
            />
          ) : null}

          <AvailablePlaces
            onSelectPlace={handleSelectPlace}
            selectedPlaces={userPlaces}
          />
        </main>
      </div>
    </>
  );
}

export default App;
