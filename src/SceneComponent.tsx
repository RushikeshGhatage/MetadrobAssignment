import { useEffect, useState } from 'react';

import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
// import { Inspector } from '@babylonjs/inspector';

var canvas: HTMLCanvasElement;
var engine: BABYLON.Engine;
var scene: BABYLON.Scene;
var camera: BABYLON.ArcRotateCamera;
var robotExpressiveModel: BABYLON.AbstractMesh;
var foxModel: BABYLON.AbstractMesh;
var damagedHelmetModel: BABYLON.AbstractMesh;
var meshArray: BABYLON.AbstractMesh[] = [];
var robotRotationSpeed: number = 1;
var foxRotationSpeed: number = 1;
var helmetRotationSpeed: number = 1;
var currentlyVisibleModel: number | null;

/****************************************
 * Functional React component representing a 3D scene using Babylon.js.
 ****************************************/
export default function SceneComponent() {
	const [, setRobotSpeed] = useState(robotRotationSpeed);
	const [, setFoxSpeed] = useState(foxRotationSpeed);
	const [, setHelmetSpeed] = useState(helmetRotationSpeed);

	const initialize = () => {
		console.clear();

		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		console.log('Canvas created successfully');

		engine = new BABYLON.Engine(
			canvas,
			true,
			{
				doNotHandleContextLost: true,
			},
			true,
		);
		console.log('Engine initialized succesfully');

		document.addEventListener('keydown', (event) => {
			keyDown(event);
		});

		document.addEventListener('keyup', (event) => {
			keyUp(event);
		});

		window.addEventListener('resize', () => {
			engine.resize(true);
		});

		createScene();
		renderLoop();
	};

	useEffect(() => {
		initialize();
	}, []);

	const changeRotationSpeed = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		if (Number(event.target.value) > 10) {
			event.target.value = '10';
			alert('Speed cannot exceed 10');
		} else if (Number(event.target.value) < 0) {
			event.target.value = '0';
			alert('Speed cannot be negative');
		}

		if (index === 0) {
			robotRotationSpeed = Number(event.target.value);
			setRobotSpeed(robotRotationSpeed);
		} else if (index === 1) {
			foxRotationSpeed = Number(event.target.value);
			setFoxSpeed(foxRotationSpeed);
		}
		if (index === 2) {
			helmetRotationSpeed = Number(event.target.value);
			setHelmetSpeed(helmetRotationSpeed);
		}
	};

	return (
		<div className='mainDiv'>
			<canvas id='canvas' />
			{/* Menu */}
			<div className='leftDiv'>
				{/* Header */}
				<h1 id='mainlabel'>Metadrob Assignment</h1>

				{/* Button Containers */}
				<div className='btn_container'>
					{/* Robot Button */}
					<button
						className='btn'
						style={{ cursor: 'pointer' }}
						onClick={() => {
							handleVisibility(0);
						}}
					>
						Robot
					</button>

					<div className='sliderContainer'>
						<input
							type='range'
							min='0'
							max='10'
							step={1}
							value={robotRotationSpeed}
							className='slider'
							onChange={(e) => {
								changeRotationSpeed(e, 0);
							}}
						/>

						<input
							type='number'
							min='0'
							max='10'
							value={robotRotationSpeed}
							className='inputNumber'
							onChange={(e) => {
								changeRotationSpeed(e, 0);
							}}
						/>
					</div>
				</div>

				{/* Button Containers */}
				<div className='btn_container'>
					{/* Fox Button */}
					<button
						className='btn'
						style={{ cursor: 'pointer' }}
						onClick={() => {
							handleVisibility(1);
						}}
					>
						Fox
					</button>

					<div className='sliderContainer'>
						<input
							type='range'
							min='0'
							max='10'
							step={1}
							value={foxRotationSpeed}
							className='slider'
							onChange={(e) => {
								changeRotationSpeed(e, 1);
							}}
						/>

						<input
							type='number'
							min='0'
							max='10'
							value={foxRotationSpeed}
							className='inputNumber'
							onChange={(e) => {
								changeRotationSpeed(e, 1);
							}}
						/>
					</div>
				</div>

				{/* Button Containers */}
				<div className='btn_container'>
					{/* Helmet Button */}
					<button
						className='btn'
						style={{ cursor: 'pointer' }}
						onClick={() => {
							handleVisibility(2);
						}}
					>
						Helmet
					</button>

					<div className='sliderContainer'>
						<input
							type='range'
							min='0'
							max='10'
							step={1}
							value={helmetRotationSpeed}
							className='slider'
							onChange={(e) => {
								changeRotationSpeed(e, 2);
							}}
						/>

						<input
							type='number'
							min='0'
							max='10'
							value={helmetRotationSpeed}
							className='inputNumber'
							onChange={(e) => {
								changeRotationSpeed(e, 2);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

const handleVisibility = (index: number) => {
	// Check the current visibility state of the clicked model
	const isCurrentlyVisible = meshArray[index].isEnabled();

	// Hide all models
	meshArray.forEach((mesh) => {
		mesh.setEnabled(false);
	});

	// Toggle visibility of the clicked model
	if (!isCurrentlyVisible) {
		meshArray[index].setEnabled(true);
		console.log(index);
		currentlyVisibleModel = index;
	}
};

/****************************************
 * Handles the keydown event for a specific functionality.
 * @param {KeyboardEvent} event - The KeyboardEvent object representing the keydown event.
 * @returns {void}
 ****************************************/
const keyDown = (event: KeyboardEvent): void => {
	switch (event.key) {
		case 'E':
		case 'e':
			break;

		case 'G':
		case 'g':
			// Inspector.Show(scene, { enablePopup: true });
			break;
	}
};

/****************************************
 * Handles the keyup event for a specific functionality.
 * @param {KeyboardEvent} event - The KeyboardEvent object representing the keyup event.
 * @returns {void}
 ****************************************/
const keyUp = (event: KeyboardEvent): void => {
	switch (event.key) {
		case 'E':
		case 'e':
			break;
	}
};

/****************************************
 * Creates and initializes a 3D scene using the Babylon.js framework.
 * @returns {void}
 ****************************************/
const createScene = (): void => {
	scene = new BABYLON.Scene(engine);

	loadModel();

	setupCamera();

	setupLight();
};

/****************************************
 * Sets up and configures the camera for the Babylon.js 3D scene.
 * @returns {void}
 ****************************************/
const setupCamera = () => {
	camera = new BABYLON.ArcRotateCamera(
		'Camera',
		Math.PI / 2,
		Math.PI / 2,
		10,
		BABYLON.Vector3.Zero(),
		scene,
	);

	console.log('Camera created successfully!');

	camera.attachControl(canvas, true);
};

/****************************************
 * Sets up and configures lighting for the Babylon.js 3D scene.
 * @returns {void}
 ****************************************/
const setupLight = () => {
	var hemiLight = new BABYLON.HemisphericLight(
		'hemiLight',
		new BABYLON.Vector3(-1, 1, 0),
		scene,
	);

	hemiLight.intensity = 1.0;
};

/****************************************
 * Loads a 3D model into the Babylon.js 3D scene.
 * @returns {void}
 ****************************************/
const loadModel = async () => {
	await loadRobotExpressive();

	await loadFox();

	await loadDamagedHelmet();
};

const loadRobotExpressive = (): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		BABYLON.SceneLoader.ImportMesh(
			'',
			'/assets/',
			'RobotExpressive.glb',
			scene,
			(meshes, particleSystems, skeleton, animationGroups) => {
				console.log('Expressive Robot model loaded successfully!');
				robotExpressiveModel = meshes[0];
				robotExpressiveModel.position = new BABYLON.Vector3(
					0.0,
					-2.0,
					0.0,
				);

				meshArray.push(robotExpressiveModel);
				console.log(meshArray);

				animationGroups.forEach((value, index) => {
					animationGroups[index].stop();
				});

				animationGroups[2].play(true);

				// Set the mesh to be invisible
				robotExpressiveModel.setEnabled(false);
				resolve();
			},
			null,
			(message, exception) => {
				console.error(
					'Failed to load Expressive Robot model:',
					message,
					exception,
				);
				reject(message);
			},
		);
	});
};

