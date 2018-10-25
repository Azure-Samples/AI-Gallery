import React, { Component } from 'react';
import { render } from 'react-dom';
const config = require('./../config');

class SliderContent extends Component {
    constructor(props){
        super(props);
        this.keyword = props.keyword;
    }

    getContent(){
        var html = document.createElement('ul');
        console.log("hello from get content! " + this.keyword);
        var cards = this.prepareContent(this.keyword);

        console.log(cards);
        return <ul>{cards}</ul>;
    }

    prepareContent(keyword){
        var jsonString = config.getData();
        var json = JSON.parse(jsonString);
        var cards = [];
        for (var i = 0; json[keyword] != undefined && i < json[keyword].length; i++)
        {
            var obj = json[keyword][i];
            var card = <li><div className={["github-card", keyword+"item", "item"].join(' ')} data-github={obj['link']} data-theme="medium"></div></li>;
            cards.push(card);
        };
        return cards;
    }
    
    render(){
        console.log("hello from slider Content!");
            return (
            <ul className={["menu", this.keyword].join(' ')} id={[this.keyword,"menu"].join('-')} >
                {this.getContent()}
            </ul>
        );
    }

}

module.exports = SliderContent;