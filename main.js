import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function main() {

  //Get the usable elements from HTML 
  const canvas = document.querySelector('#solarSystem');

  const mercurySpeed = document.querySelector('#mercurySlider');
  const venusSpeed = document.querySelector('#venusSlider');
  const earthSpeed = document.querySelector('#earthSlider');
  const marsSpeed = document.querySelector('#marsSlider');
  const jupiterSpeed = document.querySelector('#jupiterSlider');
  const saturnSpeed = document.querySelector('#saturnSlider');
  const uranusSpeed = document.querySelector('#uranusSlider');
  const neptuneSpeed = document.querySelector('#neptuneSlider');

  //Creating renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  //Creating scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );


  //Defining controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.zoomSpeed = 0.5;
  controls.maxDistance = 300;
  controls.minDistance = 30;

  camera.position.set(0, 50, 100);
  camera.lookAt(0, 0, 0);
  //creating textureLoader to add textures 
  const textureLoader = new THREE.TextureLoader();

  //Creating and adding Sun to the scene
  const sunRadius = 15;
  const sunGeometry = new THREE.SphereGeometry(30, 32, 32);
  const sunMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('/images/sunEffect.png'),
    emissive: 0xffd700,
    emissiveMap: textureLoader.load('/images/sunmap.jpg'),
    emissiveIntensity: 1
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  //Function to Create Planets
  function makePlanet(name, radius, planetColor, index) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(`/images/${name}.jpg`)
    });
    const planetMesh = new THREE.Mesh(geometry, material);
    const distanceFromSun = sunRadius + 10 + index * 20;

    planetMesh.userData = { name, distanceFromSun };
    scene.add(planetMesh);
    return planetMesh;
  }

  //Creating Planets Array using makePlanet function
  const planets = [
    makePlanet('mercury', 4, 0x909090, 1),
    makePlanet('venus', 5, 0xffcc99, 2),
    makePlanet('earth', 5.5, 0x2a52be, 3),
    makePlanet('mars', 5.2, 0xff4500, 4),
    makePlanet('jupiter', 11, 0xd2b48c, 5),
    makePlanet('saturn', 7, 0xf5deb3, 6),
    makePlanet('uranus', 6.5, 0x40e0d0, 7),
    makePlanet('neptune', 6.2, 0x00008b, 8)
  ];

  
    //Adding glow to  the sun using sprite
    const glowTexture = textureLoader.load('images/sunEffect.png'); 
    const spriteMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    blending: THREE.AdditiveBlending
    });
  
    const glowSprite = new THREE.Sprite(spriteMaterial);
    glowSprite.scale.set(90, 90, 1);
    glowSprite.position.set(0,0,0);
    scene.add(glowSprite);

  //Adding Point Light and Ambient Light 
  const pointLight = new THREE.PointLight(0xffffff, 2, 500);
  pointLight.position.set(-4, 2, 4);
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

   //Speed object to store speed of individual planets
  const speeds = {
     mercury : 1,
     venus : 1,
     earth : 1,
     mars : 1,
     jupiter : 1,
     saturn : 1,
     uranus : 1,
     neptune : 1
  };

  
  //Dynamic speed storage through addEventListener
  mercurySpeed.addEventListener('input', (e) => {
    speeds.mercury = parseFloat(e.target.value);
  });
  venusSpeed.addEventListener('input', (e) => {
    speeds.venus = parseFloat(e.target.value);
  }); 
  earthSpeed.addEventListener('input', (e) => {
    speeds.earth = parseFloat(e.target.value);
  });  
  marsSpeed.addEventListener('input', (e) => {
    speeds.mars = parseFloat(e.target.value);
  });  
  jupiterSpeed.addEventListener('input', (e) => {
    speeds.jupiter = parseFloat(e.target.value);
  });  
  saturnSpeed.addEventListener('input', (e) => {
    speeds.saturn = parseFloat(e.target.value);
  });  
  uranusSpeed.addEventListener('input', (e) => {
    speeds.uranus = parseFloat(e.target.value);
  });  
  neptuneSpeed.addEventListener('input', (e) => {
    speeds.neptune = parseFloat(e.target.value);
  }); 

  
    //Generating and Adding Stars to the scene
    function generateStars(count = 1500) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
  
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(3000);
      const y = THREE.MathUtils.randFloatSpread(3000);
      const z = THREE.MathUtils.randFloatSpread(3000);
      positions.push(x, y, z);
    }
  
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1, sizeAttenuation: true });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
    }
  
    generateStars();
  

 //Implementing pause/resume animation 
  let isPaused = false;
  const toggleBtn = document.getElementById('toggleAnimation');
  toggleBtn.addEventListener('click', () => {
     isPaused = !isPaused;
     toggleBtn.textContent = isPaused ? 'Resume' : 'Pause';
  });

  //Adding ring to Saturn
    const saturn = planets[5];
    const ringGeometry = new THREE.RingGeometry(8, 12, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
    map : textureLoader.load('/images/saturnringcolor.jpg'),
    side: THREE.DoubleSide,
    transparent: true
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  
    ring.rotation.x = Math.PI / 2;
    saturn.add(ring);
    ring.position.copy(saturn.position);

  //implementing 'resize' event for responsiveness 
  window.addEventListener('resize', () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  //function to implement animation using requestAnimationFrame()
  function render(time) {
    requestAnimationFrame(render);

    if(isPaused) return;

    time *= 0.001; // Convert to seconds
    planets.forEach((planet, ndx) => {
      const name = planet.userData.name.toLowerCase();

      //accessing dynamic speeds
      const speed = speeds[name] * (0.5 / (ndx + 1));

      //elliptical revolution
      const distance = planet.userData.distanceFromSun;
      const angle = time * speed;
      planet.position.x = distance * Math.cos(angle);
      planet.position.z = distance * 0.99 * Math.sin(angle);

      //planet rotation
      planet.rotation.y = time;
      sun.rotation.y += 0.0001;
    });

    //zoom in/out 
    controls.update();
    


    renderer.render(scene, camera);

  }
  requestAnimationFrame(render);
}
main();