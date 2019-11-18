import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import './AddFolder.css';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                value: '',
                touched: false
            },
            error: null,
        }
    }

    static contextType = NotefulContext;

    updateName(title) {
        this.setState({
            title: {
                value: title,
                touched: true
            }
        });
    }

    validateName() {
        const title = this.state.title.value.trim();
        if (title.length === 0) {
            return 'Title is required';
        } else if (title.length < 3) {
            return 'Title must be at least 3 characters long';
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { FolderName } = e.target
        const folder = {
            title: FolderName.value
        }
        
        this.setState({ error: null})
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
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
            folder.value = ''
            this.context.addFolder(data)
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
        const nameError = this.validateName();
        
        return (
            <section className='AddFolder'>
                <h2>Add a folder</h2>
                <form
                    className='AddFolder__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddFolder__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='FolderName'>
                            Title:
                            {' '}
                        </label>
                        <input
                            type='text'
                            name='FolderName'
                            id='FolderName'
                            placeholder='Folder Name'
                            onChange={e => this.updateName(e.target.value)}
                            required
                        />
                        {this.state.title.touched && ( <ValidationError message={nameError}/> )}
                    </div>
                    <div className='AddFolder__buttons'>
                        <button
                            type='button'
                            onClick={this.handleClickCancel}>
                                Cancel
                        </button>
                        {' '}
                        <button 
                            type='submit'
                            disabled={
                                this.validateName()
                            }>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}