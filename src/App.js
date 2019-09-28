import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>
            Noteful
          </Link>
        </header>
        <main>
          <Route
            exact
            path='/'
            component={MainPage}
          />
          <Route
            path='/folder/:folderId'
            component={FolderPage}
          />
          <Route
            path='/note/:noteId'
            component={NotePage}
          />
        </main>
      </div>
    );
  }
}
