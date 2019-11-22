import React from 'react';
import ReactDOM from 'react-dom';
import FolderPage from './FolderPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FolderPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});