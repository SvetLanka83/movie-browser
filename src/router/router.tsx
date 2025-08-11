import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import MovieDetailsPage from "../pages/MovieDetailsPage.tsx";
import MoviesPage from "../pages/MoviesPage.tsx";

// Create the application's routing configuration
export const routes = createBrowserRouter([
    {
        path: '/',                 // Root URL of the application
        element: <App />,          // Main layout or wrapper component
        children: [
            {
                index: true,       // Default route for the root path ("/")
                element: <MoviesPage /> // Renders MoviesPage as the home page
            },
            {
                path: 'movie/:id', // Dynamic route with "id" parameter
                element: <MovieDetailsPage /> // Renders MovieDetailsPage for the given movie ID
            },
        ],
    },
]);
