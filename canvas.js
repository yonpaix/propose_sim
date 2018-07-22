/*********************
CLASS DEFINITIONS
**********************/

class ProposalSim
{
	constructor(ID, currentScenario)
	{
		//this.scene_i = 0; //current scene # //now a variable in the Scenario itself
		this.ID = ID
		this.currentScenario = currentScenario; //current scenario #
		this.scenario = scenarioList[currentScenario];

		this.skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.
		this.close = false; //flag, exits whole process
		this.cleanUp = false; //flag, can't start new scene while this is true;	
	}
}

class Scenario //array of scenes + information about voice box positioning
{
	constructor(scenarioName, scenes, proposal, waitSpeak)
	{
		this.scenes = scenes;
		this.scenarioName = scenarioName;
		this.proposal = proposal; //scene # for proposal
		this.waitSpeak = waitSpeak; //wait until the dude speaks at the beginning of the proposal scene
		this.scene_i = 0;

		this.utterance = new SpeechSynthesisUtterance();

		this.soundList = []; //list of sounds that can be accessed globally. Needed to turn them off whenever a scene is skipped, and to keep tabs.	
	}

	speakTxt()
	{
		// debugger;
		utterance.text = speechMsgInputValue;
		console.log(speechMsgInputValue);
		utterance.volume = parseFloat(volumeInputValue);
		utterance.rate = parseFloat(rateInputValue);
		utterance.pitch = parseFloat(pitchInputValue);

		voiceSelectValue = voiceSelect.value;

		if(voiceSelectValue)
		{
			utterance.voice = speechSynthesis.getVoices().filter
			(
				function(voice)
				{
					return voice.name == voiceSelectValue;
				}
			)[0];
		}

			window.speechSynthesis.speak(utterance);

		
	}

	toString()
	{
		return this.scenarioName;
	}

	iterateSounds()
	{
		//let itself = this;
		let sceneSounds = this.scenes[this.scene_i].sounds;
		if(sceneSounds) //if the scene has sounds, iterate through them and play them
		{
				for(let sound_i = 0; sound_i < sceneSounds.length; sound_i++)
				{
					this.soundList.push(sceneSounds[sound_i]);


					// setTimeout
					// (
					// 	function()
					// 	{
					// 		itself.soundList[itself.soundList.length - 1].play(); //might lead to issues, due to itself only being a copy of this?
					// 	},
					// 	sceneSounds[sound_i].startTime
					// );
					
					setTimeout(() => 
						{
					    	this.soundList[this.soundList.length - 1].audio.play();
					  	}, 
					  	sceneSounds[sound_i].startTime
					 );

				}
			
			
		}
	}

	playScenario() //plays the scene, if skip is true, goes to the proposal right away
	{

		// scenario = this.scenario;
		// scene_i = scenario.scene_i;


		/*if(!this.skip)
		{
			voiceBox.style.display = 'none';
		}*/
		//get rid of reset button when the scene before the proposal scene is reached
		if(this.scene_i == this.proposal - 1)
			skipButton.style.display = 'none';

		//reset linetext when final scene plays. The one where she's crying
		if(this.scene_i == this.proposal + 1)
			lineText.innerHTML = '';
		
		let waitTime = this.scenes[this.scene_i].duration;

		sceneElem.style.backgroundImage = `url(${this.scenes[this.scene_i].animations[0].imgSource})`;

		this.scenes[this.scene_i].animateEntity();

		if(this.scene_i == this.proposal) //handles the scene where user inputs the dialogue
		{
			if(!speechMsgInputValue) //if there is no input message
			{
				setTimeout
				(
					function()
					{
						if(sceneWindow.style.display == 'none') //if scene window is not there, don't even bother.
							return;
						let moment = new Audio('sounds/moment.mp3');
						moment.play();
						voiceBox.style.display = 'initial';
					},
					this.waitSpeak
				);
				
				this.scene_i = 0;
				
				return;
			}
			else //if there is an input message
			{
				let prevIndex;

				this.utterance.onboundary = function(event)
				{
					const index = event.charIndex;
					if(prevIndex === index)
					{
						console.log('double first word, don\'t print');
						return;
					}
					prevIndex = index;
				  	const word = getWordAt(speechMsgInputValue,index);
				    
				  	lineText.innerHTML += word + " ";
				};

				this.utterance.onend = function(event)
				{
					// if(!currentScene) //if current scene is null, close button was pressed, don't go into these promises
					// {
					// 	msg.onend = null;
					// 	return;
					// }
					this.iterateSounds();
					this.scene_i++; 
					this.sceneEnd();
	  			}				
				setTimeout
				(
					function()
					{
						// if(!currentScene) //if current scene is null, close button was pressed, don't go into these promises
						// {
						// 	return;
						// }
						speakTxt();
					},
					scenario.waitSpeak
				);
			}
			
		}

		else
		{
			this.iterateSounds();
			this.scene_i++;
			this.sceneEnd();
		}
	}

