import { Link, Outlet } from 'react-router-dom';

const App = () => (
    <div>
        <header className="mb-2 border-b border-gray-200 px-6 py-3">
            <Link to="/" className="font-bold no-underline hover:underline text-black">
                TMDB Browser
            </Link>
        </header>
        <Outlet />
    </div>
);
<div className="m-16 bg-red-500 h-10"></div>

export default App;
