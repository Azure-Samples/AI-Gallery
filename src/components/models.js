import React, { Component } from 'react';
import { render } from 'react-dom';
import SliderContent from './sliderContent';
import $ from 'jquery';


export default class Models extends Component {
    constructor(props){
        super(props);
        this.scrollDuration = 600;
        this.length = 0;
        this.itemWidth = 0;
        this.menuWrapperSize = 0;
        this.menuSize = 0;
        this.menuInvisibleSize = 0;
        this.menuPosition = 0;
        this.paddleMargin = 20;

    }

    componentDidMount(){
        this.resize();
        window.addEventListener("resize", this.getModelMenuWrapperSize);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.getModelMenuWrapperSize);
    }

    resize(){
        this.updateSize();
        this.getMenuWrapperSize();
        this.getMenuSize();
        this.getMenuInvisibleSize();
        this.getMenuPosition();
    }

    updateLength(x){
        this.length = x;
        console.log(this.length);
    }

    updateSize(){
        this.outerWidth = $('.modelsitem').outerWidth(true);
    }

    getMenuWrapperSize(){
        this.menuWrapperSize = $('.models-menu').outerWidth();
    }

    getMenuSize(){
        this.menuSize = this.length * this.itemWidth;
    }

    getMenuInvisibleSize(){
        this.menuInvisibleSize = this.menuSize - this.menuWrapperSize;
    }

    getMenuPosition(){
        this.menuPosition = $('#models-menu').scrollLeft();
    }

    scrollLeft(){
        $('#models-menu').animate({scrollLeft: this.menuWrapperSize}, this.scrollDuration);
        this.scroll("left");
    }

    scrollRight(){
        $('#models-menu').animate({scrollLeft: this.menuWrapperSize}, this.scrollDuration);
        this.scroll("right");
    }

    scroll(dir){
        menuEndOffset = this.menuInvisibleSize - paddleMargin;

        if(this.menuPosition <= this.paddleMargin) {
            $('#model-left').addClass('hidden');
            $('#model-right').removeClass('hidden');
        }
        else if(this.menuPosition + this.menuInvisibleSize < this.menuSize){
            $('#model-left').removeClass('hidden');
            $('model-right').removeClass('hidden');
        }
        else if(this.menuPosition + this.menuInvisibleSize >= this.menuSize){
            $('#model-left').removeClass('hidden');
            $('#model-right').addClass('hidden');
        }
    }



    render(){
            return (
            <div>
                <div class="menu-wrapper" id="model-wrapper">
                    <SliderContent keyword={"models"} length={this.updateLength.bind(this)}/>
                    <div class="paddles">
                        <button class="left-paddle paddle hidden" id="model-left" onClick={scrollLeft}>&lt;</button>
                        <button class="right-paddle paddle" id="model-right" onClick={scrollRight}>&gt;</button>
                    </div>
                </div>
            </div>
        )
    }

}
