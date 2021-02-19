import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

//Escena
const scene = new THREE.Scene();
const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camara
const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 400 );
const listener = new THREE.AudioListener();
camera.add( listener );
const controls = new FirstPersonControls(camera);
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = false;
controls.lookVertical = false;
const movements = [
    new THREE.Vector3(0, 0, 1),   // Forward
    new THREE.Vector3(1, 0, 1),   // Forward-left
    new THREE.Vector3(1, 0, 0),   // Left
    new THREE.Vector3(1, 0, -1),  // Backward-left
    new THREE.Vector3(0, 0, -1),  // Backward
    new THREE.Vector3(-1, 0, -1), // Backward-right
    new THREE.Vector3(-1, 0, 0),  // Right
    new THREE.Vector3(-1, 0, 1)   // Forward-right
];

//Stats
const stats = new Stats( );
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

//Grid
const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = -25;
scene.add(helper);

//Luces
const light = new THREE.DirectionalLight(0xffffff);
light.position.set( 0, 0.5, 100 );
scene.add(light);
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

//Texturas y materiales
const mapUrl = "../textures/brick.jpg"; 
const bumpmapUrl = "../textures/brick-map.jpg"; 
const mapUrl2 = "../textures/brick2.png"; 
const bumpmapUrl2 = "../textures/brick-map2.png"; 
const mapUrl3 = "../textures/brick2on.png"; 
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const regularFaceMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( mapUrl),
        bumpMap: textureLoader.load( bumpmapUrl),
    } );
const specialFaceMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( mapUrl2),
        bumpMap: textureLoader.load( bumpmapUrl2),
    } );
const specialFaceMaterialon = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( mapUrl3),
        bumpMap: textureLoader.load(bumpmapUrl2),
    });
const materials = [
    specialFaceMaterialon,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
]; 
const materials2 = [
    specialFaceMaterialon,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
]; 

//Cajas
const geometry = new THREE.BoxGeometry( 50, 50, 50 );
const box = new THREE.Mesh( geometry, materials );    
box.position.set(-200,0,0);
box.name="Caja1";
const box2 = new THREE.Mesh( geometry, materials2 );    
box2.position.set(200,0,0);
box2.rotation.set(Math.PI,Math.PI,0);
box2.name="Caja2";

//Audios
const audioLoader = new THREE.AudioLoader();
const sound = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/audio1.ogg", ( buffer ) => {
    sound.setBuffer( buffer );
    sound.setRefDistance( 20 );
    sound.setLoop( true );
    sound.setRolloffFactor( 1 );
    sound.play()
});
box.add( sound );
const sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/dog.ogg", ( buffer ) => {
    sound2.setBuffer( buffer );
    sound2.setRefDistance( 20 );
    sound2.setLoop( true );
    sound2.setRolloffFactor( 1 );
    sound2.play()
});
box2.add( sound2 );

//Cajas a la escena
scene.add( box );
scene.add( box2 );

//RayCaster
const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

//EventListeners
document.body.addEventListener( 'mousemove', ( event ) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );
window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );
document.body.addEventListener( 'keydown', ( event ) => {
    const spaceKeyCode = 32;
    if ( event.keyCode === spaceKeyCode && intersectedObject ) {
        if (intersectedObject.name === "Caja1") {
            if (sound.isPlaying === true) {
                sound.pause();
                box.material[0] = specialFaceMaterial;
                box.material.needsUpdate = true;

            }
            else {
                sound.play();
                box.material[0] = specialFaceMaterialon;
                box.material.needsUpdate = true;
            }
        }
        else if (intersectedObject.name == "Caja2") {
            if (sound2.isPlaying === true) {
                sound2.pause();
                box2.material[0] = specialFaceMaterial;
                box2.material.needsUpdate = true;
            }
            else {
                sound2.play();
                box2.material[0] = specialFaceMaterialon;
                box2.material.needsUpdate = true;
            }
        }
    }
}, false );

const clock = new THREE.Clock();
function animate() {
    renderer.render(scene, camera);
    stats.update();
    const delta = clock.getDelta();
    controls.update(delta);
    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame(animate);

    rayCaster.setFromCamera(mouse, camera);
    // Look for all the intersected objects
    const intersects = rayCaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        // Sorted by Z (close to the camera)
        if (intersectedObject != intersects[0].object) {
            intersectedObject = intersects[0].object;
            console.log('New intersected object: ' + intersectedObject.name);
        }
    }
    else {

        intersectedObject = null;
    }

    let collisions;
    const distance = 20; // Maximum distance of a collision
    let direction;
    for (let i = 0; i < movements.length; i++) {
        direction=movements[i];
        rayCaster.set(camera.position, direction);
        collisions = rayCaster.intersectObjects(scene.children);
        if (collisions.length > 0 && collisions[0].distance <= distance) {
            if (collisions) {
                controls.update(-delta);
            }
        }
    }
    renderer.render( scene, camera );
};

renderer.render( scene, camera );
animate();