const loadFox = (): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		BABYLON.SceneLoader.ImportMesh(
			'',
			'/assets/',
			'Fox.glb',
			scene,
			(meshes, particleSystems, skeleton, animationGroups) => {
				foxModel = meshes[0];
				foxModel.position = new BABYLON.Vector3(0.0, -2.0, 0.0);
				foxModel.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
				foxModel.rotation = new BABYLON.Vector3(0.0, Math.PI / 2, 0.0);

				meshArray.push(foxModel);
				console.log(meshArray);

				animationGroups.forEach((value, index) => {
					animationGroups[index].stop();
				});

				animationGroups[2].play(true);

				foxModel.setEnabled(false);

				console.log('Fox model loaded successfully!');
				resolve();
			},
			null,
			(message, exception) => {
				console.error('Failed to load Fox model:', message, exception);
				reject(message);
			},
		);
	});
};

const loadDamagedHelmet = (): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		BABYLON.SceneLoader.ImportMesh(
			'',
			'/assets/',
			'DamagedHelmet.glb',
			scene,
			(meshes) => {
				damagedHelmetModel = meshes[0];
				damagedHelmetModel.scaling = new BABYLON.Vector3(
					2.0,
					2.0,
					-2.0,
				);

				meshArray.push(damagedHelmetModel);
				console.log(meshArray);

				damagedHelmetModel.setEnabled(false);
				console.log('Damaged Helmet model loaded successfully!');
				resolve();
			},
			null,
			(message, exception) => {
				console.error(
					'Failed to load Damaged Helmet model:',
					message,
					exception,
				);
				reject(message);
			},
		);
	});
};

