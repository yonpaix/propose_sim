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

class Scene
{
	constructor(duration, imgSource)
	{
		this.duration = duration;
		this.imgSource = imgSource;
	}
}

/*********************
FUNCTIONS
**********************/

function loadVoices()
{
	var voices = speechSynthesis.getVoices();
	voices.forEach(
		function(voice, i)
		{
			var option = document.createElement("option");
			option.value = voice.name;
			option.innerHTML = voice.name;
			voiceSelect.appendChild(option);
		}
	);
}

function speak(text)
{
	var msg = new SpeechSynthesisUtterance();
	msg.text = text;
	msg.volume = parseFloat(volumeInput.value);
	msg.rate = parseFloat(rateInput.value);
	msg.pitch = parseFloat(pitchInput.value);

	if(voiceSelect.value)
	{
		msg.voice = speechSynthesis.getVoices().filter
		(
			function(voice)
			{
				return voice.name == voiceSelect.value
			}
		)[0];
	}

	msg.onend = function(e) {
	  console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};

	window.speechSynthesis.speak(msg);
}

function startAnimation()
{
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
    	speak(speechMsgInput.value);
    	line_text_elem.innerHTML = speechMsgInput.value;
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

let scene_i = 0;
let scene_array = ['1-1','1-2','1-3','1-4','1-5'];
let scene_elem = document.getElementById('scene');
let line_text_elem = document.getElementById('line-text');

var supportMsg = document.getElementById("msg");
var button = document.getElementById("speak");
var speechMsgInput = document.getElementById("speech-msg");
var voiceSelect = document.getElementById("voice");
var volumeInput = document.getElementById("volume");
var rateInput = document.getElementById("rate");
var pitchInput = document.getElementById("pitch");

if('speechSynthesis' in window)
{
	supportMsg.innerHTML = "Your browser <strong>supports</strong> speech synthesis.";

}
else
{
	supportMsg.innerHTML = "Sorry, your browser <strong>does not support</strong> speech synthesis.";
}

loadVoices();

window.speechSynthesis.onvoiceschanged = function(e)
	{
		loadVoices();
	};

button.addEventListener('click', function(e)
	{
		console.log(speechMsgInput.value.length);
		if(speechMsgInput.value.length > 0)
		{
			speak(speechMsgInput.value);
		}
	}

);
