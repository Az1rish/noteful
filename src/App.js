import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import Folders from './Folders/Folders';
import NotePage from './NotePage/NotePage';
import STORE from './Store';

const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)

export default class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // simulate API call loading
    setTimeout(() => this.setState(STORE), 500);
  }

  renderFolderRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <FolderPage
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes,noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <Folders {...routeProps} folder={folder} />;
          }}
        />
        <Route path='/add-folder' component={Folders} />
        <Route path='/add-note' component={Folders} />
      </>
    );
  }

  renderNoteRoutes() {
    const {notes} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(
                notes,
                folderId
              );
              return(
                <MainPage
                  {...routeProps}
                  notes={notesForFolder}
                />
              );
            }}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            console.log(routeProps);
            const {noteId} = routeProps.match.params;
            const note = findNote(notes,noteId);
            return <NotePage {...routeProps} note={note} />;
          }}
        />
      </>
    );
  }

  render() {
    return (
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
          {this.renderNoteRoutes()} 
        </main>
      </div>
    );
  }
}