import React from 'react';
import { Link } from 'react-router-dom';
import './Notes.css';
import { format, parseISO } from 'date-fns';
import NotefulContext from '../NotefulContext';
import config from '../config';

function deleteNoteRequest(noteId, cb) {
    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {          method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }
        return res.json()
    })
    .then(data => {
        cb(noteId)
    })
    .catch(error => {
        console.error(error)
    })
}

export default function Notes(props) {    
    return (
        <NotefulContext.Consumer>
            {(context) => (
                <div className='Note'>
                    <h2 className='Note-title'>
                        <Link to={`/note/${props.id}`}>
                            {props.name}
                        </Link>
                    </h2>
                    <button 
                        className='Note-delete' type='button'
                        onClick={() => {
                            deleteNoteRequest(
                                props.id,
                                context.deleteNote,
                            )
                        }}
                    >
                        Remove
                    </button>
                    <div className='Note-dates'>
                        <div className='Note-dates-modified'>
                            Modified
                            {' '}
                            <span className='Date'>
                                {format(parseISO(props.modified), 'do MMM yyyy')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </NotefulContext.Consumer>
    )
}