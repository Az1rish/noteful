import React from 'react';
import ReactDOM from 'react-dom';
import FolderPage from './FolderPage';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
        <FolderPage />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});