import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    addNote: () => {},
    deleteNote: () => {},
    addFolder: () => {},
    deleteFolder: () => {},
})

export default NotefulContext;