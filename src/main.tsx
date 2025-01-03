import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import AppRouter from "./Route.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="w-screen h-screen">
            <HelmetProvider>
                <AppRouter/>
            </HelmetProvider>
        </div>
    </StrictMode>,
);
