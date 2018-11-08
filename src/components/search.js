import React, { Component } from 'react';


export default class Search extends Component {
    render(){
        return (
            <div>
                <div class="content-container">
                    <input type="button" id="btnSearch" value="Search" class="button btnSearch  searchbtn noselect"/>
                    <div  class="searchbar-container"><input type='text' id='keyword' name='keyword' class="searchbar" width="100%"/></div>
                </div>
                <div class="github-widget" data-type="search"></div>
            </div>
        )
    }

}
