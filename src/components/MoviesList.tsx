import { Link } from 'react-router-dom';
import MoviesListCard from './MoviesListCard';
import type { MovieListItem } from './MoviesListCard';

type Props = {
    movies: MovieListItem[];
    genresById?: Record<number, string>;
};

// Renders a grid of MoviesListCard; each item links to the details page
export default function MoviesList({ movies, genresById }: Props) {
    return (
        <ul className="grid gap-4 p-4">
            {movies.map((m) => (
                <li key={m.id} className="rounded border p-0 hover:shadow">
                    <Link to={`/movie/${m.id}`} className="block no-underline text-black">
                        <MoviesListCard movie={m} genresById={genresById} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
