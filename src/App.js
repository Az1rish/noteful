import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import Folders from './Folders/Folders';
import NotePage from './NotePage/NotePage';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NotesError from './ValidationError/NotesError';
import FoldersError from './ValidationError/FoldersError';
import config from './config';
import NotefulContext from './NotefulContext';

export default class App extends Component {
  state = {
    notes: [],
    folders: [],
    deleted: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.deleted === true) {
      this.setState({ deleted: false })
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      });
  }

  handleDeleteNote = note_id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== note_id),
      deleted: true
    });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  renderFolderRoutes() {
    return (
      <>
          {['/', '/folders/:folder_id'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  component={FolderPage}
              />
          ))}
          <Route path="/notes/:note_id" component={Folders} />
      </>
  );
}

  renderNoteRoutes() {
    return (
      <>
          {['/', '/folders/:folder_id'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  component={MainPage}
              />
          ))}
          <Route path="/notes/:note_id" component={NotePage} />
          <Route path="/add-folder" component={AddFolder} />
          <Route path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };

    if (this.state.deleted === true) {
      return <Redirect to="/" />
    }

    return (
      <NotefulContext.Provider value={value}>
        <div className="App">
          <header className="App-header">
            <h1>
              <Link to='/'>
                Noteful
              </Link>
            </h1>
          </header>
          <nav className='App-nav'>
            <FoldersError>
              {this.renderFolderRoutes()}
            </FoldersError>
          </nav>
          <main className='App-main'>
            <NotesError>
              {this.renderNoteRoutes()}
            </NotesError>
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}