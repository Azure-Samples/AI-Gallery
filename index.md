---
layout: splash
classes: landing

---

<link rel="stylesheet" type="text/css" href="./src/content-scroller.css"/>
<link rel="stylesheet" type="text/css" href="./src/styles.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="./dist/bundle.js"></script>


# Azure AI Gallery

<div id="datadump">

</div>


### The AI Gallery enables a growing community of developers and data scientists to browse curated AI examples, including:
<br/>

1. ML models
2. ML experiments
3. Example use cases for ML models in the real world

<br/>
<br/>
* * *
# Featured


## Models

<div class="menu-wrapper" id="model-wrapper">
    <ul class="menu models" id="models-menu">
    </ul>
    <div class="paddles">
        <button class="left-paddle paddle hidden" id="model-left"><</button>
        <button class="right-paddle paddle" id="model-right">></button>
    </div>
</div>

* * *


<br/>
## Examples
<div class="menu-wrapper" id="example-wrapper">
    <ul class="menu examples" id="examples-menu">
    </ul>
    <div class="paddles">
        <button class="left-paddle paddle hidden" id="example-left"><</button>
        <button class="right-paddle paddle" id="example-right">></button>
    </div>
</div>

* * *
<br/>


# Discover
## Search Topics: 

<div class="content-container">
    <input type="button" id="btnSearch" value="Search" class="button btnSearch  searchbtn noselect"/>
    <div  class="searchbar"><input type='text' id='keyword' name='keyword' value='mnist' class="searchbar" max-width="100%"></div>
</div>

<div class="github-widget" data-type="search"></div>

## Browse these Top Repos: 

<div class="content-container">
        <div ><input type="button" id="OnnxSearch" value="Onnx" class="button browsebtn noselect" /></div>
        <div ><input type="button" id="TensorflowSearch" value="Tensorflow" class="button  browsebtn noselect"/></div>
</div>

<div id="browse_content">
    <div class="browse_result" style="display:inline-block; width:100%; vertical-align: top">
        <div class="github-widget" id='browse_widget0' data-type="browse" data-browseTopic="onnx"></div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        console.log("the doc will see you now.")
    })
</script>

<script type="text/javascript" src="./src/content-scroller.js"></script>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>
