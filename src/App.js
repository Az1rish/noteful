import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Noteful</h1>
        </header>
        <main>
          <Route
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
