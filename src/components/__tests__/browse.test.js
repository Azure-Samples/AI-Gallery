import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Browse from './../browse';


test('renders a snapshot of browse', () => {
    const tree = renderer.create(<Browse/>).toJSON();
    expect(tree).toMatchSnapshot();
})