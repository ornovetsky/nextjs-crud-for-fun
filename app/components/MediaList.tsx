'use client'
import React, {MouseEventHandler, useEffect, useState} from 'react';

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
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedItem, setEditedItem] = useState<Media>({
        id: 0,
        title: '',
        type: '',
        genre: '',
        releaseYear: 0,
        rating: 0,
    });

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

    const handleEdit = (item: Media) => {
        setEditingId(item.id);
        setEditedItem(item);
        console.log('item', item.id)
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSave,', editedItem)
        e.preventDefault();
        try {
            const response = await fetch('/api/media', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedItem),
            });

            if (response.ok) {
                setMedia(media.map((item) => (item.id === editedItem.id ? editedItem : item)));
                setEditingId(null);
            } else {
                console.error('Failed to update the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetch('/api/media')
            .then((response) => response.json())
            .then((data) => setMedia(data.mediaList));
    }, []);
    return (
        <div>
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {media.map((item) => (
                    <div key={item.id} className="my-1 px-1 w-1/8 h-1/3 lg:my-4 lg:px-4 lg:w-1/8">
                        <article className="overflow-hidden rounded-2xl shadow-lg bg-gray-100 p-4">
                            {editingId === item.id ? (<>
                                    <form onSubmit={handleSave} className="flex flex-col space-y-2">
                                        <div>
                                            <input type="text"
                                                   style={{
                                                       backgroundColor: 'transparent',
                                                       border: 'none',
                                                       padding: 0,
                                                       margin: 0,
                                                       color: '#4a5568',
                                                       fontSize: '1rem',
                                                   }}
                                                   value={editedItem.title} onChange={(e) => setEditedItem({...editedItem, title: e.target.value})} className="border border-gray-300 p-2 w-full" />
                                        </div>
                                        <div>
                                            <input
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    padding: 0,
                                                    margin: 0,
                                                    color: '#4a5568',
                                                    fontSize: '1rem',
                                                }}                                                type="text" value={editedItem.type} onChange={(e) => setEditedItem({...editedItem, type: e.target.value})} className="border border-gray-300 p-2 w-full" />
                                        </div>
                                        <div>
                                            <input
                                                            style={{
                                                       backgroundColor: 'transparent',
                                                       border: 'none',
                                                       padding: 0,
                                                       margin: 0,
                                                       color: '#4a5568',
                                                       fontSize: '1rem',
                                                   }}
                                                type="text" value={editedItem.genre} onChange={(e) => setEditedItem({...editedItem, genre: e.target.value})} className="border border-gray-300 p-2 w-full" />
                                        </div>
                                        <div>
                                            <input
                                                            style={{
                                                       backgroundColor: 'transparent',
                                                       border: 'none',
                                                       padding: 0,
                                                       margin: 0,
                                                       color: '#4a5568',
                                                       fontSize: '1rem',
                                                   }}
                                                type="text" value={editedItem.releaseYear} onChange={(e) => setEditedItem({...editedItem, releaseYear: Number(e.target.value)})} className="border border-gray-300 p-2 w-full" />
                                        </div>
                                        <div>
                                            <input
                                                            style={{
                                                       backgroundColor: 'transparent',
                                                       border: 'none',
                                                       padding: 0,
                                                       margin: 0,
                                                       color: '#4a5568',
                                                       fontSize: '1rem',
                                                   }}
                                                type="text" value={editedItem.rating} onChange={(e) => setEditedItem({...editedItem, rating: Number(e.target.value)})} className="border border-gray-300 p-2 w-full" />
                                        </div>
                                        <div className="flex justify-between space-x-2">
                                            <button type="button" onClick={handleSave as any} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                            <button type="button" onClick={() => setEditingId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                        </div>
                                    </form>

                                </>) :
                                ( <>
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
                                    <button className="mt-4 bg-teal-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleEdit(item)}>Edit
                                    </button>
                                </>)}



                        </article>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaList;