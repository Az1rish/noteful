import React from 'react';
import Notes from '../Notes/Notes';
import './NotePage.css';

export default function NotePage(props) {
    return (
        <section className='NotePage'>
            <Notes
                id={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
            />
            <div className='NotePage-content'>
                {props.note.content.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>
                )}
            </div>
        </section>
    )
}

NotePage.defaultProps = {
    notes: {
        content: '',
    }
}