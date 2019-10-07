import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import './AddFolder.css';

export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
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

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { FolderName } = e.target
        const folder = {
            name: FolderName.value
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
                            Name:
                            {' '}
                        </label>
                        <input
                            type='text'
                            name='FolderName'
                            id='FolderName'
                            placeholder='Folder Name'
                            required
                        />
                        {this.state.name.touched && ( <ValidationError message={nameError}/> )}
                    </div>
                    <div className='AddFolder__buttons'>
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