import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './FolderPage.css';
import NotefulContext from '../NotefulContext';

export default class FolderPage extends Component {
    static contextType = NotefulContext;

    render() {
        const { folders, notes } = this.context
        const countNotesForFolder = (notes=[], folderId) =>
            notes.filter(note => note.folderId === folderId).length

        return (
        <div className='FolderPage'>
            <ul className='FolderPage-list'>
                {folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='FolderPage-folder'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='FolderPage-num'>
                                {countNotesForFolder(notes, folder.id)}
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
    
}

FolderPage.defaultProps = {
    folders: []
}