import React, { Component } from 'react';
import SearchWidget from './searchWidget';
import $ from 'jquery';


export default class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            inputValue: '',
            keyword: ''
        };
    }

    componentWillMount(){
        this.setState({
            inputValue: ''
        })
        this.setKeyword()
    }

    setKeyword(){
        this.setState({
            keyword: this.state.inputValue
        })
    }

    updateInput(evt){
        this.setState({
            inputValue: new String(evt.target.value)
        });
    }


    render(){
        return (
            <div>
                <div class="content-container">
                    <input type="button" id="btnSearch" value="Search" ref="searchValue" className={["button","btnSearch","searchbtn","noselect"].join(' ')} onClick={this.setKeyword.bind(this)}/>
                    <div  class="searchbar-container"><input type='text' id='keyword' name='keyword' class="searchbar" width="100%" value={this.state.inputValue} onChange={evt => this.updateInput(evt)}/></div>
                </div>
                {
                    <SearchWidget keyword={this.state.keyword}/>
                }
            </div>
        )
    }

}
