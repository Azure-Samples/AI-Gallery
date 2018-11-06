import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import SliderContent from './../sliderContent';


test('renders a snapshot of SliderContent (models)', () => {
    const tree = renderer.create(<SliderContent keyword={"models"}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('renders a snapshot of SliderContent (examples)', () => {
    const tree = renderer.create(<SliderContent keyword={"examples"}/>).toJSON();
    expect(tree).toMatchSnapshot();
})