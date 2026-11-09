import { useState } from "react";
import PropertyModal from "./PropertyModal";
import "./PropertyCard.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

function PropertyCard({
  property,
  isFavorite: favoriteProp,
  onToggleFavorite,
}) {
  const [favoriteState, setFavoriteState] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isFavorite = favoriteProp ?? favoriteState;

  const toggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(property);
    } else {
      setFavoriteState((favorite) => !favorite);
    }
  };

  return (
    <>
      <article className="property-card">
        <div className="property-card__image-wrap">
          <img
            className="property-card__image"
            src={property.image}
            alt={`Home at ${property.address}, ${property.city}`}
            loading="lazy"
          />
          <button
            className={`property-card__favorite${isFavorite ? " is-favorite" : ""}`}
            type="button"
            aria-label={
              isFavorite
                ? `Remove ${property.address} from favorites`
                : `Add ${property.address} to favorites`
            }
            aria-pressed={isFavorite}
            onClick={toggleFavorite}
          >
            <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
          </button>
        </div>
        <div className="property-card__content">
          <p className="property-card__price">{formatPrice(property.price)}</p>
          <p className="property-card__facts">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </p>
          <h2 className="property-card__address">{property.address}</h2>
          <p className="property-card__city">{property.city}</p>
          <button
            className="property-card__details-button"
            type="button"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </button>
        </div>
      </article>

      {showDetails && (
        <PropertyModal
          property={property}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

export default PropertyCard;
