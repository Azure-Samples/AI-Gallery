var data = {
    "models": [
        {
            "link": "Azure-Samples/AI-Gallery-InceptionV3"
        },
        {
            "link":"Azure-Samples/AI-Gallery-TinyYolo"
        },
        {
            "link": "onnx/models"
        },
        {
            "link": "onnx/models"
        },
        {
            "link": "onnx/models"
        },
        {
            "link": "onnx/models"
        }
    ],
    "examples": [
        {
            "link": "Azure/MachineLearningSamples-PredictiveMaintenance"
        },
        {
            "link": "Azure/MachineLearningSamples-SentimentAnalysis"
        },
        {
            "link": "Azure/MachineLearningSamples-ChurnPrediction"
        },
        {
            "link": "Azure/MachineLearningSamples-BiomedicalEntityExtraction"
        },
        {
            "link": "Azure/MachineLearningSamples-QnAMatching"
        },
        {
            "link": "Azure/MachineLearningSamples-AerialImageClassification"
        }
    ]
}


var config = {
    getData:() => {
        return JSON.stringify(data);
    }
}

module.exports = config;