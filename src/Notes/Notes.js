import React from 'react';
import { Link } from 'react-router-dom';
import STORE from '../Store';
import './Notes.css';

export default function Notes() {
    return (
        <ul className='NotesList'>
            {STORE.notes.map(note =>
                <Link 
                    to={`/note/${note.id}`}
                    key={note.id}>
                    <li className='note'>                  
                        {note.name}
                        {note.modified}
                        <button className='deleteNote'>
                            Delete Note
                        </button>
                    </li>
                </Link>
            )}
        </ul> 
    )
}