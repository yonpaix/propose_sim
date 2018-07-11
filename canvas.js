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
		this.confession = confession; //boolean whether this scene is the proposal theme
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

//KITCHEN SCENE

let scenes = 
[
	new Scene('1-1', 4000, [new SceneSound('intro', 2000)], false),
	new Scene('1-2', 1200, null, false),
	new Scene('1-2b', 1800, null, false),
	new Scene('1-2c', 1900, null, false),
	new Scene('1-2b', 1800, null, false),
	new Scene('1-3', 2700, null, false),
	new Scene('1-3b', 2000, null, false),
	new Scene('1-4', 2000, null, false),
	new Scene('1-4b', 5000, [new SceneSound('plove', 0)], true),
	new Scene('1-5', 5000, null, false)
]; //contains individual scene objects


let scene_elem = document.getElementById('scene');
let line_text_elem = document.getElementById('line-text');

var voiceBox = document.getElementById("voice-box");
var supportMsg = document.getElementById("msg");
var confessionButton = document.getElementById("confession-button");
var playSceneButton = document.getElementById("play-button");
var skipButton = document.getElementById("skip-button");
var speechMsgInput = document.getElementById("speech-msg");
var voiceSelect = document.getElementById("voice");
var volumeInput = document.getElementById("volume");
var rateInput = document.getElementById("rate");
var pitchInput = document.getElementById("pitch");

var msg = new SpeechSynthesisUtterance();
var wordIndex = 0;

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
				sceneSlide(false);
				
			}
		}
	);
}

if(playSceneButton)
{
	playSceneButton.addEventListener
	('click', function(e)
		{
			sceneSlide(false);
			
		}

	);
}

skipButton.addEventListener
('click', function(e)
	{
		sceneSlide(true);
	}
);


/*********************
FUNCTIONS
**********************/

function loadVoices()
{
	var voices = speechSynthesis.getVoices();
	voices.forEach
	(
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

	window.speechSynthesis.speak(msg);
}

function sceneSlide(skip) //plays the scene, if skip is true, goes to the proposal right away
{
	voiceBox.style.display = 'none';
	playSceneButton.style.display = 'none';
	//handles the skip button
	if(skip)
	{
		console.log("skip activated");
		for(let skip_i = 0; skip_i < scenes.length; skip_i++)
		{
			console.log(skip_i);
			if(scenes[skip_i].confession == true)
			{
				scene_i = skip_i
				break;
			}
		}
	}
	else
	{
		console.log('no skip detected');
	}

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
			speak(speechMsgInput.value);

		}
		
	}

	if(scenes[scene_i].sounds) //if the scene has sounds, iterate through them and play them
	{
		for(let sound_i = 0; sound_i < scenes[scene_i].sounds.length; sound_i++)
		{
			scenes[scene_i].sounds[sound_i].playSong();
		}
	}

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

/////////////////////////////////

msg.onboundary = function(event)
{
	console.log('onboundary fired');
  	var word = getWordAt(speechMsgInput.value,event.charIndex);
    // Show Speaking word : x
  	line_text_elem.innerHTML += word + " ";
    //Increase index of span to highlight
    
    wordIndex++;
};

msg.onend = function()
{
    wordIndex = 0;
};

// Get the word of a string given the string and the index
function getWordAt(str, pos)
{
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    var left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
}