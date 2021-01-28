import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 150 );

const geometry1 = new THREE.BoxGeometry( 10, 10, 10 );
const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry1, material1 );

const geometry2 = new THREE.SphereGeometry( 5, 32, 32 );
const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh( geometry2, material2 );

const geometry3 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material3 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry3, material3 );


cube.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
sphere.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
cylinder.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
cube.position.set(40,0);
sphere.position.set(-40,0);

scene.add( cube );
scene.add( sphere );
scene.add( cylinder );
renderer.render( scene, camera );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );