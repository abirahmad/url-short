// resources/js/Pages/UrlShortener.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/urls/store', { long_url: longUrl }, {
            
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    className="border border-gray-300 rounded p-2 w-full"
                    placeholder="Enter long URL"
                />
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 w-full">
                    Shorten URL
                </button>
            </form>
            {shortUrl && (
                <div className="mt-4">
                    <p className="font-semibold">Short URL:</p>
                    <a href={shortUrl} className="text-blue-500">{shortUrl}</a>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;
