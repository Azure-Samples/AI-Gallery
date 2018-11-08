import React, { Component } from 'react';
import Carousel from './carousel';


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
