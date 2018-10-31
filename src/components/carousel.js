import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

const config = require('./../config');

export default class Carousel extends Component {
    constructor(props){
        super(props);
        this.keyword = this.props.keyword;
        this.scrollDuration = 600;
        this.length = 0;
        this.itemWidth = 0;
        this.menuWrapperSize = 0;
        this.menuSize = 0;
        this.menuInvisibleSize = 0;
        this.menuPosition = 0;
        this.paddleMargin = 20;
        this.list = React.createRef();
        this.leftclick = React.createRef();
        this.rightclick = React.createRef();
        this.menuName = "#"+this.keyword+"-menu";

        this.updateSize = this.updateSize.bind(this);
        this.getMenuWrapperSize = this.getMenuWrapperSize.bind(this);
        this.getMenuSize = this.getMenuSize.bind(this);
        this.getMenuInvisibleSize = this.getMenuInvisibleSize.bind(this);
        this.getMenuPosition = this.getMenuPosition.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.scrollRight = this.scrollRight.bind(this);


    }

    componentDidMount(){
        this.resize(this);
    }

    resize(component){
        this.itemWidth = this.updateSize();
        this.menuWrapperSize = this.getMenuWrapperSize();
        this.menuSize = this.getMenuSize(this.length, this.itemWidth);
        this.menuInvisibleSize = this.getMenuInvisibleSize();
        this.menuPosition = this.getMenuPosition();
    }

    updateLength(x){
        this.length = x;
    }

    updateSize(){
        return $('.'+this.keyword+'item').outerWidth(true);
    }

    getMenuWrapperSize(){
        return $(this.menuName).outerWidth(true);
    }

    getMenuSize(length, width){
        return length * width;
    }

    getMenuInvisibleSize(){
        return this.menuSize - this.menuWrapperSize;
    }

    getMenuPosition(){
        return $(this.menuName).scrollLeft();
    }

    getScrollAmount(menuPos, wrapperSize, total, dir){
        if(dir === "left"){
            return (menuPos - wrapperSize/2) < 0 ? 0 : menuPos - this.menuWrapperSize/2;
        }
        else if (dir === "right"){
            return (menuPos + wrapperSize/2) > total ? total : menuPos + wrapperSize/2;
        }
        else{
            new Error(['invalid direction passed when determining scroll amount', 'carousel.js', '71']);
        }
    }

    scrollLeft(){
        var scrollAmount = this.getScrollAmount($(this.menuName).scrollLeft(), this.menuWrapperSize, this.menuSize, "left");
        var scrollDuration = 300;
        this.menuPosition = scrollAmount;
        $(this.menuName).animate({ scrollLeft: scrollAmount}, scrollDuration);
        var paddleVisibility = this.scroll(this.menuPosition, this.menuWrapperSize, this.menuSize, this.menuInvisibleSize);
        this.hidePaddles(paddleVisibility);    }

    scrollRight(){
        var scrollAmount = this.getScrollAmount($(this.menuName).scrollLeft(), this.menuWrapperSize, this.menuSize, "right");
        var scrollDuration = 300;
        this.menuPosition = scrollAmount;
        $(this.menuName).animate({ scrollLeft: scrollAmount}, scrollDuration);
        var paddleVisibility = this.scroll(this.menuPosition, this.menuWrapperSize, this.menuSize, this.menuInvisibleSize);
        this.hidePaddles(paddleVisibility);
    }

    scroll(pos, visibleWidth, totalWidth, invisibleSize){
        if(pos <= this.paddleMargin) {
            return [0,1];
        }
        else if(pos + visibleWidth < totalWidth){
            return [1, 1];
        }
        else if(pos + visibleWidth >= totalWidth){
            return [1, 0];
        }
        else if(invisibleSize <= 0){
            return [0, 0];
        }
    }

    hidePaddles(vis){
        var leftpaddle = "#"+this.keyword+"-left";
        var rightpaddle = "#"+this.keyword+"-right";

        if(vis[0]){
            $(leftpaddle).removeClass('hidden');
        }
        else{
            $(leftpaddle).addClass('hidden');
        }
        if(vis[1]){
            $(rightpaddle).removeClass('hidden');
        }
        else{
            $(rightpaddle).addClass('hidden');
        }
    }




    render(){
        var jsonString = config.getData();
        var json = JSON.parse(jsonString);
        var data = json[this.keyword];
        this.length = data.length;
            return (
            <div>
                <ul className={["menu", this.keyword].join(' ')} id={[this.keyword,"menu"].join('-')} ref={this.list}>
                    {data.map(obj => (
                        <li className={[this.keyword+"item", "item"].join(' ')} key={obj.link}><div className={["github-card"]} data-github={obj.link} data-theme="medium"></div></li>
                    ))}
                </ul>
                <div class="paddles">
                    <button class="left-paddle paddle hidden" id={[this.keyword,"left"].join('-')} onClick={this.scrollLeft} ref={this.leftclick}>&lt;</button>
                    <button class="right-paddle paddle" id={[this.keyword,"right"].join('-')} onClick={this.scrollRight} ref={this.rightclick}>&gt;</button>
                </div>
            </div>
        );
    }

}
