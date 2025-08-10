import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, poster, type MovieDetails } from '../api/tmdb';

const MovieDetailsPage = () => {
    const { id } = useParams();                 // Read movie ID from route params
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // Guard against state updates after unmount
        let cancelled = false;

        setLoading(true);
        setError(null);

        getMovieById(Number(id))
            .then((m) => { if (!cancelled) setMovie(m); })
            .catch((e: any) => { if (!cancelled) setError(e?.message ?? 'Error'); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [id]);

    // Loading and error states
    if (loading) return <div className="p-6">Loading…</div>;
    if (error)   return <div className="p-6 text-red-600">Error: {error}</div>;
    if (!movie)  return null;

    return (
        // Main layout container with responsive max width and grid for poster + content
        <div className="mx-auto grid max-w-4xl grid-cols-[200px_1fr] gap-6 p-6">
            {/* Poster image (fallback background helps avoid layout jump before load) */}
            <img
                src={poster(movie.poster_path, 'w300')}
                alt={movie.title}
                className="h-auto w-full rounded-xl bg-gray-200"
                loading="lazy"
            />

            {/* Right column with details */}
            <div>
                {/* Title */}
                <h2 className="mt-0 text-2xl font-bold">{movie.title}</h2>

                {/* Meta info: release date • runtime • rating */}
                <div className="my-2 text-sm text-black/70">
                    {movie.release_date} • {movie.runtime} min • ⭐ {movie.vote_average.toFixed(1)}
                </div>

                {/* Genre chips */}
                <div className="my-2 mb-4 flex flex-wrap gap-2">
                    {movie.genres.map((g) => (
                        <span
                            key={g.id}
                            className="rounded-full border border-gray-300 px-2 py-0.5 text-sm"
                        >
              {g.name}
            </span>
                    ))}
                </div>

                {/* Overview */}
                <p className="leading-relaxed">{movie.overview}</p>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
