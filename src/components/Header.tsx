import { useState } from 'react';

// Header component with a search input and button
// Props:
//   onSearch - callback function triggered when the user initiates a search
export default function Header({ onSearch }: { onSearch: (q: string) => void }) {
    // Local state to store the current search query string
    const [q, setQ] = useState('');

    return (
        // Header container: flex layout, centered items, padding
        <header className="flex items-center gap-2 p-4">
            {/* Application title */}
            <h1 className="text-xl font-bold">Movie Browser</h1>

            {/* Search input field */}
            <input
                className="flex-1 rounded border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
                placeholder="Search movies..."                // Placeholder text for the input
                value={q}                                     // Controlled input value
                onChange={(e) => setQ(e.target.value)}        // Update state when typing
                onKeyDown={(e) => e.key === 'Enter' && onSearch(q)} // Trigger search on Enter key
            />

            {/* Search button */}
            <button
                className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 active:bg-gray-900"
                onClick={() => onSearch(q)} // Trigger search on button click
            >
                Search
            </button>
        </header>
    );
}
