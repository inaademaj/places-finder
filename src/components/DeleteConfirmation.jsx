export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div id="delete-confirmation">
      <p className="dialog-kicker">Update itinerary</p>
      <h2>Remove this destination?</h2>
      <p>
        This will take the place out of your saved travel list. You can always
        add it back later from the recommendations section.
      </p>
      <div id="confirmation-actions">
        <button type="button" onClick={onCancel} className="button button-secondary">
          Keep it
        </button>
        <button type="button" onClick={onConfirm} className="button">
          Remove place
        </button>
      </div>
    </div>
  );
}
