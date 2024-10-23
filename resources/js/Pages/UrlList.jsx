import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'; 

const UrlList = () => {
    const { urls, flash } = usePage().props;
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [editingUrl, setEditingUrl] = useState(null);

    const handleEdit = (url) => {
        setLongUrl(url.long_url);
        setShortUrl(url.short_url);
        setEditingUrl(url.id);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (editingUrl) {
            // If editing, update the existing URL
            Inertia.post(`/urls/${editingUrl}`, { long_url: longUrl, short_url: shortUrl }, {
                onSuccess: () => {
                    setLongUrl('');
                    setShortUrl('');
                    setEditingUrl(null);
                    // Reload the page to refresh the URL list
                    Inertia.reload({ only: ['urls'] });
                }
            });
        } else {
            // If not editing, add a new URL
            Inertia.post('/urls/store', { long_url: longUrl }, {
                onSuccess: () => {
                    setLongUrl('');
                    setShortUrl('');
                    // Reload the page to refresh the URL list
                    Inertia.reload({ only: ['urls'] });
                }
            });
        }
    };

    const handleDelete = (id) => {
        Inertia.post(`/urls/delete/${id}`, {
            onSuccess: () => {
                Inertia.reload({ only: ['urls'] });
            },

            onError: () => {
                console.log('Failed to delete URL.');
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">URL List</h1>
            {/* Flash messages */}
            {/* {flash && (
                <>
                    {flash.success && <div className="bg-green-500 text-white p-4 rounded mb-4">{flash.success}</div>}
                    {flash.error && <div className="bg-red-500 text-white p-4 rounded mb-4">{flash.error}</div>}
                </>
            )} */}
            <form onSubmit={handleUpdate} className="mb-4">
                <input
                    type="text"
                    placeholder="Long URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                {editingUrl && (
                    <input
                        type="text"
                        placeholder="Short URL"
                        value={shortUrl}
                        onChange={(e) => setShortUrl(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 w-full mb-2"
                    />
                )}
                <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
                    {editingUrl ? 'Update' : 'Add'} URL
                </button>
            </form>

            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2 text-left">Long URL</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Short URL</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map(url => (
                        <tr key={url.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{url.long_url}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a href={url.short_url} className="text-blue-500 hover:underline" target='__blank'>{url.short_url}</a>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleEdit(url)}
                                    className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(url.id)}
                                    className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UrlList;
