/*********************
CLASS DEFINITIONS
**********************/

class ProposalSim
{
	constructor(currentScenario)
	{
		//this.scene_i = 0; //current scene # //now a variable in the Scenario itself
		//this.ID = ID
		this.currentScenario = currentScenario; //current scenario #
		this.scenario = scenarioList[currentScenario];

		this.skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.
		this.close = false; //flag, exits whole process
		// this.cleanUp = false; //flag, can't start new scene while this is true;	
		this.scene_i = 0;
		this.soundList = []; //list of sounds that can be accessed globally. Needed to turn them off whenever a scene is skipped, and to keep tabs.	
		this.nextSounds = [];
	}

	speakTxt()
	{
		// debugger;
		utterance.text = speechMsgInputValue;
		//console.log(speechMsgInputValue);
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

	playScenario() //plays the scene, if skip is true, goes to the proposal right away
	{
		if(this.close)
			return;
		// scenario = this.scenario;
		// scene_i = scenario.scene_i;


		if(!this.skip)
		{
			voiceBox.style.display = 'none';
		}
		//get rid of reset button when the scene before the proposal scene is reached
		if(this.scene_i === this.scenario.proposal)
			skipButton.style.display = 'none';

		//reset linetext when final scene plays. The one where she's crying
		if(this.scene_i == this.scenario.proposal + 1)
			lineText.innerHTML = '';
		
		//let waitTime = this.scenario.scenes[this.scene_i].duration;
		for(let i in this.scenario.scenes[this.scene_i].animations)
		{
			this.scenario.scenes[this.scene_i].animations[i].animateEntity(i);
		}
		//this.scenario.scenes[this.scene_i].animateEntity();

		if(this.scene_i == this.scenario.proposal) //handles the scene where user inputs the dialogue
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
					this.scenario.waitSpeak
				);
				
				this.scene_i = 0;
				
				return;
			}
			else //if there is an input message
			{
				let prevIndex;

				utterance.onboundary = function(event)
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
				let that = this;
				utterance.onend = function(event)
				{
					// if(!currentScene) //if current scene is null, close button was pressed, don't go into these promises
					// {
					// 	msg.onend = null;
					// 	return;
					// }
					that.iterateSounds();
					// that.scene_i++; 
					that.sceneEnd();
	  			}				
				
				this.nextSounds.push(setTimeout(() => 
						{
					    	this.speakTxt();
					  	}, 
					  	this.scenario.waitSpeak
					 ));
			}
			
		}

		else
		{
			this.iterateSounds();
			//this.scene_i++;
			this.sceneEnd();
		}
	}

	sceneEnd()
	{
		let waitTime = this.scenario.scenes[this.scene_i].duration;
		this.scene_i++; 

		console.log(this.soundList);

		if(this.scene_i < this.scenario.scenes.length) //scene continues;
		{
			console.log('continue to next scene');
			//setTimeout(function(){itself.playScenario();}, waitTime);

			setTimeout(() => 
						{
							//console.log(this);
					    	this.playScenario();
					  	}, 
					  	waitTime
					 );

		}
		else //scene naturally ends
		{
			let outputCode = this.encodeScenario();
			// console.log(this.soundList);
			this.soundList[this.soundList.length - 1].audio.onended = //last sound should be exile song. Clean up when song ends. Later can be used to show social media screen
			function()
			{
				endWindow.style.display = 'initial';
				end.style.display = 'initial';
				sceneCode.value = outputCode;
			};
		}
	}

	encodeScenario()
{
			let encodeScenario = this.currentScenario; //should be a single character space number
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

			let encodeCode = this.currentScenario + "" + encodeRate + "" + encodePitch + "" + encodeMsg;
			encodeCode = Base64Encode(encodeCode);
			encodeCode = btoa(encodeCode);

			encodeCode = encodeURIComponent(encodeCode);

			return encodeCode;
			function Base64Encode(str, encoding = 'utf-8')
			{
			    var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);        
			    return base64js.fromByteArray(bytes);
			}
}

	iterateSounds()
	{
		//let itself = this;
		let sceneSounds = this.scenario.scenes[this.scene_i].sounds;
		if(sceneSounds) //if the scene has sounds, iterate through them and play them
		{
				for(let sound_i = 0; sound_i < sceneSounds.length; sound_i++)
				{
					// this.soundList.push(sceneSounds[sound_i]);
					// //this.soundList[this.soundList.length - 1].playSong();
				 //    this.nextSound = setTimeout(
				 //    () => 
					// 	{
				 //    		this.soundList[this.soundList.length - 1].audio.play();
				 //  		}, 
				 //  			sceneSounds[sound_i].startTime
					// );

					this.nextSounds.push( setTimeout(
					() =>
						{
							this.soundList.push(sceneSounds[sound_i]);
							this.soundList[this.soundList.length - 1].audio.play();
						},
							sceneSounds[sound_i].startTime
					)
					);
				}
			
			
		}
	}

	cleanUpSounds()
	{
		for (let sound of this.soundList) 
		{
				console.log('deleting sounds');
				console.log(sound);
			    sound.audio.pause();
			    sound.audio.currentTime = 0; //this is not the full solution? It shouldn't matter, because the next time the audio plays, it should be a new instance?
		}
		//this.soundList = [];
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
		//this.scene_i = 0;
	}

	toString()
	{
		return this.scenarioName;
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

}

