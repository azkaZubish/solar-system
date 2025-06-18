import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function main(){

     //Get the usable elements from HTML 
     const canvas = document.querySelector('#solarSystem');

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
  camera.lookAt(0,0,0);
      //creating textureLoader to add textures 
        const textureLoader = new THREE.TextureLoader();
      
        //Creating and adding Sun to the scene
        const sunRadius = 15;
        const sunGeometry = new THREE.SphereGeometry(30, 32, 32);
        const sunMaterial = new THREE.MeshStandardMaterial({
          map : textureLoader.load('/images/sunEffect.png') ,
          emissive : 0xffd700,
          emissiveMap : textureLoader.load('/images/sunmap.jpg'),
          emissiveIntensity : 1
       }); 
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

         //Function to Create Planets
          function makePlanet(name, radius, planetColor, index){
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshStandardMaterial({
              map : textureLoader.load(`/images/${name}.jpg`) });
            const planetMesh = new THREE.Mesh(geometry, material);
            const distanceFromSun = sunRadius + 10 + index * 20;
          
            planetMesh.userData = { name, distanceFromSun };
            scene.add(planetMesh);
            return planetMesh;
          }
          
          //Creating Planets Array using makePlanet function
          const planets = [
             makePlanet('mercury',4,0x909090, 1),
             makePlanet('venus',5,0xffcc99, 2),
             makePlanet('earth',5.5,0x2a52be, 3),
             makePlanet('mars',5.2,0xff4500, 4),
             makePlanet('jupiter',11,0xd2b48c, 5),
             makePlanet('saturn',7,0xf5deb3, 6),
             makePlanet('uranus',6.5,0x40e0d0, 7),
             makePlanet('neptune',6.2,0x00008b, 8)
          ];

         //Adding Point Light and Ambient Light 
          const pointLight = new THREE.PointLight(0xffffff, 2, 500);
          pointLight.position.set(-4,2,4);
          scene.add(pointLight);
          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          scene.add(ambientLight);

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
      
  
      time *= 0.001; // Convert to seconds
         planets.forEach((planet, ndx) => {
           const name = planet.userData.name.toLowerCase();
      
           //accessing dynamic speeds
           const speed = 1 * (0.5 / (ndx + 1)); 

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