	sceneEnd()
	{
		//let itself = this;
		let waitTime = this.scenes[this.scene_i].duration;
		/*if(this.skip) //scene is skipped
		{
			skip = false;
			return;
		}*/
		/*if(close) //scene is exited by user input
		{
			close = false;
			sceneWindow.style.display = 'none';
			dimmer.style.opacity = 0;
			cleanUpVar();
			window.speechSynthesis.cancel(); //cancel current voice audio
			cleanUpSounds();
			
			console.log('end of the line');
		}*/
		/*else if*/
		if(this.scene_i < this.scenes.length) //scene continues;
		{
			console.log('continue to next scene');
			//setTimeout(function(){itself.playScenario();}, waitTime);

			setTimeout(() => 
						{
					    	this.playScenario();
					  	}, 
					  	waitTime
					 );

		}
		else //scene naturally ends
		{
			let outputCode = encodeScenario();
			cleanUpVar();
			soundList[soundList.length - 1].onended = //last sound should be exile song. Clean up when song ends. Later can be used to show social media screen
			function()
			{
				console.log('scenario ends with scene #' + scene_i);
				//sceneWindow.style.display = 'none';
				//dimmer.style.opacity = 0;
				cleanUpSounds();
				endWindow.style.display = 'initial';
				end.style.display = 'initial';
				sceneCode.value = outputCode;
			};
		}
	}
}


class Scene
{
	constructor(duration, sounds, animations)
	{
		this.duration = duration;
		//this.imgSource = imgSource;
		this.sounds = sounds; //array of SceneSound objects
		this.animations = animations; //array of objects in the scene and their animation
		//FIRST ITEM IN THE ARRAY IS ALWAYS THE BACKGROUND
	}

	animateEntity(/*scenario*/)
	{
		let animationStyle;
		let timing;
		for (let i in this.animations)
		{ 
			//sceneElem.style.animation = 'none';
			animationStyle = this.animations[i].animationStyle;
			timing = this.animations[i].timing;
			sceneElem.style.animation = `${animationStyle} ${timing} linear`;
		} 
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
		this.audio.stop();
	}

	// queueSong()
	// {
	// 	soundList.push(this.audio);
	// }
}

class SceneAnimation
{
	constructor(imgSource, animationStyle, timing, delay, count, direction)
	{
		this.imgSource = imgSource;
		this.animationStyle = animationStyle;
		this.timing = timing;
		this.delay = delay;
		this.count = count;
		this.direction = direction;
	}
}

/*********************
CONSTANTS
**********************/
const DEFAULT_MAX_LENGTH = 100;

/*********************
GLOBAL VARIABLES
**********************/

// let scene_i = 0; //current scene #
// let currentScenario = null; //current scenario #
// let skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.
// let close = false; //flag, exits whole process
// let cleanUp = false; //flag, can't start new scene while this is true;

//KITCHEN SCENE

