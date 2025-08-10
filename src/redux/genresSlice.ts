import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tmdb } from '../api/tmdb';

// Type for a single genre object
type Genre = { id: number; name: string };

// State shape for genres slice
type GenresState = {
    list: Genre[];        // List of genres fetched from TMDB
    loading: boolean;     // Loading status flag
    error: string | null; // Error message if the fetch fails
};

// Initial state for the slice
const initialState: GenresState = { list: [], loading: false, error: null };

// Async thunk to fetch genres from TMDB API
// Endpoint: GET /genre/movie/list
export const fetchGenres = createAsyncThunk<Genre[]>(
    'genres/fetch',
    async () => {
        const { data } = await tmdb.get('/genre/movie/list');
        return data.genres as Genre[];
    }
);

// Redux slice for managing genres state
const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {}, // No synchronous reducers needed here
    extraReducers(builder) {
        builder
            // When request is pending: set loading flag and clear previous error
            .addCase(fetchGenres.pending, (st) => {
                st.loading = true;
                st.error = null;
            })
            // When request is successful: store the genres list
            .addCase(fetchGenres.fulfilled, (st, { payload }) => {
                st.loading = false;
                st.list = payload;
            })
            // When request fails: store error message
            .addCase(fetchGenres.rejected, (st, { error }) => {
                st.loading = false;
                st.error = error.message ?? 'Error';
            });
    },
});

export default genresSlice.reducer;
