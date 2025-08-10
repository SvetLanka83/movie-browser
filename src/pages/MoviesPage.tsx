import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getMovies, type MovieSummary, poster } from '../api/tmdb';
import { GenreChips } from '../components/GenreChips';

const PER_PAGE_UI = 20;

const MoviesPage = () => {
    const [sp, setSp] = useSearchParams();

    // Get initial values from URL parameters
    const pageFromUrl = Number(sp.get('page') ?? 1);
    const qFromUrl = sp.get('q') ?? '';
    const genreFromUrl = sp.get('genre'); // string | null

    // Local state
    const [page, setPage] = useState(pageFromUrl);
    const [query, setQuery] = useState(qFromUrl);
    const [genreId, setGenreId] = useState<number | null>(
        genreFromUrl ? Number(genreFromUrl) : null
    );

    const [movies, setMovies] = useState<MovieSummary[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // --- Reflect URL -> local state (so Home link clears filters) ---
    useEffect(() => {
        const p = Number(sp.get('page') ?? 1);
        const q = sp.get('q') ?? '';
        const g = sp.get('genre');
        const gNum = g ? Number(g) : null;

        // Update only when values actually differ to avoid extra renders
        if (p !== page) setPage(p);
        if (q !== query) setQuery(q);
        if (gNum !== genreId) setGenreId(gNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sp]); // listen to URL search params only

    // Synchronize URL with search state
    useEffect(() => {
        const params: Record<string, string> = {};
        if (query.trim()) params.q = query.trim();
        if (genreId != null) params.genre = String(genreId);
        if (page > 1) params.page = String(page);
        setSp(params, { replace: true });
    }, [query, genreId, page, setSp]);

    // Reset to first page when query or genre changes
    useEffect(() => {
        setPage(1);
    }, [query, genreId]);

    // Fetch movies from API
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        getMovies(page, {
            query: query.trim() || undefined,
            genreId: genreId ?? undefined,
        })
            .then(({ results, total_pages }) => {
                if (!cancelled) {
                    setMovies(results);
                    setTotalPages(total_pages);
                }
            })
            .catch((e: any) => !cancelled && setError(e?.message ?? 'Error'))
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
        };
    }, [page, query, genreId]);

    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="p-6">
            {/* Page title */}
            <h1 className="mb-3 text-2xl font-bold">Movies</h1>

            {/* Search input */}
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movie..."
                className="mb-4 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
            />

            {/* Genre filter chips */}
            <GenreChips selected={genreId} onSelect={setGenreId} />

            {/* Error and loading states */}
            {error && <p className="mt-3 text-red-600">Error: {error}</p>}
            {loading && <p className="mt-3">Loading…</p>}

            {/* Movie poster grid */}
            <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
                {movies.map((m) => (
                    <Link
                        key={m.id}
                        to={`/movie/${m.id}`}
                        className="block text-black no-underline"
                    >
                        <img
                            src={poster(m.poster_path, 'w300')}
                            alt={m.title}
                            className="aspect-[2/3] w-full rounded-xl bg-gray-200 object-cover"
                            loading="lazy"
                        />
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-5 flex items-center gap-2">
                <button
                    disabled={!canPrev}
                    onClick={() => setPage((p) => p - 1)}
                    className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
                >
                    Prev
                </button>
                <span>
          Page {page} / {totalPages}
        </span>
                <button
                    disabled={!canNext}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
                >
                    Next
                </button>
                <span className="ml-2 text-sm text-black/70">
          per page: {PER_PAGE_UI}
        </span>
            </div>
        </div>
    );
};

export default MoviesPage;
