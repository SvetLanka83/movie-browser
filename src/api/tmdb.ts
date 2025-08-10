import axios from 'axios';

// Read the TMDB API token from environment variables (v4 Read Access Token)
const token = import.meta.env.VITE_TMDB_TOKEN;

// Create an Axios instance pre-configured for TMDB API requests
export const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3', // TMDB API base URL
    headers: { Authorization: `Bearer ${token}` }, // Authorization header with the token
});

// Type definition for movie genre object
export type Genre = { id: number; name: string };

// Type definition for summarized movie information
export type MovieSummary = {
    id: number;
    title: string;
    poster_path: string | null; // Poster image path or null if not available
    overview: string; // Short movie description
    genre_ids: number[]; // Array of genre IDs
};

// Type definition for detailed movie information
export type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    genres: Genre[]; // Array of genre objects
    release_date: string; // Release date in "YYYY-MM-DD" format
    runtime: number; // Movie duration in minutes
    vote_average: number; // Average rating score
};

// Helper function to build the full poster URL from TMDB image path
export const poster = (
    path: string | null,
    size: 'w200' | 'w300' | 'w500' | 'original' = 'w300' // Default image size is w300
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : '');

// Shortcut specifically for w500 images
export const IMG_500 = (path: string | null) => poster(path, 'w500');

// ===== Fetch all available genres =====
export const getGenres = async (): Promise<Genre[]> => {
    const { data } = await tmdb.get('/genre/movie/list'); // Request genre list
    return data.genres as Genre[]; // Return genres as typed array
};

// ===== Fetch movies (popular / search / by genre) =====
export const getMovies = async (
    page = 1,
    opts?: { query?: string; genreId?: number }
): Promise<{ results: MovieSummary[]; total_pages: number }> => {
    // Default request parameters
    const params: Record<string, any> = { page, include_adult: false };

    // Add search query if provided
    if (opts?.query) params.query = opts.query;

    // Add genre filter if provided
    if (opts?.genreId) params.with_genres = String(opts.genreId);

    // Select endpoint based on whether it's a search or discovery request
    const url = opts?.query ? '/search/movie' : '/discover/movie';

    // Perform the request
    const { data } = await tmdb.get(url, { params });

    // Return the list of movies and total pages
    return {
        results: data.results as MovieSummary[],
        total_pages: data.total_pages,
    };
};

// ===== Fetch movie details by ID =====
export const getMovieById = async (id: number): Promise<MovieDetails> => {
    const { data } = await tmdb.get(`/movie/${id}`); // Request detailed info
    return data as MovieDetails;
};
