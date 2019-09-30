import React from 'react';
import { Link } from 'react-router-dom';
import STORE from '../Store';
import './Folders.css';

export default function Folders() {
    return (
        <ul className='FolderList'>
            {STORE.folders.map(folder =>
                <Link 
                    to={`/folder/${folder.id}`}
                    key={folder.id}
                    >
                    <li className='folder'>
                        {folder.name}
                    </li> 
                </Link>
            )}
        </ul>
    )
}