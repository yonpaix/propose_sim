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
				[new SceneAnimation('images/1-8.jpg', 'scene18', 'ease-out', '1s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/1-9.jpg', 'scene18', 'ease-out', '3s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 1000
); //contains individual scene objects

let scenario_1 = new Scenario
(
	"Office Proposal",
	[
		new Scene(3000, [new SceneSound('sounds/office-love', 0)], 
				[new SceneAnimation('images/2-1.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('images/2-2.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(2800, null,
				[new SceneAnimation('images/2-3.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(1100, null,
				[new SceneAnimation('images/2-4.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(2400, null,
				[new SceneAnimation('images/2-5.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(1900, null,
				[new SceneAnimation('images/2-6.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(2500, null,
				[new SceneAnimation('images/2-7.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(2800, null,
				[new SceneAnimation('images/2-8.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/2-9.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/2-10.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			)
	],
	8, 2000
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

let scenario_2 = new Scenario
(
	"Boss Proposal",
	[
		new Scene(1510, [new SceneSound('sounds/boss-love', 0)], 
				[new SceneAnimation('images/3-1.jpg', 'zoomin', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2640, null,
				[new SceneAnimation('images/3-2.jpg', 'shiftx', 'linear', '50s', '0s', 'forwards')]
			),
		new Scene(2100, null,
				[new SceneAnimation('images/3-3.jpg', 'shiftx', 'ease-out', '50s', '0s', 'forwards')]
			),
		new Scene(2880, null,
				[new SceneAnimation('images/3-4.jpg', null, 'linear', '4.1s', '0s', 'forwards')]
			),
		new Scene(2020, null,
				[new SceneAnimation('images/3-5.jpg', 'zoomin', 'linear', '20s', '0s', 'forwards')]
			),
		new Scene(2730, null,
				[new SceneAnimation('images/3-6.jpg', 'scene15', 'linear', '8s', '0s', 'forwards')]
			),
		new Scene(2770, null,
				[new SceneAnimation('images/3-7.jpg', 'scene16', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(2510, null,
				[new SceneAnimation('images/3-8.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('images/3-9.jpg', 'scene18', 'ease-out', '1s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/3-10.jpg', 'scene18', 'ease-out', '3s', '0s', 'forwards'), new SceneAnimation('images/proposal-logo-glow.png', 'logo', 'linear', '12s', '0s', 'forwards', '75%', '75%', '12.5%', '12.5%')]
			)
	],
	8, 2000
); //contains individual scene objects

//LIST OF SCENARIOS

let scenarioList = 
[
	scenario_0, scenario_1, scenario_2
];