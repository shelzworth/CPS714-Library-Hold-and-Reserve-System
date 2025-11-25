# Item Reservation & Hold System

Frontend application for managing library item reservations and holds, built with React.js.

## Features

- **Catalog View**: Browse all library items with search and filtering capabilities
- **Place Hold**: Reserve a currently checked-out item and join the queue
- **Place Reservation**: Reserve an available item for pickup
- **My Reservations**: View active holds and reservations with queue positions
- **Status Tracking**: See real-time status of items and your reservations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Catalog.js          # Main catalog view with item listing
│   ├── Catalog.css
│   ├── ItemCard.js         # Individual item card component
│   ├── ItemCard.css
│   ├── MyReservations.js   # User's holds and reservations view
│   └── MyReservations.css
├── services/
│   └── mockDataService.js  # Mock API service (replace with real API calls)
├── App.js                  # Main app component with routing
├── App.css
├── index.js                # Entry point
└── index.css
```

## Mock Data Service

The application currently uses mock data located in `src/services/mockDataService.js`. When integrating with the backend, replace the mock functions with actual API calls to:

- Catalog API (Sub-project 2) for item data
- User Dashboard API (Sub-project 4) for user data
- Notification System API (Sub-project 8) for notifications

## Integration Points

This frontend is designed to integrate with:

1. **Catalog System** (Sub-project 2)
   - Fetch catalog items
   - Get item details and availability status

2. **User Dashboard** (Sub-project 4)
   - User authentication
   - User profile data

3. **Notification System** (Sub-project 8)
   - Send notifications when holds become available
   - Queue position updates

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Technologies Used

- React 18
- React Router DOM 6
- CSS3 (Modern styling with flexbox and grid)

## Notes

- Currently uses mock data - no backend integration yet
- All API calls are simulated with delays
- Ready for backend integration by replacing mock service functions

