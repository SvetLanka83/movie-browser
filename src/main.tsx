import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routes } from "./components/router/router";
import './index.css';


createRoot(document.getElementById('root')!).render(<RouterProvider router={routes} />);