class SceneSound
{
	constructor(songName, startTime)
	{
		this.songName = songName;
		this.startTime = startTime;
		this.audio =  new Audio(`${this.songName}.ogg`);
	}

}

class SceneAnimation
{
	constructor(imgSource, animationStyle, timing, duration, delay, fillMode)
	{
		this.imgSource = imgSource;
		this.animationStyle = animationStyle;
		this.timing = timing;
		this.duration = duration;
		this.delay = delay;
		this.fillMode = fillMode;
		//this.bg = bg; //boolean, background or not
	}

	animateEntity(entity)
	{
		// let animationStyle;
		// let duration;
		// let timing;
		console.log('entity is ' + entity);
		let div = document.createElement("div");
		if(entity == 0) //first entity is the background
		{
			console.log('bg animate');
			div.classList.add("scene-bg");
			$(div).hide().fadeIn(500);
		}
		else
		{
			div.classList.add('entity');
		}
		sceneDiv.appendChild(div);

		div.style.backgroundImage = `url(${this.imgSource})`;
		// div.style.animation = `${this.animationStyle} ${this.duration} ${this.timing} ${this.delay} ${this.fillMode}`;
		//name duration timing-function delay iteration-count direction fill-mode play-state;
		let animationSpec = `${this.animationStyle} ${this.duration} ${this.timing} ${this.delay} ${this.fillMode}`;
		console.log('spec is ' + animationSpec);

		div.style.animation = animationSpec;
		
	}
}

/*********************
CONSTANTS
**********************/
const DEFAULT_MAX_LENGTH = 100;
const HEART_CONST = 20;

/*********************
GLOBAL VARIABLES
**********************/

// let scene_i = 0; //current scene #
// let currentScenario = null; //current scenario #
// let skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.
// let close = false; //flag, exits whole process
// let cleanUp = false; //flag, can't start new scene while this is true;



// let soundList = []; //list of sounds that can be accessed globally. Needed to turn them off whenever a scene is skipped, and to keep tabs.

let sceneDiv = document.getElementById('scene');
let sceneElem = document.getElementById('scene-bg');
let sceneWindow = document.getElementById('scene-window');
let lineText = document.getElementById('line-text');
let dimmer = document.getElementById('web-body');
let voiceBox = document.getElementById("voice-box");
let endWindow = document.getElementById('end-window');
let end = document.getElementById('end');
let supportMsg = document.getElementById("support-msg");
let heartContainer = document.getElementById("heart-container");


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
//let animationClass = document.getElementById("speech-msg");

