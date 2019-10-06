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
        const { NoteName, NoteFolder, NoteContent } = e.target
        const note = {
            name: NoteName.value,
            modified: new Date(),
            folderId: NoteFolder.value,
            content: NoteContent.value,
        }

        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            console.log(this.context)
            note.value = ''
            this.context.addNote(data)
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error } = this.state
        const { folders } = this.context
        
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
                        <select 
                            name='NoteFolder'
                            id='NoteFolder'
                            required
                        >
                            {folders.map(folder => 
                                <option 
                                    value={folder.id}
                                    key={folder.id}>
                                    {folder.name}
                                </option>)}
                        </select>
                        <label htmlFor='NoteContent'>
                            Content:
                            {' '}
                        </label>
                        <textarea
                            name='NoteContent'
                            id='NoteContent'
                            placeholder="Type your note's content here..."
                            rows={8}
                            columns={80}
                            required />
                    </div>
                    <div className='AddNote__buttons'>
                        <button
                            type='button'
                            onClick={this.handleClickCancel}>
                                Cancel
                        </button>
                        {' '}
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}