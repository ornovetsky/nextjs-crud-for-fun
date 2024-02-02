import React, {Dispatch, SetStateAction} from "react";
import {Media} from "../components/MediaList";

const handleSave = async (e: React.FormEvent<HTMLFormElement>, setMedia: Dispatch<SetStateAction<Media[]>>, media: Media[], editedItem: Media, setEditingId: Dispatch<SetStateAction<any>>) => {
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

export default handleSave;