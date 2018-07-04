/*********************
CONSTANTS
**********************/

/*********************
GLOBAL VARIABLES
**********************/

/*********************
EVENT LISTENERS
**********************/

/*********************
CLASS DEFINITIONS
**********************/

// speechSynthesis.getVoices().forEach(function(voice) {
//   console.log(voice.name, voice.default ? voice.default :'');
// });

// var msg = new SpeechSynthesisUtterance('Because that was the default!');
// msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Whisper'; })[0];
// speechSynthesis.speak(msg);

let scene_i = 0;
// let scene_array = ['1.png','2.png','3.png','4.png','5.png'];
let scene_array = ['1-1','1-2','1-3','1-4','1-5'];
let scene_elem = document.getElementById('scene');
let line_text_elem = document.getElementById('line-text');

function speechSynth(msgText)
{
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[10]; // Note: some voices don't support altering params
	console.log(voices.length + ' voices available.');
	voices.forEach(function(element) {
	  console.log(element);
	});

	
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 1; //0 to 2
	msg.text = msgText;
	msg.lang = 'ja-JP';

	msg.onend = function(e) {
	  console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};

	speechSynthesis.speak(msg);
}

function startAnimation()
{
	//console.log(document.getElementById("lineText").value);
	sceneSlide();
}

function audioFunction(songName) {
	var audio = new Audio(`${songName}.ogg`);
	audio.play();
}

function sceneSlide()
{
	let waitTime = 5000;
	scene_elem.style.backgroundImage = `url(1-${scene_i + 1}.jpg)`;
	
	console.log(scene_i);

	switch(scene_i) {
    case 0:
        audioFunction('intro');
        break;
    case 3:
    	speechSynth(document.getElementById("line-text-input").value);
    	line_text_elem.innerHTML = document.getElementById("line-text-input").value;
    	break;
    case 4:
    	line_text_elem.innerHTML = '';
    	audioFunction('plove');
    	break;
}

	scene_i++

	if(scene_i < scene_array.length)
	{
		setTimeout('sceneSlide()', waitTime);
	}
	else
	{
		scene_i = 0;
	}
}

