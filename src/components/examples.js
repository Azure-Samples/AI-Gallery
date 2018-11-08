import React, { Component } from 'react';
import Carousel from './carousel';


export default class Examples extends Component {
    constructor(props){
        super(props);
    }

    render(){
            return (
            <div>
                <div class="menu-wrapper" id="example-wrapper">
                    <Carousel keyword={"examples"}/>
                </div>
            </div>
        )
    }

}
