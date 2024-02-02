import {Dispatch, SetStateAction} from "react";
import {Media} from "../components/MediaList";

const handleAdd = async (setMedia: Dispatch<SetStateAction<Media[]>>,  media: Media[],editedItem: Media, setEditedItem:Dispatch<SetStateAction<Media>>) => {
    console.log('editedItem', editedItem)
    try {
        const response = await fetch('/api/media', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({editedItem}),
        });
        if (response.ok) {
            setEditedItem({
                id: 0,
                title: '',
                type: '',
                genre: '',
                releaseYear: 0,
                rating: 0,
            })
            const data = await response.json()
            console.log('data', data)
            const mediaItem = data.added
            setMedia([...media, mediaItem]);
        } else {
            console.error('Failed to add the item.');
        }

    } catch (
        error)
    {
        console.error('Error:', error);
    }
}
export default handleAdd;