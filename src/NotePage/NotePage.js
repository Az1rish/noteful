import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import Notes from '../Notes/Notes';
import './NotePage.css';

export default class NotePage extends Component {
    static contextType = NotefulContext;


    render() {
        const { notes } = this.context;
        
        const { note_id } = this.props.match.params;

        const findNote = (notes=[], note_id) =>
            notes.find(note => note.id === parseInt(note_id, 10))

        const note = findNote(notes, note_id); 

        return (
            <section className='NotePage'>
                <Notes
                    id={note.id}
                    title={note.title}
                    date_modified={note.date_modified}
                    folder={note.folder}
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

