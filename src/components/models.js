import React, { Component } from 'react';
import { render } from 'react-dom';
import SliderContent from './sliderContent';


export default class Models extends Component {


    render(){
            return (
            <div>
                <div class="menu-wrapper" id="model-wrapper">
                    <SliderContent keyword={"models"}/>
                    <div class="paddles">
                        <button class="left-paddle paddle hidden" id="model-left">&lt;</button>
                        <button class="right-paddle paddle" id="model-right">&gt;</button>
                    </div>
                </div>
            </div>
        )
    }

}