// let msg = new SpeechSynthesisUtterance();

let maxLength = document.getElementById('max-length');
let lengthCounter = DEFAULT_MAX_LENGTH;
speechMsgInput.setAttribute("maxlength", DEFAULT_MAX_LENGTH);

maxLength.innerHTML = lengthCounter;

loadVoices();

let proposalSims = [];
utterance = new SpeechSynthesisUtterance();

strayHearts();

/*********************
EVENT LISTENERS
**********************/

window.speechSynthesis.onvoiceschanged = function(e)
{
	loadVoices();
};

speechMsgInput.addEventListener('keydown', updateLengthCounter);
speechMsgInput.onpaste = function(){updateLengthCounter();};

function updateLengthCounter()
{
	setTimeout
	(
		()=>
		{
			lengthCounter = DEFAULT_MAX_LENGTH - speechMsgInput.value.split('').length;
			maxLength.innerHTML = lengthCounter;
		}, 50
	);
	// lengthCounter = DEFAULT_MAX_LENGTH - speechMsgInput.value.split('').length;
	// maxLength.innerHTML = lengthCounter;
}

previewButton.addEventListener
('click', function(e)
	{
		window.speechSynthesis.cancel(); //cancel current voice audio

		speechMsgInputValue = speechMsgInput.value;
		volumeInputValue = volumeInput.value;
		rateInputValue = rateInput.value;
		pitchInputValue = pitchInput.value;
		proposalSims[proposalSims.length - 1].speakTxt();
		// if(speechMsgInput.value.length > 0)
		// {
		// 	setTimeout
		// 	(
		// 		function()
		// 		{
		// 			proposalSims[proposalSims.length - 1].speakTxt();
		// 		},
		// 		50
		// 	);
		// }

	}
);

// readySceneButton.addEventListener
// ('click', function(e)
// 	{

// 		//HANDLES PRECONSTRUCTED SCENARIOS from the URL
// 		if(window.location.search.substring(1))
// 		{
// 			//currentScenario = getQueryVariable("id");

// 			dimmer.style.filter = 'blur(5px)';
// 			sceneWindow.style.display = 'initial';
// 			skipButton.style.display = 'initial';

// 			// speechMsgInputValue = decodeURI(getQueryVariable('spk'));
// 			// volumeInputValue = getQueryVariable('vol');
// 			// rateInputValue = getQueryVariable('rat');
// 			// pitchInputValue = getQueryVariable('pit');

// 			let cScenario = decodeScenario();

// 			proposalSims.push(new ProposalSim(cScenario));
// 			proposalSims[proposalSims.length - 1].playScenario();
// 		}
// 	}
// );

skipButton.addEventListener
('click', function(e)
	{

		proposalSims[proposalSims.length - 1].scene_i = proposalSims[proposalSims.length - 1].scenario.proposal;//scenarioList[currentScenario].proposal - 1;
		//skip = true;
		skipButton.style.display = 'none';
		proposalSims[proposalSims.length - 1].cleanUpSounds();
		//playScenario(scenarioList[currentScenario]);
	}
);

closeButton.addEventListener
('click', function(e)
	{
		cleanUpVar();
		//speechMsgInput.value = '';
		proposalSims[proposalSims.length - 1].close = true;
		proposalSims.pop();
	}
);

//master button listener
function buttonClick(scenarioNum) //scenario = x, then scenario = currentScenario
{
	if(speechMsgInput.value.length <= 0 && voiceBox.style.display == 'initial') //button does nothing if no user input on voicebox
	{
		console.log('need to input a message');
		return;
		//should put warning message in the future
	}
	if(scenarioNum < 0) //for buttons that continues a scenario where it is already picked initially
	{
		scenarioNum = proposalSims[proposalSims.length - 1].currentScenario;
	}

	//proposalSim.currentScenario = scenarioNum;

	// dimmer.style.opacity = 0.5;
	dimmer.style.filter = 'blur(5px)';
	
	console.log("playstate is " + heartContainer.children[0].style.animationPlayState);
	// pauses all the hearts when the scenario plays
	for(let k = 0; k < heartContainer.children.length; k++)
	{
		heartContainer.children[k].style.animationPlayState = "paused";
	}
	

	sceneWindow.style.display = 'initial';
	skipButton.style.display = 'initial';
	speechSynthesis.cancel(); //cancel current voice audio

	speechMsgInputValue = speechMsgInput.value;
	volumeInputValue = volumeInput.value;
	rateInputValue = rateInput.value;
	pitchInputValue = pitchInput.value;

	proposalSims.push(new ProposalSim(scenarioNum));
	proposalSims[proposalSims.length - 1].playScenario();
}