const autoRotation = () => {
	if (currentlyVisibleModel === 0) {
		if (robotExpressiveModel.rotationQuaternion) {
			let rotationQuaternion = BABYLON.Quaternion.RotationAxis(
				BABYLON.Axis.Y,
				robotRotationSpeed / 50,
			);
			robotExpressiveModel.rotationQuaternion =
				rotationQuaternion.multiply(
					robotExpressiveModel.rotationQuaternion,
				);
		} else {
			robotExpressiveModel.rotation.y += robotRotationSpeed / 50;
		}
	} else if (currentlyVisibleModel === 1) {
		if (foxModel.rotationQuaternion) {
			let rotationQuaternion = BABYLON.Quaternion.RotationAxis(
				BABYLON.Axis.Y,
				foxRotationSpeed / 50,
			);
			foxModel.rotationQuaternion = rotationQuaternion.multiply(
				foxModel.rotationQuaternion,
			);
		} else {
			foxModel.rotation.y += foxRotationSpeed / 50;
		}
	} else if (currentlyVisibleModel === 2) {
		if (damagedHelmetModel.rotationQuaternion) {
			let rotationQuaternion = BABYLON.Quaternion.RotationAxis(
				BABYLON.Axis.Y,
				helmetRotationSpeed / 50,
			);
			damagedHelmetModel.rotationQuaternion = rotationQuaternion.multiply(
				damagedHelmetModel.rotationQuaternion,
			);
		} else {
			damagedHelmetModel.rotation.y += helmetRotationSpeed / 50;
		}
	}
};

/****************************************
 * Initiates the rendering loop for continuous updates and rendering of the Babylon.js scene.
 * @returns {void}
 ****************************************/
const renderLoop = () => {
	engine.runRenderLoop(() => {
		autoRotation();
		scene.render();
	});
};
