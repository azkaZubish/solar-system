import * as THREE from 'three';

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

  
   sun.rotation.y += 0.0001;

    renderer.render(scene, camera);
    
  }
  requestAnimationFrame(render);
}
main();