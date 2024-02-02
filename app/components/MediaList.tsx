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

    useEffect(() => {
        fetch('/api/media')
            .then((response) => response.json())
            .then((data) => setMedia(data));
    }, []);
console.log('media', media)
    return (
        <div>
            {media.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>Type: {item.type}</p>
                    <p>Genre: {item.genre}</p>
                    <p>Release Year: {item.releaseYear}</p>
                    <p>Rating: {item.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default MediaList;
