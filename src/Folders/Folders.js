import React from 'react';
import './Folders.css';

export default function Folders(props) {
    return (
        <div className='Folders-nav'>
            <button
                tag='button'
                role='link'
                onClick={() => props.history.goBack()}
                className='Folders-nav-backBtn'
            >
                Back
            </button>
            {props.folder && (
                <h3 className='Folders-nav-folder'>
                    {props.folder.name}
                </h3>
            )}
        </div>
    )
}

Folders.defaultProps = {
    history: {
        goBack: () => {}
    }
}