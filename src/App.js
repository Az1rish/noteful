import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import Folders from './Folders/Folders';
import NotePage from './NotePage/NotePage';
import STORE from './Store';
import NotefulContext from './NotefulContext';

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
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
    }
    

    return (
      <NotefulContext.Provider value={contextValue}>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            // render={routeProps => (
              // <FolderPage
                // folders={folders}
                // notes={notes}
                // {...routeProps}
              // />
            // )}
            component={FolderPage}
          />
        ))}
        <Route
          path='/note/:noteId'
          // render={routeProps => {
            // const {noteId} = routeProps.match.params;
            // const note = findNote(notes,noteId) || {};
            // const folder = findFolder(folders, note.folderId);
            // return <Folders {...routeProps} folder={folder} />;
            // }
          component={Folders}
        />
        <Route path='/add-folder' component={Folders} />
        <Route path='/add-note' component={Folders} />
      </NotefulContext.Provider>
    );
  }

  renderNoteRoutes() {
    const contextValue = {
      notes: this.state.notes,
      addNote: this.addNote,
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            // render={routeProps => {
              // const {folderId} = routeProps.match.params;
              // const notesForFolder = getNotesForFolder(
                // notes,
                // folderId
              // );
              // return(
                // <MainPage
                  // {...routeProps}
                  // notes={notesForFolder}
                // />
              // );
            // }}
            component={MainPage}
          />
        ))}
        <Route
          path='/note/:noteId'
          // render={routeProps => {
            // console.log(routeProps);
            // const {noteId} = routeProps.match.params;
            // const note = findNote(notes,noteId);
            // return <NotePage {...routeProps} note={note} />;
          // }}
          component={NotePage}
        />
      </NotefulContext.Provider>
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