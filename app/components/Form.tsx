import React from "react";
interface FormProps {
    editedItem: any;
    setEditedItem: any;
    setEditingId: any;
    handleSave: any;
}
const Form: React.FC<FormProps> = ({editedItem, setEditedItem, setEditingId, handleSave}) => {
    return (
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
    )
}

export default Form