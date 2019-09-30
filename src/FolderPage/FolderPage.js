import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FolderPage.css';

export default function FolderPage(props) {
    const countNotesForFolder = (notes=[], folderId) =>
        notes.filter(note => note.folderId === folderId).length
    return (
        <div className='FolderPage'>
            <ul className='FolderPage-list'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='FolderPage-folder'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='FolderPage-num'>
                                {countNotesForFolder(props.notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='FolderPage-button'>
                <button>Add Folder</button>
            </div>
        </div>
    )
}

FolderPage.defaultProps = {
    folders: []
}