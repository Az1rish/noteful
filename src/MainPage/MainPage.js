import React from 'react';
import { Link } from 'react-router-dom';
import Notes from '../Notes/Notes';
import './MainPage.css';

export default function MainPage(props) {
    return (
        <section className='MainPage'>
            <ul>
                {props.notes.map(note =>
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