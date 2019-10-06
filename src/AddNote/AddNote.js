import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './AddNote.css';

export default class AddNote extends Component {
    static contextType = NotefulContext;

    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()
        console.log(e.target)
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error } = this.state
        
        return (
            <section className='AddNote'>
                <h2>Add a note</h2>
                <form
                    className='AddNote__form'
                    onSubmit={this.handleSubmit}
                >
                    <div 
                        className='AddNote__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='NoteName'>
                            Name:
                            {' '}
                        </label>
                        <input
                            type='text'
                            name='NoteName'
                            id='NoteName'
                            placeholder='Note Name'
                            required
                        />
                        <label htmlFor='NoteFolder'>
                            Folder:
                            {' '}
                        </label>
                        <input />
                        <label htmlFor='NoteContent'>
                            Content:
                            {' '}
                        </label>
                        <input />
                    </div>
                    <div className='AddNote__buttons'>

                    </div>
                </form>
            </section>
        )
    }
}