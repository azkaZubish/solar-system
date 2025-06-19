# 3D Solar System Simulation using Three.js + Vite

An interactive 3D simulation of the solar system built with **Three.js**. This project visually represents the Sun and 8 planets, complete with orbital motion, real-time speed controls, glowing Sun effect, Saturn’s rings, star background, and camera controls.

## Features

-  Glowing, rotating Sun with texture and emissive effect
-  All 8 planets orbit in elliptical paths
-  Real-time speed control for each planet via sliders
-  Interactive camera (zoom in/out using OrbitControls)
-  Saturn's ring added with ring geometry and texture
-  3D starfield background using random point generation
-  Pause and Resume animation toggle
-  Responsive rendering on window resize
-  Lightweight and fast with Vite

##  Setup Instructions

### 1. Prerequisite

 - Install [Node.js](https://nodejs.org/) (v16 or higher recommended).

 - Verify installation:
  ```bash
   node -v
   npm -v
  ```
 - Install npm (three and vite)
  ```bash
   npm install
  ```

### 2. Getting Started

-  Open the folder in Vscode(or any editing app)
-  Run the project using bash
  ```bash
    npx vite
  ```
- A URL like http://localhost:5173 will appear in terminal, click on that URL to see web application.

##  How It Works

- Three.js is used to render 3D elements.
- Each planet is created using SphereGeometry and given a texture.
- Orbit motion is simulated using trigonometric calculations in the render loop.
- Speed sliders use addEventListener to update planet revolution in real time.
- A sprite with additive blending is used to make the sun glow.
- Saturn's ring is added using RingGeometry and positioned to match Saturn's orbit.

## Technologies Used

- Three.js (WebGL 3D Rendering)
- JavaScript
- HTML / CSS
- OrbitControls

##  Author

Azka Zubish
Master’s in Computer Applications