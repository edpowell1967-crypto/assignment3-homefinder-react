# HomeFinder

HomeFinder is a responsive React application for browsing sample homes for sale
in Greenville, South Carolina, and McKinney, Allen, and Frisco, Texas. Search
listings by city, narrow results by price, compare summary statistics, and view
property details.

## Features

- Browse 12 sample property listings in a responsive card grid.
- Search by city as you type; matching is case-insensitive.
- Filter by minimum and maximum price. Empty fields leave that bound unrestricted.
- Sort the current results by price (low to high or high to low) or square
  footage (largest first).
- See a summary of the displayed listing count, average price, and highest- and
  lowest-priced properties. The summary updates with the filters.
- Toggle property favorites and see the total favorite count in the page header.
- Open a property details modal with a large image, home facts, and description.
- Use the interface on mobile and desktop.

## Technologies Used

- React 18 with functional components and hooks
- JavaScript (ES modules and JSX)
- Vite 6 for development and production builds
- CSS for responsive layouts and component styling

Property images use externally hosted Unsplash URLs and require an internet
connection to load.

## Installation

### Prerequisites

- Node.js 18 or newer
- npm

### Set up and run

From the project directory:

```sh
npm install
npm run dev
```

Open the local address printed by Vite in your browser.

### Production build

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Usage

1. Browse the sample listings on the HomeFinder page.
2. Enter a city name in **Search by city** to filter as you type.
3. Optionally enter a minimum price, maximum price, or both. Clear a field to
   remove that price limit.
4. Choose a sort order to rearrange the matching listings.
5. Select the heart on a card to add or remove a favorite. The header displays
   the total number of favorites.
6. Select **View Details** to open a listing’s details. Close the modal with its
   close button, by clicking the dark overlay, or by pressing Escape.
7. Review the summary above the listings for statistics based on the current
   city and price filters.

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.js
    ├── App.css
    ├── main.jsx
    ├── components/
    │   ├── PropertyCard.js
    │   ├── PropertyCard.css
    │   ├── PropertyModal.js
    │   ├── PropertyModal.css
    │   ├── SearchBar.js
    │   └── SearchBar.css
    └── data/
        └── properties.js
```

## Future Enhancements

- Add a mortgage calculator with home price, down payment, interest rate, and
  loan term inputs.
- Persist favorite listings across browser sessions.
- Replace sample property data with a real-estate listings API.
- Add filters for bedrooms, bathrooms, and square footage.
- Add listing pagination or map-based search.