let scenario_0 = new Scenario
(
	"Kitchen Proposal",
	[
		new Scene(3400, [new SceneSound('sounds/kitchen-love', 0)], 
				[new SceneAnimation('1-1.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(1800, null,
				[new SceneAnimation('1-2.jpg', 'shiftx', '1s', 0, 1, 'forwards')]
			),
		new Scene(2500, null,
				[new SceneAnimation('1-2b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(4100, null,
				[new SceneAnimation('1-2c.jpg', 'shiftx', '1s', 0, 1, 'forwards')]
			),
		new Scene(2600, null,
				[new SceneAnimation('1-2b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(1700, null,
				[new SceneAnimation('1-3.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(1600, null,
				[new SceneAnimation('1-3b.jpg', 'shiftx', '10s', 0, 1, 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('1-4.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('1-4b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('1-5.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			)
	],
	8, 1000
); //contains individual scene objects

//TRAIN SCENE

// let scenario_1 = new Scenario
// (
// 	"Train Proposal",
// 	[
// 		new Scene('1.png', 5000, [new SceneSound('intro', 0)]),
// 		new Scene('2.png', 5000, null),
// 		new Scene('3.png', 5000, null),
// 		new Scene('4.png', 5000, [new SceneSound('will', 0)]),
// 		new Scene('5.png', 5000, null)
// 	],
// 	3, 1000
// );

let scenario_1 = new Scenario
(
	"Kitchen Proposal",
	[
		new Scene(3400, [new SceneSound('sounds/kitchen-love', 0)], 
				[new SceneAnimation('1-1.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(1800, null,
				[new SceneAnimation('1-2.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(2500, null,
				[new SceneAnimation('1-2b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(4100, null,
				[new SceneAnimation('1-2c.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(2600, null,
				[new SceneAnimation('1-2b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(1700, null,
				[new SceneAnimation('1-3.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(1600, null,
				[new SceneAnimation('1-3b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('1-4.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('1-4b.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('1-5.jpg', 'zoomin', '10s', 0, 1, 'forwards')]
			)
	],
	8, 1000
); //contains individual scene objects

let scenario_2 = new Scenario
(
	"Office Proposal",
	[
		new Scene('images/2-1.jpg', 3000, [new SceneSound('sounds/office-love', 0)]),
		new Scene('images/2-2.jpg', 3000, null),
		new Scene('images/2-3.jpg', 2800, null),
		new Scene('images/2-4.jpg', 1100, null),
		new Scene('images/2-5.jpg', 2400, null),
		new Scene('images/2-6.jpg', 1900, null),
		new Scene('images/2-7.jpg', 2500, null),
		new Scene('images/2-8.jpg', 2800, null),
		new Scene('images/2-9.jpg', 5000, [new SceneSound('plove', 250)]),
		new Scene('images/2-10.jpg', 5000, null)
	],
	8, 2000
);
//LIST OF SCENARIOS

let scenarioList = 
[
	scenario_0, scenario_1, scenario_2
];

// let soundList = []; //list of sounds that can be accessed globally. Needed to turn them off whenever a scene is skipped, and to keep tabs.

let sceneElem = document.getElementById('scene-bg');
let sceneWindow = document.getElementById('scene-window');
let lineText = document.getElementById('line-text');
let dimmer = document.getElementById('dimmer');
let voiceBox = document.getElementById("voice-box");
let endWindow = document.getElementById('end-window');
let end = document.getElementById('end');
let supportMsg = document.getElementById("support-msg");

let confessionButton = document.getElementById("confession-button");
let skipButton = document.getElementById("skip-button");
let previewButton = document.getElementById("preview-button");
let closeButton = document.getElementById("close-button");
let readySceneButton = document.getElementById("ready-button");


let sceneCode = document.getElementById('code');
let speechMsgInput = document.getElementById("speech-msg");
let speechMsgInputValue;
let voiceSelect = document.getElementById("voice");
let voiceSelectValue;
let volumeInput = document.getElementById("volume");
let volumeInputValue;
let rateInput = document.getElementById("rate");
let rateInputValue;
let pitchInput = document.getElementById("pitch");
let pitchInputValue;

// let msg = new SpeechSynthesisUtterance();

let maxLength = document.getElementById('max-length');
let lengthCounter = DEFAULT_MAX_LENGTH;
speechMsgInput.setAttribute("maxlength", DEFAULT_MAX_LENGTH);

maxLength.innerHTML = lengthCounter;

loadVoices();

proposalID = 0; //index of the global proposal arrray that keeps track of scenarios being played.
proposalSim = [];

/*********************
EVENT LISTENERS
**********************/

window.speechSynthesis.onvoiceschanged = function(e)
{
	loadVoices();
};

function maxLengthUpdate()
{
	lengthCounter = DEFAULT_MAX_LENGTH - speechMsgInput.value.split('').length;
	maxLength.innerHTML = lengthCounter;
	console.log(speechMsgInput.value.split());
}

speechMsgInput.addEventListener
('keydown', function(event)
	{
		const key = event.which;
  		if(key == 8 || key == 46)
  		{
  			lengthCounter = DEFAULT_MAX_LENGTH - speechMsgInput.value.split('').length;
			maxLength.innerHTML = lengthCounter;
  		}
	}
);

previewButton.addEventListener
('click', function(e)
	{
		window.speechSynthesis.cancel(); //cancel current voice audio

		speechMsgInputValue = speechMsgInput.value;
		volumeInputValue = volumeInput.value;
		rateInputValue = rateInput.value;
		pitchInputValue = pitchInput.value;
		
		if(speechMsgInput.value.length > 0)
		{
			setTimeout
			(
				function()
				{
					speakTxt();
				},
				250
			);
		}

	}
);

skipButton.addEventListener
('click', function(e)
	{

		scene_i = scenarioList[currentScenario].proposal - 1;
		skip = true;
		skipButton.style.display = 'none';
		cleanUpSounds();
		playScenario(scenarioList[currentScenario]);
	}
);

readySceneButton.addEventListener
('click', function(e)
	{

		//HANDLES PRECONSTRUCTED SCENARIOS from the URL
		if(window.location.search.substring(1))
		{
			//currentScenario = getQueryVariable("id");

			dimmer.style.opacity = 0.5;
			sceneWindow.style.display = 'initial';
			skipButton.style.display = 'initial';

			// speechMsgInputValue = decodeURI(getQueryVariable('spk'));
			// volumeInputValue = getQueryVariable('vol');
			// rateInputValue = getQueryVariable('rat');
			// pitchInputValue = getQueryVariable('pit');

			decodeScenario();

			playScenario(scenarioList[currentScenario]);
		}
	}
);

closeButton.addEventListener
('click', function(e)
	{
		/*voiceBox.style.display = 'none';
		sceneWindow.style.display = 'none';
		skipButton.style.display = 'initial';
		dimmer.style.opacity = 0;
		window.speechSynthesis.cancel(); //cancel current voice audio
		cleanUpSounds();
		
		close = true;
		cleanUp = true;

		//if the scene stopped because they are in the input screen, the scene will not clean up, but the button will need to take care of it.
		if(scene_i == 0 && currentScenario != null)
		{
			console.log('clean up on aisle 4');
			cleanUpVar();
		}

		//if the scene already cleaned up but the song is still playing and the window is still up, need to manually falsify cleanUp, because it was already taken cared of, and now it's true again.
		if(currentScenario == null)
		{
			close = false;
			cleanUp = false;
		}

		//if the scene is on the proposal scene, it will create a bunch of promises and just quits, so we need to handle clean up on button click
		if(scene_i == scenarioList[currentScenario].proposal && speechMsgInput.value != '') //BUGBUGBUG currentScenario is undefined and throws an error if closing during the voiceBox phase
		{	
			cleanUpVar();
		}*/
	}
);

//master button listener
function buttonClick(scenarioNum) //scenario = x, then scenario = currentScenario
{
	/*if(cleanUp) //can't start new scenario while the variables are getting cleaned up.
	{
		console.log('cleaning up currently');
		return;
	}*/
	if(speechMsgInput.value.length <= 0 && voiceBox.style.display == 'initial') //button does nothing if no user input on voicebox
	{
		console.log('need to input a message');
		return;
		//should put warning message in the future
	}
	/*if(scenario < 0) //for buttons that continues a scenario where it is already picked initially
	{
		scenarioNum = proposalSim.currentScenario;
	}*/

	//proposalSim.currentScenario = scenarioNum;

	dimmer.style.opacity = 0.5;
	sceneWindow.style.display = 'initial';
	skipButton.style.display = 'initial';
	//proposalSim.speechSynthesis.cancel(); //cancel current voice audio

	speechMsgInputValue = speechMsgInput.value;
	volumeInputValue = volumeInput.value;
	rateInputValue = rateInput.value;
	pitchInputValue = pitchInput.value;

	proposalSim[proposalID] = new ProposalSim(proposalID, scenarioNum);
	proposalSim[proposalID].scenario.playScenario();
	proposalID++;
}


/*********************
FUNCTIONS
**********************/

// function upperCase(str) {
//     return str.toUpperCase();
// }
// function titleCase(str) {
//     var firstLetterRx = /(^|\s)[a-z]/g;
//     return str.replace(firstLetterRx, upperCase);
// }

function encodeScenario()
{
			let encodeScenario = currentScenario; //should be a single character space number
			let encodeMsg = speechMsgInputValue; //this will go at the end of the code, due to variable length

			//let randNum = Math.floor(Math.random() * 9) + 1;
			//encodeMsg = CaesarCipher(encodeMsg, randNum);

			let encodeRate = rateInputValue * 10 + ""; //3 digit number
			while(encodeRate.length < 3)
			{
				encodeRate = '0' + encodeRate;
			}
			//console.log("the encoderate is " + encodeRate);
			let encodePitch = pitchInputValue * 10 + ""; //2 digit number
			while(encodePitch.length < 2)
			{
				encodePitch = '0' + encodePitch;
			}
			//console.log("the encodepitch is " + encodePitch);

			let encodeCode = currentScenario + "" + encodeRate + "" + encodePitch + "" + encodeMsg;

			encodeCode = btoa(encodeCode);

			encodeCode = encodeURIComponent(encodeCode);

			return encodeCode;

			// function CaesarCipher(str, num)
			// {
			//     let result = '';
			//     let charcode = 0;

			//     for (let i = 0; i < str.length; i++) {
			//         charcode = (str[i].charCodeAt()) + num;
			//         result += String.fromCharCode(charcode);
			//     }
			//     return result;
			// }

}

function decodeScenario()
{
	var queryString = window.location.search.substring(1);
	debugger;
	console.log(queryString);
	queryString = decodeURIComponent(queryString);
	console.log(queryString);
	queryString = atob(queryString);
	console.log(queryString);

	currentScenario = queryString.substr(0,1);
	volumeInputValue = 1;
	rateInputValue = queryString.substr(1,3) / 10;
	pitchInputValue = queryString.substr(4,2) / 10;

	//console.log('rate input decoded is ' + rateInputValue + '. pitch input decoded is ' + pitchInputValue);

	speechMsgInputValue = queryString.substr(6);
	//console.log(speechMsgInputValue);
	//speechMsgInputValue = speechMsgInputValue.substr(0, speechMsgInputValue.length - 1);
	//console.log(speechMsgInputValue);
	//speechMsgInputValue = deCipher(speechMsgInputValue, queryString.substr(queryString.length - 1, 1));
	//speechMsgInputValue = atob(speechMsgInputValue);
	//console.log(speechMsgInputValue);

	// function deCipher(str, num)
	// {
	// 	let result = '';
	// 	let charcode = 0;

	// 	for (let i = 0; i < str.length; i++) {
	// 		        charcode = (str[i].charCodeAt()) - num;
	// 		        result += String.fromCharCode(charcode);
	// 		    }
	// 		    return result;
	// }
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function loadVoices()
{
	var voices = speechSynthesis.getVoices();
	voices.forEach
	(
		function(voice, i)
		{
			if(voice.lang == 'ja-JP')
			{
				var option = document.createElement("option");
			option.value = voice.name;
			option.innerHTML = voice.name;
			voiceSelect.appendChild(option);
	
			}
		}
	);
}

///////////////PREVIOUS LOCATION OF speakTxt ////////////////////////////////

///////////////PREVIOUS LOCATION OF animateBG - to be called: animateEntity//////////////////////////////

///////////////PREVIOUS LOCATION FOR playScenario//////////////////////////

// Get the word of a string given the string and the index
function getWordAt(str, pos)
{
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;
    // Search for the word's beginning and end.
    let left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
}

/////////////////PREVIOUS LOCATION OF iterateSounds//////////////////////

/////////////////ORIGINAL LOCATION OF sceneEnd///////////////////////////

function cleanUpSounds()
{
	for (i in soundList) 
	{
			console.log('deleting sounds');
		    soundList[i].pause();
		    soundList[i].currentTime = 0;
	}
}

function cleanUpVar()
{
	console.log('current scene cleaning up is #' + scene_i);
	speechMsgInput.value = '';
	msg.onboundary = null;
	msg.onend = null;
	console.log(msg.onend);

	scene_i = 0; //current scene #
	currentScenario = null; //current scenario #
	skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.
	close = false; //flag, exits whole process
	cleanUp = false; //flag, can't start new scene while this is true;
}

///////////////////////////////////////
// IMPLEMENTATION
///////////////////////////////////////



if('speechSynthesis' in window)
{
	supportMsg.innerHTML = "Your browser <strong>supports</strong> speech synthesis.";

}
else
{
	supportMsg.innerHTML = "Sorry, your browser <strong>does not support</strong> speech synthesis. Get the best experience with Google Chrome";
}