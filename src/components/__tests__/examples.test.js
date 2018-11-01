import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Examples from './../examples';


test('renders a snapshot of Examples', () => {
    const tree = renderer.create(<Examples/>).toJSON();
    expect(tree).toMatchSnapshot();
})