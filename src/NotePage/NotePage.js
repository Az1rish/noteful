import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import Notes from '../Notes/Notes';
import './NotePage.css';

export default class NotePage extends Component {
    static contextType = NotefulContext;

    render() {
        const findNote = (notes=[], noteId) =>
            notes.find(note => note.id === noteId)
        const { notes } = this.context
        const {noteId} = this.props.match.params;
        const note = findNote(notes,noteId);
        return (
            <section className='NotePage'>
                <Notes
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                />
                <div className='NotePage-content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
    
}

NotePage.defaultProps = {
    notes: {
        content: '',
    }
}