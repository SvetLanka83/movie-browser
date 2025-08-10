import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tmdb } from '../api/tmdb';

type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    genre_ids: number[];
};

type MoviesState = {
    items: Movie[];
    loading: boolean;
    error: string | null;
    page: number;
};

const initialState: MoviesState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
};

// GET /discover/movie?page={n}
export const fetchMovies = createAsyncThunk<Movie[], number | undefined>(
    'movies/fetch',
    async (page = 1) => {
        const { data } = await tmdb.get('/discover/movie', { params: { page } });
        return data.results as Movie[];
    }
);

// GET /search/keyword?query=...
export const searchKeywords = createAsyncThunk<{ id: number; name: string }[], string>(
    'movies/searchKeywords',
    async (query) => {
        const { data } = await tmdb.get('/search/keyword', { params: { query } });
        return data.results as { id: number; name: string }[];
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setPage(state, action) { state.page = action.payload; },
        clear(state) { state.items = []; state.page = 1; state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (st) => { st.loading = true; st.error = null; })
            .addCase(fetchMovies.fulfilled, (st, { payload }) => {
                st.loading = false; st.items = payload;
            })
            .addCase(fetchMovies.rejected, (st, { error }) => {
                st.loading = false; st.error = error.message ?? 'Error';
            });
    }
});

export const { setPage, clear } = moviesSlice.actions;
export default moviesSlice.reducer;
