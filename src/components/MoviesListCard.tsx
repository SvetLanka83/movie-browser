import PosterPreview from './PosterPreview';
import StarsRating from './StarsRating';
import MovieInfo from './MovieInfo';
import GenreBadge from './GenreBadge';
import type { MovieSummary } from '../api/tmdb';

// Export the type so other files can import it
export type MovieListItem = MovieSummary & { vote_average?: number };

type Props = {
    movie: MovieListItem;
    genresById?: Record<number, string>;
};

// Presentational card used inside MoviesList
export default function MoviesListCard({ movie, genresById }: Props) {
    const genreNames =
        genresById ? movie.genre_ids.map(id => genresById[id]).filter(Boolean) as string[] : [];

    return (
        <div className="grid grid-cols-[92px_1fr] gap-3 rounded-lg border border-gray-200 p-3 hover:shadow-sm">
            <PosterPreview path={movie.poster_path} alt={movie.title} size="w300" className="w-[92px]" />

            <div>
                <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold">{movie.title}</h3>
                    <StarsRating value={movie.vote_average} />
                </div>

                <p className="line-clamp-3 text-sm text-black/80">{movie.overview}</p>

                {!!genreNames.length && (
                    <MovieInfo label="Genres">
                        <div className="mt-1 flex flex-wrap gap-2">
                            {genreNames.map((g) => <GenreBadge key={g} text={g} />)}
                        </div>
                    </MovieInfo>
                )}
            </div>
        </div>
    );
}
