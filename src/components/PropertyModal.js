import { useEffect } from "react";
import "./PropertyModal.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

function PropertyModal({ property, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="property-modal__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="property-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`property-modal-title-${property.id}`}
      >
        <button
          className="property-modal__close"
          type="button"
          aria-label="Close property details"
          onClick={onClose}
          autoFocus
        >
          ×
        </button>
        <img
          className="property-modal__image"
          src={property.image}
          alt={`Home at ${property.address}, ${property.city}`}
        />
        <div className="property-modal__content">
          <p className="property-card__price">{formatPrice(property.price)}</p>
          <h2 id={`property-modal-title-${property.id}`}>{property.address}</h2>
          <p className="property-card__city">{property.city}</p>
          <p className="property-card__facts">
            {property.beds} beds <span aria-hidden="true">|</span>{" "}
            {property.baths} baths <span aria-hidden="true">|</span>{" "}
            {property.sqft.toLocaleString()} sqft
          </p>
          <p className="property-modal__description">{property.description}</p>
        </div>
      </section>
    </div>
  );
}

export default PropertyModal;
