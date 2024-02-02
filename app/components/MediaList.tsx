'use client'
import React, {useEffect, useState} from 'react';
import Form from "./Form";
import handleDelete from "../lib/handleDelete";
import handleSave from "../lib/handleSave";
import handleAdd from "../lib/handleAdd";

export interface Media {
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddMediaModal = () => {
        setIsModalOpen(true);
    }
    console.log('editedItem', editedItem)
    const handleEdit = (item: Media) => {
        setEditingId(item.id);
        setEditedItem(item);
    }
    useEffect(() => {
        fetch('/api/media')
            .then((response) => response.json())
            .then((data) => setMedia(data.mediaList));
    }, []);
    return (
        <div>
            <div className="flex justify-evenly mb-4">
                <button className="py-3 p-3 px-3 bg-blue-100 text-blue-950 font-bold rounded-2xl" onClick={handleAddMediaModal}>Add Media</button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
                        <form onSubmit={(e) => handleSave(e, setMedia, media, editedItem, setEditingId)} className="flex flex-col space-y-2">                            <div>
                                <label htmlFor="title" className="text-gray-700 m-2 mb-4">Title</label>
                                <input type="text"
                                       style={{color: '#4a5568', fontSize: '1rem',}}
                                       value={editedItem.title} onChange={(e) => setEditedItem({...editedItem, title: e.target.value})} className="border border-gray-300 p-2 w-full" />
                            </div>
                            <div>
                                <label htmlFor="type" className="text-gray-700 m-2 mb-4">Type</label>
                                <input
                                    style={{color: '#4a5568', fontSize: '1rem',}}
                                    type="text" value={editedItem.type} onChange={(e) => setEditedItem({...editedItem, type: e.target.value})} className="border border-gray-300 p-2 w-full" />
                            </div>
                            <div>
                                <label htmlFor="genre" className="text-gray-700 m-2 mb-4">Genre</label>
                                <input
                                    style={{
                                        color: '#4a5568',
                                        fontSize: '1rem',
                                    }}
                                    type="text" value={editedItem.genre} onChange={(e) => setEditedItem({...editedItem, genre: e.target.value})} className="border border-gray-300 p-2 w-full" />
                            </div>
                            <div>
                                <label htmlFor="releaseYear" className="text-gray-700 m-2 mb-4">Release Year</label>
                                <input
                                    style={{
                                        color: '#4a5568',
                                        fontSize: '1rem',
                                    }}
                                    type="text" value={editedItem.releaseYear} onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                    setEditedItem({...editedItem, releaseYear: Number(e.target.value)})
                                    }
                                }

                                } className="border border-gray-300 p-2 w-full" />
                            </div>
                            <div>
                                <label htmlFor="rating" className="text-gray-700 m-2 mb-4">Rating</label>
                                <input
                                    style={{
                                        color: '#4a5568',
                                        fontSize: '1rem',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield'
                                    }}
                                    type="text" value={editedItem.rating} onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                    setEditedItem({...editedItem, rating: Number(e.target.value)})
                                    }}
                                }
                                    className="border border-gray-300 p-2 w-full" />
                            </div>
                            <div className="flex justify-between space-x-2">
                                <button type="button" onClick={()=>{
                                    handleAdd(setMedia, media, editedItem, setEditedItem)
                                    setIsModalOpen(false)
                                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                                <button type="button" onClick={() => {
                                    setIsModalOpen(false)
                                    setEditingId(null)
                                }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {media.map((item) => (
                    <div key={item.id} className="my-1 px-1 w-1/8 h-1/3 lg:my-4 lg:px-4 lg:w-1/8">
                        <article className="overflow-hidden rounded-2xl shadow-lg bg-gray-100 p-4">
                            {editingId && editingId === item.id ? (<>
                            <Form editedItem={editedItem} setEditedItem={setEditedItem} handleSave={handleSave} setEditingId={setEditingId} />
                                </>) :
                                ( <>
                                    <h3 className="text-gray-700 text-xl">{item.title}</h3>
                                    <p className="text-gray-600">Type: {item.type}</p>
                                    <p className="text-gray-600">Genre: {item.genre}</p>
                                    <p className="text-gray-600">Release Year: {item.releaseYear}</p>
                                    <p className="text-gray-600">Rating: {item.rating}</p>

                                    <button className="mt-4 bg-teal-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-2"
                                            onClick={() => handleEdit(item)}>Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, setMedia,media)}
                                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                                    >
                                        Delete
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