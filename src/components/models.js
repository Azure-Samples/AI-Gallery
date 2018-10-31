import React, { Component } from 'react';
import { render } from 'react-dom';
import Carousel from './carousel';
import $ from 'jquery';


export default class Models extends Component {
    constructor(props){
        super(props);
    }


    render(){
            return (
            <div>
                <div class="menu-wrapper" id="model-wrapper">
                    <Carousel keyword={"models"}/>
                </div>
            </div>
        )
    }

}
