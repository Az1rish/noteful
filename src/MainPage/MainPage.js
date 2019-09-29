import React from 'react';
import Folders from '../Folders/Folders';
import Notes from '../Notes/Notes';

export default function MainPage() {
    return (
        <div className='mainPage'>
            <Folders />
            <Notes />
        </div>
    )
}