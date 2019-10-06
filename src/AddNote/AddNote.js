import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import './AddNote.css';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            error: null,
        }
    }
    static contextType = NotefulContext;

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        });
    }

    updateContent(content) {
        this.setState({
            content: {
                value: content,
                touched: true
            }
        });
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Content is required';
        }else if (content.length < 3) {
            return 'Content must be at least 3 characters long';
        }
    }

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
        const nameError = this.validateName();
        const contentError = this.validateContent();
        
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
                    <div className="AddNote__fields">
                        <label htmlFor='NoteName'>
                            Name:
                            {' '}
                        </label>
                        <input
                            type='text'
                            name='NoteName'
                            id='NoteName'
                            onChange={e => this.updateName(e.target.value)}
                            placeholder='Note Name'
                            required
                        />
                        {this.state.name.touched && ( <ValidationError message={nameError}/>)}
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
                            onChange={e => this.updateContent(e.target.value)}
                            placeholder="Type your note's content here..."
                            rows={8}
                            columns={80}
                            required
                        />
                        {this.state.content.touched && ( <ValidationError message={contentError}/>)}
                    </div>
                    <div className='AddNote__buttons'>
                        <button
                            type='button'
                            onClick={this.handleClickCancel}>
                                Cancel
                        </button>
                        {' '}
                        <button 
                            type='submit'
                            disabled={
                                this.validateContent() ||
                                this.validateName()
                            }
                        >
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}