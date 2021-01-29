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
const material2 = new THREE.MeshStandardMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh( geometry2, material2 );

const geometry3 = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material3 = new THREE.MeshLambertMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry3, material3 );

cube.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
sphere.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
cylinder.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
cube.position.set(40,0);
sphere.position.set(-40,0);
cylinder.position.set(-80,0);


const geometry = new THREE.Geometry();
const inner=10;
const outer=20;
geometry.vertices.push( new THREE.Vector3( -inner, inner, 0 ) );
geometry.vertices.push( new THREE.Vector3( inner, inner, 0 ) );
geometry.vertices.push( new THREE.Vector3( inner, -inner, 0 ) );
geometry.vertices.push( new THREE.Vector3( -inner, -inner, 0 ) );

// External vertices
geometry.vertices.push( new THREE.Vector3( -outer, outer, 0 ) );
geometry.vertices.push( new THREE.Vector3( outer, outer, 0 ) );
geometry.vertices.push( new THREE.Vector3( outer, -outer, 0 ) );
geometry.vertices.push( new THREE.Vector3( -outer, -outer, 0 ) );

// Polygons (faces)
geometry.faces.push( new THREE.Face3( 5, 4, 0 ) );
geometry.faces.push( new THREE.Face3( 0, 1, 5 ) );
geometry.faces.push( new THREE.Face3( 6, 5, 1 ) );
geometry.faces.push( new THREE.Face3( 1, 2, 6 ) );
geometry.faces.push( new THREE.Face3( 7, 6, 2 ) );
geometry.faces.push( new THREE.Face3( 2, 3, 7 ) );
geometry.faces.push( new THREE.Face3( 4, 7, 3 ) );
geometry.faces.push( new THREE.Face3( 3, 0, 4 ) );

geometry.vertices.push( new THREE.Vector3( 0, 40, 0 ) );
geometry.faces.push(new THREE.Face3( 4, 5, 8 ) );

geometry.computeFaceNormals( );

const material4 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
const cuadradoaguj = new THREE.Mesh( geometry, material4 );


scene.add( cuadradoaguj );
scene.add( cube );
scene.add( sphere );
scene.add( cylinder );

const light = new THREE.PointLight( 0xff0000, 100, 100 );
light.position.set( -50, 0, 30 );
scene.add( light );

renderer.render( scene, camera );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );