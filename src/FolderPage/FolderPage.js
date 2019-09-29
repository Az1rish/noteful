import React from 'react';
import { Link } from 'react-router-dom';
import STORE from '../Store';

export default function FolderPage() {
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