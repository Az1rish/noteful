import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import Notes from '../Notes/Notes';
import './MainPage.css';

export default class MainPage extends Component {
    static contextType = NotefulContext;

    render() {
        const getNotesForFolder = (notes=[], folderId) => (
            (!folderId)
              ? notes
              : notes.filter(note => note.folderId === folderId)
          )
        const {folderId} = this.props.match.params;
        const { notes } = getNotesForFolder(
            this.context.notes,
            folderId
        );
        

        return (
            <section className='MainPage'>
                <ul>
                    {notes.map(note =>
                        <li key={note.id}>
                            <Notes
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <div className='MainPage-buttonContainer'>
                    <button>Add Note</button>
                </div>
            </section>
        )
    } 
}

MainPage.defaultProps = {
    notes: [],
}