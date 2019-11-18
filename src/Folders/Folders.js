import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './Folders.css';

export default class Folders extends Component {
    static contextType = NotefulContext;

    render() {
        const { notes, folders } = this.context
        
        const findFolder = (folders=[], id) =>
            folders.find(folder => folder.id === id)

        const findNote = (notes=[], note_id) =>
            notes.find(note => note.id === note_id)

        const { note_id } = this.props.match.params;
        
        const note = findNote(notes, note_id) || {};
        const folder = findFolder(folders, note.folder);

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
                        {folder.title}
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