//KITCHEN SCENE

let scenario_0 = new Scenario
(
	"Kitchen Proposal",
	[
		new Scene(3400, [new SceneSound('sounds/kitchen-love', 0)], 
				[new SceneAnimation('images/1-1.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(1800, null,
				[new SceneAnimation('images/1-2.jpg', 'shiftx', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2500, null,
				[new SceneAnimation('images/1-3.jpg', 'shiftx', 'ease-out', '50s', '0s', 'forwards')]
			),
		new Scene(4100, null,
				[new SceneAnimation('images/1-4.jpg', null, 'linear', '4.1s', '0s', 'forwards')]
			),
		new Scene(2600, null,
				[new SceneAnimation('images/1-3.jpg', 'zoomin', 'linear', '20s', '0s', 'forwards')]
			),
		new Scene(1700, null,
				[new SceneAnimation('images/1-5.jpg', 'scene15', 'linear', '8s', '0s', 'forwards')]
			),
		new Scene(1600, null,
				[new SceneAnimation('images/1-6.jpg', 'scene16', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('images/1-7.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/1-8.jpg', 'endzoom', 'ease-out', '1s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/1-9.jpg', 'endzoom', 'ease-out', '3s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 1000
); //contains individual scene objects

let scenario_1 = new Scenario
(
	"Office Proposal",
	[
		new Scene(3000, [new SceneSound('sounds/office-love', 0)], 
				[new SceneAnimation('images/2-1.jpg', 'shiftup', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('images/2-2.jpg', 'shiftdown', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(3100, null,
				[new SceneAnimation('images/2-3.jpg')]
			),
		new Scene(1100, null,
				[new SceneAnimation('images/2-4.jpg', 'zoomout', 'ease-out', '0.5s', '0s', 'forwards')]
			),
		new Scene(2600, null,
				[new SceneAnimation('images/2-5.jpg', 'scene25', 'ease-out', '2.6s', '0s', 'forwards')]
			),
		new Scene(1900, null,
				[new SceneAnimation('images/2-6.jpg')]
			),
		new Scene(2500, null,
				[new SceneAnimation('images/2-7.jpg', 'zoomin', 'linear', '15s', '0s', 'forwards')]
			),
		new Scene(3500, null,
				[new SceneAnimation('images/2-8.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/2-9.jpg', 'woosh', 'ease-out', '0.3s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/2-10.jpg', 'endzoom', 'linear', '3s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 1500
); //contains individual scene objects


let scenario_2 = new Scenario
(
	"Boss Proposal",
	[
		new Scene(1510, [new SceneSound('sounds/boss-love', 0)], 
				[new SceneAnimation('images/3-1.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2640, null,
				[new SceneAnimation('images/3-2.jpg')]
			),
		new Scene(2100, null,
				[new SceneAnimation('images/3-3.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2880, null,
				[new SceneAnimation('images/3-4.jpg')]
			),
		new Scene(2020, null,
				[new SceneAnimation('images/3-5.jpg', 'zoomin', 'linear', '20s', '0s', 'forwards')]
			),
		new Scene(2730, null,
				[new SceneAnimation('images/3-6.jpg', 'scene36', 'ease-out', '3s', '0s', 'forwards')]
			),
		new Scene(2770, null,
				[new SceneAnimation('images/3-7.jpg', 'scene37', 'ease-out', '3s', '0s', 'forwards')]
			),
		new Scene(2510, null,
				[new SceneAnimation('images/3-8.jpg', 'zoomin', 'linear', '20s', '0s', 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/3-9.jpg', 'woosh', 'ease-out', '0.3s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/3-10.jpg', 'scene3end', 'ease-out', '9s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 1500
); //contains individual scene objects

//ROCK SCENARIO

let scenario_3 = new Scenario
(
	"Rock Proposal",
	[
		new Scene(1020, [new SceneSound('sounds/rock-love', 0)], 
				[new SceneAnimation('images/4-1.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2980, null,
				[new SceneAnimation('images/4-2.jpg', 'shiftx', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(1200, null,
				[new SceneAnimation('images/4-3.jpg', 'shiftx', 'ease-out', '50s', '0s', 'forwards')]
			),
		new Scene(2800, null,
				[new SceneAnimation('images/4-4.jpg', null, 'linear', '4.1s', '0s', 'forwards')]
			),
		new Scene(1100, null,
				[new SceneAnimation('images/4-5.jpg', 'zoomin', 'linear', '20s', '0s', 'forwards')]
			),
		new Scene(2900, null,
				[new SceneAnimation('images/4-6.jpg', 'scene15', 'linear', '8s', '0s', 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('images/4-7.jpg', 'scene16', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(2000, null,
				[new SceneAnimation('images/4-8.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/4-9.jpg', 'scene18', 'ease-out', '1s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/4-10.jpg', 'scene18', 'ease-out', '3s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 1500
); //contains individual scene objects

let scenario_4 = new Scenario
(
	"Samurai Proposal",
	[
		new Scene(1510, [new SceneSound('sounds/samurai-love', 0)], 
				[new SceneAnimation('images/5-1.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2640, null,
				[new SceneAnimation('images/5-2.jpg', 'shiftx', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2100, null,
				[new SceneAnimation('images/5-3.jpg', 'shiftx', 'ease-out', '50s', '0s', 'forwards')]
			),
		new Scene(2880, null,
				[new SceneAnimation('images/5-4.jpg', null, 'linear', '4.1s', '0s', 'forwards')]
			),
		new Scene(2020, null,
				[new SceneAnimation('images/5-5.jpg', 'zoomin', 'linear', '20s', '0s', 'forwards')]
			),
		new Scene(2730, null,
				[new SceneAnimation('images/5-6.jpg', 'scene15', 'linear', '8s', '0s', 'forwards')]
			),
		new Scene(2770, null,
				[new SceneAnimation('images/5-7.jpg', 'scene16', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(2510, null,
				[new SceneAnimation('images/5-8.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(2510, null,
				[new SceneAnimation('images/5-9.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/5-10.jpg', 'scene18', 'ease-out', '1s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/5-11.jpg', 'scene18', 'ease-out', '3s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 1500
); //contains individual scene objects

//LIST OF SCENARIOS

let scenarioList = 
[
	scenario_0, scenario_1, scenario_2, scenario_3, scenario_4
];