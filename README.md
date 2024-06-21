# Metadrob Assignment Documentation

## Description

-   This assignment involves creating a 3D interactive web application using **[BabylonJS](https://www.babylonjs.com/)** and **[ReactJS](https://react.dev/)**
-   It includes rendering 3D objects, controlling their visibility and rotation speed through UI elements like buttons, sliders, and input fields.
-   The project is deployed on **[Vercel](https://vercel.com/)** for live demonstration.
-   Check the Live **[Demo](https://metadrob-assignment.vercel.app/)**. :red_circle:

## Setup

#### Download [Node.js](https://nodejs.org/en/download/).

#### Run following commands:

-   To install dependencies (only the first time)
    ```bash
    npm install
    ```
-   To run the local server at localhost:8080
    ```bash
    npm run dev
    ```
-   To build for production in the directory
    ```bash
    npm run build
    ```

## Instructions

-   Clicking a button should toggle the visibility of the associated object on the canvas.
-   Slider will adjust the rotation speed of the corresponding object in real-time.
-   Input fields next to each slider to allow users to directly enter specific rotation speeds.

## Tools Used

-   Programming Languages :
    -   **[Javascript](https://www.javascript.com/)**
    -   **[Typescript](https://www.typescriptlang.org/)**
    -   **[HTML](https://html.com/)**
    -   **[CSS](https://www.w3.org/TR/CSS/#css)**
-   Frameworks/Libraries :
    -   **[ReactJS](https://react.dev/)** : For building the user interface.
    -   **[BabylonJS](https://www.babylonjs.com/)** : For rendering 3D graphics and animations.
-   IDE/Text Editor :
    -   **[Visual Studio Code](https://code.visualstudio.com/)**
-   Other Tools:
    -   [Node.js](https://nodejs.org/en/download/) : For package management and running the development server.
    -   **[Vercel](https://vercel.com/)** : For deploying the project.

## Project Structure

```
MetadrobAssignment/
├── public/
│   ├── assets/
│   |    ├── RobotExpressive.glb
│   |    ├── Fox.glb
│   |    ├── DamagedHelmet.glb
│   └── ...
├── src/
│   ├── SceneComponent.tsx
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── package.json
├── tsconfig.json
├── README.md
└── ...
```

## Approach

-   **Canvas Integration**
    -   Created a React component containing a canvas element to serve as the rendering surface.
-   **3D Object Rendering**
    -   Utilized BabylonJS for rendering 3D objects. Implemented 3D objects and animations within the SceneComponent.
    -   The function `loadModel` loads all the necessary objects required for the scene.
-   **Object Visibility Control**
    -   Implemented buttons in the React page to toggle the visibility of the objects on the canvas.
    -   The function `handleVisibility` toggles the visibility of respective meshes.
-   **Rotational Animation**
    -   Implemented rotation animation using BabylonJS’s animation capabilities. Each object rotates around its axis.
    -   The function `autoRotation` ensures that the current active mesh is rotating.
-   **Interactive Speed Control**
    -   Added sliders to control the rotation speed of each object in real-time. Each slider is mapped to a specific object.
    -   The function `changeRotationSpeed` manipulates the speed of rotating objects.
-   **Editable Speed Values**
    -   Provided input fields next to each slider for users to enter specific rotation speeds. Implemented input validation to prevent invalid values.

### Created by [Rushikesh Vinod Ghatage](https://www.linkedin.com/in/rushikesh-ghatage-477489222/) :smiley:
