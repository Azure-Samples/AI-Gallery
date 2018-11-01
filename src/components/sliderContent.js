import React, { Component } from 'react';
import { render } from 'react-dom';
const config = require('./../config');

export default class SliderContent extends Component {
    constructor(props){
        super(props);
        this.keyword = props.keyword;
    }

    render(){
        var jsonString = config.getData();
        var json = JSON.parse(jsonString);
        var data = json[this.keyword];
            return (
            <ul className={["menu", this.keyword].join(' ')} id={[this.keyword,"menu"].join('-')} >
                {data.map(obj => (
                    <li className={[this.keyword+"item", "item"].join(' ')} key={obj.link}><div className={["github-card"]} data-github={obj.link} data-theme="medium"></div></li>
                ))}
            </ul>
        );
    }

}
