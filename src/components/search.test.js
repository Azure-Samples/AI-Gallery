import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Search from './search';


test('renders a snapshot of Search', () => {
    const tree = renderer.create(<Search/>).toJSON();
    expect(tree).toMatchSnapshot();
})