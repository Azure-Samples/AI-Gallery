import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Models from './../models';


test('renders a snapshot of Models', () => {
    const tree = renderer.create(<Models/>).toJSON();
    expect(tree).toMatchSnapshot();
})