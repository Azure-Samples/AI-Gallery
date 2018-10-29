import React, { Component } from 'react';
import { render } from 'react-dom';


class Browse extends Component {
    render(){
            return (
            <div>
                <div class="content-container">
                    <div ><input type="button" id="OnnxSearch" value="Onnx" class="button browsebtn noselect" /></div>
                    <div ><input type="button" id="TensorflowSearch" value="Tensorflow" class="button  browsebtn noselect"/></div>
                </div>

                <div id="browse_content">
                    <div class="browse_result" style={{display:'inline-block',width:'100%', verticalAlign: 'top'}}>
                        <div class="github-widget" id='browse_widget1' data-type="browse" data-browseTopic="onnx"></div>
                    </div>
                </div>
            </div>
        )
    }

}

render(<Browse />, document.getElementById('browse'));