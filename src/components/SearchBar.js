import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <label className="property-search__field search-bar">
      <span>Search by city</span>
      <input
        type="search"
        placeholder="Enter a city name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </label>
  );
}

export default SearchBar;
