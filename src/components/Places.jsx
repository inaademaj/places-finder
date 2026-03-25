import { getPlaceImageUrl } from '../http.js';
import { formatDistance } from '../loc.js';
import { getPlaceDetails } from '../placeDetails.js';

export default function Places({
  eyebrow,
  title,
  description,
  places,
  fallbackText,
  onSelectPlace,
  loadingText,
  isLoading,
  action,
  kind = 'discover',
}) {
  const actionLabel =
    kind === 'saved' ? 'Remove from itinerary' : 'Add to itinerary';

  return (
    <section className="places-category">
      <div className="section-heading">
        <div>
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        {action ? <div className="section-action">{action}</div> : null}
      </div>

      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => {
            const details = getPlaceDetails(place);

            return (
              <li key={place.id} className="place-item">
                <button
                  type="button"
                  className="place-card"
                  onClick={() => onSelectPlace(place)}
                >
                  <div className="place-card-image-wrapper">
                    <img
                      src={getPlaceImageUrl(place.image.src)}
                      alt={place.image.alt}
                    />
                    <div className="place-card-badges">
                      <span>{details.region}</span>
                      {place.distance != null ? (
                        <span>{formatDistance(place.distance)}</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="place-card-content">
                    <div className="place-card-meta">
                      <p>{details.vibe}</p>
                      <p>{details.stay}</p>
                    </div>

                    <h3>{place.title}</h3>
                    <p className="place-card-copy">{details.blurb}</p>

                    <div className="place-card-footer">
                      <span>{actionLabel}</span>
                      <span className="place-card-arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
