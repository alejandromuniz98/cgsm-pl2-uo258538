import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import Stats from 'three/examples/jsm/libs/stats.module';

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 400 );

const listener = new THREE.AudioListener();
camera.add( listener );

const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

document.body.addEventListener( 'mousemove', ( event ) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );

const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = -25;
scene.add(helper);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set( 0, 0.5, 100 );
scene.add(light);

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

const geometry = new THREE.BoxGeometry( 50, 50, 50 );

const mapUrl = "../textures/brick.jpg"; 
const bumpmapUrl = "../textures/brick-map.jpg"; 

const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( mapUrl),
        bumpMap: textureLoader.load( bumpmapUrl),
    } );


const mapUrl2 = "../textures/brick2.png"; 
const bumpmapUrl2 = "../textures/brick-map2.png"; 
    
const materialSpecial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( mapUrl2),
        bumpMap: textureLoader.load( bumpmapUrl2),
    } );

const specialFaceMaterial =  materialSpecial; // Material for a face
const regularFaceMaterial =  material; // Material for the rest of the faces

// A box has 6 faces
const materials = [
    specialFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
    regularFaceMaterial,
]; 


const box = new THREE.Mesh( geometry, materials );    
box.position.set(-200,0,0);
box.name="Caja 1";

const box2 = new THREE.Mesh( geometry, materials );    
box2.position.set(200,0,0);
box2.rotation.set(Math.PI,Math.PI,0);
box2.name="Caja 2";

const audioLoader = new THREE.AudioLoader();
const sound = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/audio1.ogg", ( buffer ) => {
    sound.setBuffer( buffer );
    sound.setRefDistance( 20 );
    sound.setLoop( true );
    sound.setRolloffFactor( 1 );
    sound.play(); // Modern browsers do not allow sound to start without user interaction
});
box.add( sound );

const sound2 = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/dog.ogg", ( buffer ) => {
    sound2.setBuffer( buffer );
    sound2.setRefDistance( 20 );
    sound2.setLoop( true );
    sound2.setRolloffFactor( 1 );
    sound2.play(); // Modern browsers do not allow sound to start without user interaction
});
box2.add( sound2 );


scene.add( box );
scene.add( box2 );

renderer.render( scene, camera );





const stats = new Stats( );
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );


window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );


const controls = new FirstPersonControls( camera );
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = false;
controls.lookVertical = false;

const clock = new THREE.Clock( );

function animate( ) {
    
    renderer.render( scene, camera );

    stats.update( );

    const delta = clock.getDelta();
    controls.update( delta );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );



    rayCaster.setFromCamera( mouse, camera );
    // Look for all the intersected objects
    const intersects = rayCaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
    
        // Sorted by Z (close to the camera)
        if ( intersectedObject != intersects[ 0 ].object ) {
    
            intersectedObject = intersects[ 0 ].object;
            console.log( 'New intersected object: ' + intersectedObject.name );
        }
    } else {
    
        intersectedObject = null;
    }
};
animate();
