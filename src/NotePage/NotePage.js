import React from 'react';
import Notes from '../Notes/Notes';
import './NotePage.css';

export default function NotePage(props) {
    return (
        <section className='NotePage'>
            <Notes
                id={props.notes.id}
                name={props.notes.name}
                modified={props.notes.modified}
            />
            <div className='NotePage-content'>
                {props.notes.content.split(/\n \r|\n/).map((para, i) =>
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