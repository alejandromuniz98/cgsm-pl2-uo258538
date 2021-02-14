import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 3 );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const mapUrl = "../textures/brick.jpg"; 
const bumpmapUrl = "../textures/brick-map.jpg"; 

const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( mapUrl),
        bumpMap: textureLoader.load( bumpmapUrl),
    } );


const box = new THREE.Mesh( geometry, material );    
box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

scene.add( box );

var light = new THREE.AmbientLight( );
scene.add(light);

renderer.render( scene, camera );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );


const clock = new THREE.Clock( );
function animate( ) {
    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 10;
    box.rotation.y += rotation;
    
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();