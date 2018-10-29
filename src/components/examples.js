import React, { Component } from 'react';
import { render } from 'react-dom';
import SliderContent from './sliderContent';


export default class Examples extends Component {
    constructor(props){
        super(props);
        this.scrollDuration = 600;
        this.length = 0;

    }

    
    updateLength(x){
        this.length = x;
        console.log(this.length);
    }


    render(){
            return (
            <div>
                <div class="menu-wrapper" id="model-wrapper">
                    <SliderContent keyword={"examples"} length={this.updateLength.bind(this)}/>
                    <div class="paddles">
                        <button class="left-paddle paddle hidden" id="example-left">&lt;</button>
                        <button class="right-paddle paddle" id="example-right">&gt;</button>
                    </div>
                </div>
            </div>
        )
    }

}
