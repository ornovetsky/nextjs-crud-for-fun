'use client'
import React, { useEffect, useState } from 'react';

interface Media {
    id: number;
    title: string;
    type: string;
    genre: string;
    releaseYear: number;
    rating: number;
}



const MediaList = () => {
    const [media, setMedia] = useState<Media[]>([]);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch('/api/media', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setMedia(media.filter((item) => item.id !== id));
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        fetch('/api/media')
            .then((response) => response.json())
            .then((data) => setMedia(data.mediaList));
    }, []);
console.log('media', media)
    return (
        <div>
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {media.map((item) => (
                    <div key={item.id} className="my-1 px-1 w-1/8 h-1/3 lg:my-4 lg:px-4 lg:w-1/8">
                        <article className="overflow-hidden rounded-2xl shadow-lg bg-gray-100 p-4">
                            <h3 className="text-gray-700 text-xl">{item.title}</h3>
                            <p className="text-gray-600">Type: {item.type}</p>
                            <p className="text-gray-600">Genre: {item.genre}</p>
                            <p className="text-gray-600">Release Year: {item.releaseYear}</p>
                            <p className="text-gray-600">Rating: {item.rating}</p>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </article>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaList;
