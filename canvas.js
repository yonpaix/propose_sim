/*********************
CLASS DEFINITIONS
**********************/

class Scene
{
	constructor(imgSource, duration, sounds, confession)
	{
		this.duration = duration;
		this.imgSource = imgSource;
		this.sounds = sounds; //array of SceneSound objects
		this.confession = confession;
	}
}

class SceneSound
{
	constructor(songName, startTime)
	{
		this.songName = songName;
		this.startTime = startTime;
	}

	playSong()
	{
		var audio = new Audio(`${this.songName}.ogg`);
		//audio.play();
		console.log(audio);
		setTimeout
		(
			function()
			{
				audio.play();
			},
			this.startTime
		);
	}
}

/*class SceneImage
{
	constructor(imgSource, )
}*/

/*********************
CONSTANTS
**********************/

/*********************
GLOBAL VARIABLES
**********************/

let scene_i = 0;

let scenes = 
[
	new Scene('1-1', 5000, [new SceneSound('intro', 2000)], false),
	new Scene('1-2', 2000, null, false),
	new Scene('1-2b', 2000, null, false),
	new Scene('1-2c', 2000, null, false),
	new Scene('1-2b', 2000, null, false),
	new Scene('1-3', 2000, null, false),
	new Scene('1-3b', 2000, null, false),
	new Scene('1-4', 2000, null, false),
	new Scene('1-4b', 5000, [new SceneSound('plove', 0)], true),
	new Scene('1-5', 5000, null, false)
]; //contains individual scene objects



// var n = 100;
// var sample = [];
// for (var i = 0; i < n; i++)
//     sample.push({});


let scene_elem = document.getElementById('scene');
let line_text_elem = document.getElementById('line-text');

var voiceBox = document.getElementById("voice-box");
var supportMsg = document.getElementById("msg");
var confessionButton = document.getElementById("confession-button");
var playSceneButton = document.getElementById("play-button");
var speechMsgInput = document.getElementById("speech-msg");
var voiceSelect = document.getElementById("voice");
var volumeInput = document.getElementById("volume");
var rateInput = document.getElementById("rate");
var pitchInput = document.getElementById("pitch");

/*********************
EVENT LISTENERS
**********************/

if(confessionButton)
{
	confessionButton.addEventListener
	('click', function(e)
		{
			if(speechMsgInput.value.length > 0)
			{
				startAnimation();
			}
		}

	);
}

if(playSceneButton)
{
	playSceneButton.addEventListener
	('click', function(e)
		{
			startAnimation();
		}

	);
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
	console.log('slide complete');
}

function sceneSlide()
{
	let waitTime = scenes[scene_i].duration;
	scene_elem.style.backgroundImage = `url(${scenes[scene_i].imgSource}.jpg)`;
	if(scenes[scene_i].confession) //handles the scene where user inputs the dialogue
	{
		console.log(speechMsgInput.value);
		if(speechMsgInput.value == '')
		{
			voiceBox.style.display = 'initial';
			scene_i = 0;
			return;
		}
		else
		{
			console.log('second round');
		}
		
	}

	if(scenes[scene_i].sounds) //if the scene has sounds, iterate through them and play them
	{
		for(let sound_i = 0; sound_i < scenes[scene_i].sounds.length; sound_i++)
		{
			scenes[scene_i].sounds[sound_i].playSong();
		}
	}

	console.log(scene_i);

	/*switch(scene_i)
	{
	    case 3:
	    	speak(speechMsgInput.value);
	    	line_text_elem.innerHTML = speechMsgInput.value;
	    	break;
	    case 4:
	    	line_text_elem.innerHTML = '';
	    	break;
	}*/

	scene_i++

	if(scene_i < scenes.length)
	{
		setTimeout('sceneSlide()', waitTime);
	}
	else
	{
		scene_i = 0;
	}
}

function audioFunction(songName)
	{
		var audio = new Audio(`${songName}.ogg`);
		audio.play();
	}

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

// startAnimation();