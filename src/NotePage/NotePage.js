import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import Notes from '../Notes/Notes';
import './NotePage.css';

export default class NotePage extends Component {
    static contextType = NotefulContext;


    render() {
        const { notes } = this.context;
        const { note_id } = this.props.match.params;
        console.log(this.props)

        const findNote = (notes=[], note_id) =>
            notes.find(note => note.id === note_id)
        const note = findNote(notes, note_id);
         
        return (
            <section className='NotePage'>
                <Notes
                    id={note.id}
                    name={note.name}
                    modified={note.date_modified}
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

