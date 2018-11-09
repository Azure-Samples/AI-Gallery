import React, { Component } from 'react';
import SearchWidget from './searchWidget';


export default class Browse extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword: 'Onnx'
        };
    }

    setKeyword(newKeyword){
        this.setState({
            keyword: newKeyword
        })
    }


    render(){
            return (
            <div>
                <div class="content-container">
                    <div ><input type="button" id="OnnxSearch" value="Onnx" class="button browsebtn noselect" onClick={() => this.setKeyword("Onnx")}/></div>
                    <div ><input type="button" id="TensorflowSearch" value="Tensorflow" class="button  browsebtn noselect" onClick={() =>this.setKeyword("TensorFlow")}/></div>
                </div>

                <div id="browse_content">
                    <div class="browse_result" style={{display:'inline-block',width:'100%', verticalAlign: 'top'}}>
                        {<SearchWidget keyword={this.state.keyword}/>}
                    </div>
                </div>
            </div>
        )
    }

}