/*********************
FUNCTIONS
**********************/

////////////////////////ORIGINAL LOCATION FOR encodeScenario()///////////////////////////////////////////////

function decodeScenario()
{
	let queryString = window.location.search.substring(1);
	console.log(queryString);
	queryString = decodeURIComponent(queryString);
	console.log(queryString);
	queryString = atob(queryString);
	queryString = Base64Decode(queryString);
	volumeInputValue = 1;
	rateInputValue = queryString.substr(1,3) / 10;
	pitchInputValue = queryString.substr(4,2) / 10;
	speechMsgInputValue = queryString.substr(6);

	return queryString.substr(0,1); //the currentScenario number;

	function Base64Decode(str, encoding = 'utf-8') 
	{
	    var bytes = base64js.toByteArray(str);
	    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
	}
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

//stray hearts functionality

function strayHearts()
{
	
	while(heartContainer.childElementCount < HEART_CONST)
	{
		let div = document.createElement("div");
		console.log('add heart');
		div.classList.add("stray-heart");
		

		let randNum = (Math.floor(Math.random() * 9) + 3) * 20;
		console.log('rand number is: ' + randNum);
		div.style.width = `${randNum}px`;
		div.style.height = `${randNum}px`;

		let position = Math.floor(window.innerWidth * Math.random());
		console.log(position);
		div.style.left = `${position}px`;

		let delay = Math.random() * 5;
		console.log('delay is '+ delay);
		div.style.animationDelay = `${delay}s`;

		heartContainer.appendChild(div);
	}
}

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

function cleanUpVar()
	{
		voiceBox.style.display = 'none';
		sceneWindow.style.display = 'none';
		endWindow.style.display = 'none';
		end.style.display = 'none';
		skipButton.style.display = 'initial';
		dimmer.style.filter = 'unset';

		//continue to move the background hearts
		for(let k = 0; k < heartContainer.children.length; k++)
		{
			heartContainer.children[k].style.animationPlayState = "running";
		}

		speechSynthesis.cancel(); //cancel current voice audio
		proposalSims[proposalSims.length - 1].cleanUpSounds();

		//get rid of all bg items in the scene window
		let bgDivs = document.getElementsByClassName('scene-bg');

		while(bgDivs[0])
		    bgDivs[0].parentNode.removeChild(bgDivs[0]);

		for (const nextSound of proposalSims[proposalSims.length - 1].nextSounds)
		{
			clearTimeout(nextSound);
		}

		console.log('current utterance is ' + proposalSims[proposalSims.length - 1]);
		speechMsgInput.value = '';
		utterance.onboundary = null;
		utterance.onend = null;
		//scene_i = 0; //current scene #
		//currentScenario = null; //current scenario #
		//skip = false; //flag, playScenario checks this at first, if true, exit out of recursion.
		//close = false; //flag, exits whole process
		//cleanUp = false; //flag, can't start new scene while this is true;
	}
///////////////////////////////////////
// IMPLEMENTATION
///////////////////////////////////////



/*if('speechSynthesis' in window)
{
	supportMsg.innerHTML = "Your browser <strong>supports</strong> speech synthesis.";

}
else
{
	supportMsg.innerHTML = "Sorry, your browser <strong>does not support</strong> speech synthesis. Get the best experience with Google Chrome";
}*/