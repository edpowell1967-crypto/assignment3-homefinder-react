import { useMemo, useState } from "react";
import properties from "./data/properties";
import PropertyCard from "./components/PropertyCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

function App() {
  const [citySearch, setCitySearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());

  const toggleFavorite = (property) => {
    setFavoriteIds((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);
      if (nextFavorites.has(property.id)) {
        nextFavorites.delete(property.id);
      } else {
        nextFavorites.add(property.id);
      }
      return nextFavorites;
    });
  };

  const filteredProperties = useMemo(() => {
    const cityQuery = citySearch.trim().toLowerCase();
    const minimum = minPrice === "" ? null : Number(minPrice);
    const maximum = maxPrice === "" ? null : Number(maxPrice);

    const matches = properties.filter((property) => {
      const matchesCity =
        cityQuery === "" || property.city.toLowerCase().includes(cityQuery);
      const matchesMinimum = minimum === null || property.price >= minimum;
      const matchesMaximum = maximum === null || property.price <= maximum;

      return matchesCity && matchesMinimum && matchesMaximum;
    });

    return matches.sort((first, second) => {
      switch (sortBy) {
        case "price-desc":
          return second.price - first.price;
        case "sqft-desc":
          return second.sqft - first.sqft;
        case "price-asc":
        default:
          return first.price - second.price;
      }
    });
  }, [citySearch, minPrice, maxPrice, sortBy]);

  const propertySummary = useMemo(() => {
    if (filteredProperties.length === 0) {
      return {
        averagePrice: null,
        mostExpensive: null,
        leastExpensive: null,
      };
    }

    const totals = filteredProperties.reduce(
      (summary, property) => ({
        totalPrice: summary.totalPrice + property.price,
        mostExpensive:
          property.price > summary.mostExpensive.price
            ? property
            : summary.mostExpensive,
        leastExpensive:
          property.price < summary.leastExpensive.price
            ? property
            : summary.leastExpensive,
      }),
      {
        totalPrice: 0,
        mostExpensive: filteredProperties[0],
        leastExpensive: filteredProperties[0],
      },
    );

    return {
      averagePrice: totals.totalPrice / filteredProperties.length,
      mostExpensive: totals.mostExpensive,
      leastExpensive: totals.leastExpensive,
    };
  }, [filteredProperties]);

  return (
    <main className="homefinder">
      <header className="homefinder__header">
        <p className="homefinder__eyebrow">Find your place</p>
        <h1>HomeFinder</h1>
        <p>Explore homes for sale in Greenville and North Texas.</p>
        <p className="homefinder__favorites" aria-live="polite">
          <span aria-hidden="true">♥</span> {favoriteIds.size}{" "}
          {favoriteIds.size === 1 ? "favorite" : "favorites"}
        </p>
      </header>

      <section className="property-search" aria-label="Search properties">
        <SearchBar value={citySearch} onChange={setCitySearch} />
        <label className="property-search__field">
          <span>Minimum price</span>
          <input
            type="number"
            min="0"
            placeholder="No minimum"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
        </label>
        <label className="property-search__field">
          <span>Maximum price</span>
          <input
            type="number"
            min="0"
            placeholder="No maximum"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>
        <label className="property-search__field property-search__sort">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft-desc">Largest Square Footage</option>
          </select>
        </label>
      </section>

      <section
        className="property-summary"
        aria-label="Property summary"
        aria-live="polite"
      >
        <article className="property-summary__item">
          <p className="property-summary__label">Properties displayed</p>
          <p className="property-summary__value">{filteredProperties.length}</p>
        </article>
        <article className="property-summary__item">
          <p className="property-summary__label">Average price</p>
          <p className="property-summary__value">
            {propertySummary.averagePrice === null
              ? "—"
              : formatPrice(propertySummary.averagePrice)}
          </p>
        </article>
        <article className="property-summary__item">
          <p className="property-summary__label">Most expensive</p>
          {propertySummary.mostExpensive ? (
            <>
              <p className="property-summary__value">
                {formatPrice(propertySummary.mostExpensive.price)}
              </p>
              <p className="property-summary__address">
                {propertySummary.mostExpensive.address}
              </p>
            </>
          ) : (
            <p className="property-summary__value">—</p>
          )}
        </article>
        <article className="property-summary__item">
          <p className="property-summary__label">Least expensive</p>
          {propertySummary.leastExpensive ? (
            <>
              <p className="property-summary__value">
                {formatPrice(propertySummary.leastExpensive.price)}
              </p>
              <p className="property-summary__address">
                {propertySummary.leastExpensive.address}
              </p>
            </>
          ) : (
            <p className="property-summary__value">—</p>
          )}
        </article>
      </section>

      <section className="listings" aria-label="Property listings">
        <div className="listings__heading">
          <h2>Homes for sale</h2>
          <p>
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1 ? "home" : "homes"}
          </p>
        </div>
        {filteredProperties.length > 0 ? (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favoriteIds.has(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <p className="listings__empty">
            No homes match your search. Try adjusting the city or price range.
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
