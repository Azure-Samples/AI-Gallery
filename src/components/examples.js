import React, { Component } from 'react';
import { render } from 'react-dom';
import SliderContent from './sliderContent';


class Examples extends Component {


    render(){
            return (
            <div>
                <div class="menu-wrapper" id="model-wrapper">
                    <SliderContent keyword={"examples"}/>
                    <div class="paddles">
                        <button class="left-paddle paddle hidden" id="example-left">&lt;</button>
                        <button class="right-paddle paddle" id="example-right">&gt;</button>
                    </div>
                </div>
            </div>
        )
    }

}

render(<Examples />, document.getElementById('examples-container'));