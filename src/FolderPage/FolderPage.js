import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './FolderPage.css';
import NotefulContext from '../NotefulContext';

export default class FolderPage extends Component {
    static contextType = NotefulContext;
    
    render() {
        const { folders, notes } = this.context
        console.log(this.context)
        const countNotesForFolder = (notes=[], folder_id) =>
            notes.filter(note => note.folder === folder_id).length

        return (
        <div className='FolderPage'>
            <ul className='FolderPage-list'>
                {folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='FolderPage-folder'
                            to={`/folders/${folder.id}`}
                        >
                            {folder.title}
                            {' '}
                            <span className='FolderPage-num'>
                                {countNotesForFolder(notes, folder.id)}
                            </span>
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='FolderPage-button'>
                <Link to={'/add-folder'}>
                    <button>Add Folder</button>
                </Link>
            </div>
        </div>
    )
    }
    
}

FolderPage.defaultProps = {
    folders: []
}