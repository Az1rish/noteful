import React from 'react';
import ReactDOM from 'react-dom';
import NotePage from './NotePage';
import Enzyme, { mount } from 'enzyme';

beforeEach(() => {
    jest.resetModules();
});
let context
const getNotePageWithContext = (context = {
    id: 9876,
    title: "context title",
    folder: 9,
    date_modified: '2019-10-10',
    content: "This is my note"
}) => {}

it('renders without crashing', () => {
    const NotePage = getNotePageWithContext();
    const div = document.createElement('div');
    const defaultProps = {
        match: {
            params: { note_id: 9876 }
        }
    }
    
    ReactDOM.render(<NotePage {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
});