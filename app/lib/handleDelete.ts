import {Media} from "../components/MediaList";
import {Dispatch, SetStateAction} from "react";

const handleDelete = async (id: number, setMedia: Dispatch<SetStateAction<Media[]>>,  media: Media[]) => {
    try {
        const response = await fetch('/api/media', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            setMedia(media.filter((item: Media) => item.id !== id));
        } else {
            console.error('Failed to delete the item.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default handleDelete;