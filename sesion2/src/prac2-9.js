import * as THREE from 'three';
import { SrcColorFactor } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 70);

const light = new THREE.PointLight();
light.position.set( 60, 0, 50 );
scene.add( light );

const modelUrl = "../models/iss.dae";
let iss;

const loadingManager = new THREE.LoadingManager( ( ) => {

    scene.add( iss );
    console.log( 'Model loaded' );
} );

const loader = new ColladaLoader( loadingManager );
loader.load( modelUrl, ( collada ) => {

    iss = collada.scene;
    iss.scale.x = iss.scale.y = iss.scale.z = 0.3;
    iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    iss.updateMatrix( );
} );



renderer.render( scene, camera );


window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );