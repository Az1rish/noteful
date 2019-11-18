import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import Notes from '../Notes/Notes';
import './MainPage.css';

export default class MainPage extends Component {
    static contextType = NotefulContext;

    render() {
        const getNotesForFolder = (notes=[], folder) => (
            (!folder)
            ? notes
            : notes.filter(note => note.folder === folder)
        )

        const {folder} = this.props.match.params;
       
        const notes = getNotesForFolder(
            this.context.notes,
            folder
        );
        
        return (
            <section className='MainPage'>
                <ul>
                    {notes.map(note =>
                        <li key={note.id}>
                            <Notes
                                id={note.id}
                                title={note.title}
                                date_modified={note.date_modified}
                                folder={note.folder}
                            />
                        </li>
                    )}
                </ul>
                <div className='MainPage-buttonContainer'>
                    <Link to={'/add-note'}>
                        <button>Add Note</button>
                    </Link>  
                </div>
            </section>
        )
    } 
}

