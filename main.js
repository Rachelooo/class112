prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="preview_img" src="'+data_uri+'"/>';
});
}
console.log('model ml5 version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nJgs3SUiN/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1='The first prediction is ' +prediction1;
    speak_data_2='and the second prediction is ' +prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('preview_img');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("resultemotionname1").innerHTML =results[0].label;
        document.getElementById("resultemotionname2").innerHTML =results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label == "happy"){
            document.getElementById("emoji1").innerHTML = "&#128512;";
        }
        if(results[1].label == "happy"){
            document.getElementById("emoji2").innerHTML = "&#128512;";
        }
        if(results[0].label == "sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }
        if(results[1].label == "sad"){
            document.getElementById("emoji2").innerHTML = "&#128532;";
        }
        if(results[0].label == "surprised"){
            document.getElementById("emoji1").innerHTML = "&#128562;";
        }
        if(results[1].label == "surprised"){
            document.getElementById("emoji2").innerHTML = "&#128562;";
        }
        if(results[0].label == "mad"){
            document.getElementById("emoji1").innerHTML = "&#128545;";
        }
        if(results[1].label == "mad"){
            document.getElementById("emoji2").innerHTML = "&#128545;";
        }
    }
}