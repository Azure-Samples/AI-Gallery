import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Carousel from './Carousel';
configure({ adapter: new Adapter() });

test('renders a snapshot of SliderContent (models)', () => {
    const tree = renderer.create(<Carousel keyword={"models"}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('renders a snapshot of SliderContent (examples)', () => {
    const tree = renderer.create(<Carousel keyword={"examples"}/>).toJSON();
    expect(tree).toMatchSnapshot();
})

test('updateSize returns the correct value', () => {
    const wrapper = shallow(<Carousel keyword={"models"}/>);
    expect(wrapper.instance().getMenuSize(100,100)).toBe(10000);
})

test('getScrollAmount returns correct value when provided Left', () => {

})