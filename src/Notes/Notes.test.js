import React from 'react';
import Notes from './Notes';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Notes component", () => {
    test("renders", () => {
        const wrapper = shallow(
        <Notes
           title="Title" 
           id={54321}
           folder={300}
           date_modified="2020-10-10"
        />);

        expect(wrapper.exists()).toBe(true);
    });
});