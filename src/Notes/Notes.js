import React from 'react';
import { Link } from 'react-router-dom';
import STORE from '../Store';
import './Notes.css';

export default function Notes() {
    return (
        <ul className='NotesList'>
            {STORE.notes.map(note =>
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                        {note.name}
                        {note.modified}
                        <button className='deleteNote'>
                            Delete Note
                        </button>
                    </Link>
                </li>)}
        </ul>
    )
}