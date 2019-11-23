import React from 'react';
import ReactDOM from 'react-dom';
import Folders from './Folders';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const defaultProps = {
        match: {
            params: { note_id: 9876 }
        }
    }
    ReactDOM.render(<Folders {...defaultProps}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});