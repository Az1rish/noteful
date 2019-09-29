import React from 'react';
import { Link } from 'react-router-dom';
import STORE from '../Store';
import './Folders.css';

export default function Folders() {
    return (
        <ul className='FolderList'>
            {STORE.folders.map(folder =>
                <li key={folder.id}>
                    <Link to={`/folder/${folder.id}`}>
                        {folder.name}
                    </Link>
                </li>
            )}
        </ul>
    )
}