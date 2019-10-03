import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './Folders.css';

export default class Folders extends Component {
    static contextType = NotefulContext;
    render() {
        const { notes, folders } = this.context
        const findFolder = (folders=[], folderId) =>
            folders.find(folder => folder.id === folderId)

        const findNote = (notes=[], noteId) =>
            notes.find(note => note.id === noteId)

        const {noteId} = this.props.match.params;
        const note = findNote(notes,noteId) || {};
        const folder = findFolder(folders, note.folderId);

        return (
            <div className='Folders-nav'>
                <button
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='Folders-nav-backBtn'
                >
                    Back
                </button>
                {folder && (
                    <h3 className='Folders-nav-folder'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
    
}

Folders.defaultProps = {
    history: {
        goBack: () => {}
    }
}