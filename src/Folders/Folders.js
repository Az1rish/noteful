import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './Folders.css';

export default class Folders extends Component {
    static contextType = NotefulContext;
    
    render() {
        const { notes, folders } = this.context
        console.log(this.context)
        const findFolder = (folders=[], id) =>
            folders.find(folder => folder.id === id)

        const findNote = (notes=[], id) =>
            notes.find(note => note.id === id)

        const {id} = this.props.match.params;
        console.log(this.props)
        const note = findNote(notes, id) || {};
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