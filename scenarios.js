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
				[new SceneAnimation('images/1-8.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			),
		new Scene(5000, null,
				[new SceneAnimation('images/1-9.jpg', 'zoomin', 'linear', '10s', '0s', 'forwards')]
			)
	],
	8, 1000
); //contains individual scene objects

let scenario_1 = new Scenario
(
	"Kitchen Proposal",
	[
		new Scene(3400, [new SceneSound('sounds/kitchen-love', 0)], 
				[new SceneAnimation('1-1.jpg', 'zoomin', '1s', 0, 1, 'forwards'), new SceneAnimation('1-2.jpg', 'shiftx', '1s', 0, 1, 'forwards'),  new SceneAnimation('1-2.jpg', 'shiftx', '3s', 0, 1, 'forwards')]
			),
		new Scene(1800, null,
				[new SceneAnimation('1-2.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(2500, null,
				[new SceneAnimation('1-2b.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(4100, null,
				[new SceneAnimation('1-2c.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(2600, null,
				[new SceneAnimation('1-2b.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(1700, null,
				[new SceneAnimation('1-3.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(1600, null,
				[new SceneAnimation('1-3b.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(3000, null,
				[new SceneAnimation('1-4.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
			),
		new Scene(5000, [new SceneSound('plove', 250)],
				[new SceneAnimation('1-4b.jpg', 'zoomin', '1s', 0, 1, 'forwards')]
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