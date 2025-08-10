import { IMG_500 } from '../api/tmdb';

type Props = {
    title: string;
    poster_path: string | null;
    genres?: string[];
    overview?: string;
};

// Presentational component displaying a movie poster, title, genres, and overview
export const MovieCard = ({ title, poster_path, genres, overview }: Props) => (
    // Outer card container: grid layout with fixed poster column and flexible content column
    <div className="grid grid-cols-[100px_1fr] gap-3 rounded-lg border border-gray-200 p-3">

        {/* Movie poster image; IMG_500 builds the full image URL from TMDB */}
        <img
            src={IMG_500(poster_path)}
            alt={title}
            loading="lazy"
            className="h-[150px] w-[100px] rounded-md object-cover"
        />

        {/* Right-hand side content */}
        <div>
            {/* Movie title */}
            <h3 className="my-1 font-semibold">{title}</h3>

            {/* Comma-separated list of genres, only shown if provided */}
            {!!genres?.length && (
                <div className="text-xs text-black/80">{genres.join(', ')}</div>
            )}

            {/* Short description, only shown if provided */}
            {overview && (
                <p className="mt-1.5 text-[13px] text-black/90">{overview}</p>
            )}
        </div>
    </div>
);
