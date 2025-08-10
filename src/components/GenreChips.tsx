import { useEffect, useState } from 'react';
import { getGenres, type Genre } from '../api/tmdb';

type Props = {
    selected: number | null; // Currently selected genre ID, or null for "All"
    onSelect: (id: number | null) => void; // Callback function when a genre is selected
};

export const GenreChips = ({ selected = null, onSelect }: Props) => {
    // Local state to store fetched genres
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        // Fetch genres from TMDB API on component mount
        getGenres().then(setGenres).catch(console.error);
    }, []);

    // Base Tailwind classes for all chips
    const base =
        'rounded-full border border-gray-300 px-3 py-1 text-sm transition-colors';
    // Styles for the active (selected) chip
    const active = 'bg-gray-900 text-white border-gray-900';
    // Styles for inactive (unselected) chips
    const inactive = 'bg-white text-black hover:bg-gray-100';

    return (
        <div className="mt-4 mb-6 flex flex-wrap gap-2">
            {/* "All" chip - resets the selection to show all movies */}
            <button
                onClick={() => onSelect(null)}
                className={`${base} ${selected == null ? active : inactive}`}
                aria-pressed={selected == null}
            >
                All
            </button>

            {/* Map over the fetched genres to render a chip for each */}
            {genres.map((g) => (
                <button
                    key={g.id}
                    onClick={() => onSelect(g.id)}
                    className={`${base} ${selected === g.id ? active : inactive}`}
                    aria-pressed={selected === g.id}
                >
                    {g.name}
                </button>
            ))}
        </div>
    );
};
