import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import '../css/app.css'; // Adjust the path if necessary


createInertiaApp({
    resolve: async name => {
        const page = await import(`./Pages/${name}`); // Using dynamic import
        return page.default; // Return the default export
    },
    setup({ el, App, props }) {
        ReactDOM.createRoot(el).render(<App {...props} />);
    },
});


// Optionally, you can add InertiaProgress for progress bars
InertiaProgress.init({ color: '#4B5563' });
