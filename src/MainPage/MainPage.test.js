import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const defaultProps = {
        match: { params: { folder_id: 2 } },
    };
    ReactDOM.render(
    <BrowserRouter>
        <MainPage 
        {...defaultProps}/>
    </BrowserRouter>
    , div);
    ReactDOM.unmountComponentAtNode(div);
});