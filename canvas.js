/*********************
CLASS DEFINITIONS
**********************/

class Scenario //array of scenes + information about voice box positioning
{
	constructor(scenarioName, scenes, proposal)
	{
		this.scenes = scenes;
		this.scenarioName = scenarioName;
		this.proposal = proposal; //scene # for proposal
	}

	toString()
	{
		return this.scenarioName;
	}
}


class Scene
{
	constructor(imgSource, duration, sounds)
	{
		this.duration = duration;
		this.imgSource = imgSource;
		this.sounds = sounds; //array of SceneSound objects
		//this.confession = confession; //boolean whether this scene is the proposal theme
	}
}

class SceneSound
{
	constructor(songName, startTime)
	{
		this.songName = songName;
		this.startTime = startTime;
		this.audio =  new Audio(`${this.songName}.ogg`);
	}

	playSong()
	{
		let playAudio = this.audio;
		setTimeout
		(
			function()
			{
				playAudio.play();
			},
			this.startTime
		);
	}

	stopSong()
	{
		this.audio.pause();
	}

	queueSong()
	{
		soundList.push(this.audio);
	}
}

/*class SceneImage
{
	constructor(imgSource, )
}*/

/*********************
CONSTANTS
**********************/

const DEFAULT_LINE = "The brown fox jumps over the lazy dog."

/*********************
GLOBAL VARIABLES
**********************/

let scene_i = 0; //current scene #
let currentScenario = 0; //current scenario #
let skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.

//KITCHEN SCENE

let scenario_0 = new Scenario
(
	"Kitchen Proposal",
	[
		new Scene('1-1.jpg', 4000, [new SceneSound('intro', 2000)]),
		new Scene('1-2.jpg', 1200, null),
		new Scene('1-2b.jpg', 1800, null),
		new Scene('1-2c.jpg', 1900, null),
		new Scene('1-2b.jpg', 1800, null),
		new Scene('1-3.jpg', 2700, null),
		new Scene('1-3b.jpg', 2000, null),
		new Scene('1-4.jpg', 2000, null),
		new Scene('1-4b.jpg', 5000, [new SceneSound('plove', 1000)]),
		new Scene('1-5.jpg', 5000, null)
	],
	8
); //contains individual scene objects

//TRAIN SCENE

let scenario_1 = new Scenario
(
	"Train Proposal",
	[
		new Scene('1.png', 5000, [new SceneSound('intro', 0)]),
		new Scene('2.png', 5000, null),
		new Scene('3.png', 5000, null),
		new Scene('4.png', 5000, [new SceneSound('will', 1000)]),
		new Scene('5.png', 5000, null)
	],
	3
);

//LIST OF SCENARIOS

let scenarioList = 
[
	scenario_0, scenario_1
];

let soundList = []; //list of sounds that can be accessed globally. Needed to turn them off whenever a scene is skipped, and to keep tabs.

let scene_elem = document.getElementById('scene');
let sceneWindow = document.getElementById('scene-window');
let line_text_elem = document.getElementById('line-text');
let dimmer = document.getElementById('dimmer');
var voiceBox = document.getElementById("voice-box");
var supportMsg = document.getElementById("msg");
var confessionButton = document.getElementById("confession-button");
var playScenarioButton = document.getElementById("play-button");
var playScenarioButton2 = document.getElementById("play-button2");

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

skipButton.addEventListener
('click', function(e)
	{

		scene_i = scenarioList[currentScenario].proposal - 1;
		skip = true;
		skipButton.style.display = 'none';
		for (i in soundList) 
  			{
  				console.log('deleting sounds');
			    soundList[i].pause();
			    soundList[i].currentTime = 0;
			}
		playScenario(scenarioList[currentScenario]);
	}
);

//master button listener
function buttonClick(scenario) //scenario = x, then scenario = currentScenario
{
	console.log('input length is: ' + speechMsgInput.value.length + '\nscene_i: ' + scene_i);
	if(speechMsgInput.value.length <= 0 && voiceBox.style.display) //button does nothing if no user input on voicebox
	{
		console.log('need to input a message');
		return;
		//should put warning message in the future
	}
	if(scenario < 0)
	{
		scenario = currentScenario;
	}


	dimmer.style.opacity = 0.5;
	sceneWindow.style.display = 'initial';

	currentScenario = scenario;
	skipButton.style.display = 'initial';
	playScenario(scenarioList[currentScenario]);
}


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

function playScenario(scenario) //plays the scene, if skip is true, goes to the proposal right away
{
	if(!skip)
	{
		voiceBox.style.display = 'none';
	}
	let songWaitTime = 0;
	console.log('XXXscene is ' + scene_i);
	let waitTime = scenario.scenes[scene_i].duration;

	scene_elem.style.backgroundImage = `url(${scenario.scenes[scene_i].imgSource})`;
	if(scene_i == scenario.proposal) //handles the scene where user inputs the dialogue
	{
		console.log(speechMsgInput.value);
		if(speechMsgInput.value == '')
		{
			voiceBox.style.display = 'initial';
			console.log(voiceBox.style.display);
			scene_i = 0;
			return;
		}
		else
		{
			msg.onend = function(event)
			{
				// waitTime += Math.floor(event.elapsedTime);
				// songWaitTime += Math.floor(event.elapsedTime) + 1000; //gap before song plays after utterance
				soundIterator(scenario);
				scene_i++;
				sceneEnd(scenario, waitTime);
  			}
  			console.log('proposal number is ' + scene_i);
				
			setTimeout
			(
				function()
				{
					speak(speechMsgInput.value);
				},
				2000
			);
		}
		
	}
	else
	{
		soundIterator(scenario);
		scene_i++;

		sceneEnd(scenario, waitTime);
	}
}

function soundIterator(scenario)
{
	
	if(scenario.scenes[scene_i].sounds) //if the scene has sounds, iterate through them and play them
	{
			for(let sound_i = 0; sound_i < scenario.scenes[scene_i].sounds.length; sound_i++)
			{
				//console.log('song start: ' + scenario.scenes[scene_i].sounds[sound_i].startTime);
				scenario.scenes[scene_i].sounds[sound_i].queueSong();

				setTimeout
				(
					function()
					{
						soundList[soundList.length - 1].play();
					},
					scenario.scenes[scene_i].sounds[sound_i].startTime
				);
				
			}
		
		
	}
}

function sceneEnd(scenario, waitTime)
{
	if(skip)
	{
		skip = false;

		return;
	}
	if(scene_i < scenario.scenes.length)
		{
			
			setTimeout(function(){playScenario(scenario)}, waitTime);
		}
		else
		{
			scene_i = 0;
			
			setTimeout
			(
				function()
				{
					sceneWindow.style.display = 'none';

					dimmer.style.opacity = 0;

					console.log('end of the line');
				},
				5000
			);

			
		}
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
  	line_text_elem.innerHTML = word + " ";
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