import React from 'react';
import { Link } from 'react-router-dom';
import './Notes.css';
import { format, parseISO } from 'date-fns';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import config from '../config';

function deleteNoteRequest(note_id, cb) {
    fetch(config.API_ENDPOINT + `/notes/${note_id}`, {          
        method: 'DELETE',
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
        // return res.json()
    })
    .then(data => {
        cb(note_id)
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
                        <Link to={`/notes/${props.id}`}>
                            {props.title}
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
                                {format(parseISO(props.date_modified), 'do MMM yyyy')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </NotefulContext.Consumer>
    )
}

Notes.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    date_modified: PropTypes.string.isRequired,
    folder: PropTypes.number.isRequired,
}