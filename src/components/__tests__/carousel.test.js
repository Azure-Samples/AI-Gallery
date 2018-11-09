import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import Carousel from './../carousel';

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
    const wrapper = shallow(<Carousel keyword={"models"}/>);
    expect(wrapper.instance().getScrollAmount(200, 500, 1200, "left")).toBe(0);
    expect(wrapper.instance().getScrollAmount(1000, 800, 1200, "left")).toBe(600);
})

test('scroll determines the correct paddles to show', () => {
    const wrapper = shallow(<Carousel keyword={"models"}/>);
    expect(wrapper.instance().scroll(0, 100, 900, 800)).toEqual([0, 1]);
    expect(wrapper.instance().scroll(400, 200, 900, 700)).toEqual([1, 1]);
    expect(wrapper.instance().scroll(300, 300, 600, 300)).toEqual([1, 0]);
    expect(wrapper.instance().scroll(0, 300, 200, 0)).toEqual([0,0]);
})