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
import config from './config';
import NotefulContext from './NotefulContext';

export default class App extends Component {
  state = {
    notes: [],
    folders: []
  };

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

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
    return <Redirect to='/' />;
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
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  component={FolderPage}
              />
          ))}
          <Route path="/note/:noteId" component={Folders} />
      </>
  );
}

  renderNoteRoutes() {
    return (
      <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact
                  key={path}
                  path={path}
                  component={MainPage}
              />
          ))}
          <Route path="/note/:noteId" component={NotePage} />
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
            {this.renderFolderRoutes()}
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