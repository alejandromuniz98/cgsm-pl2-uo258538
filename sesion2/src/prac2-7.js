import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 60 );

const mapUrl = "../textures/tex2-2.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl,( loaded ) => { renderer.render( scene, camera ); } );
const material = new THREE.MeshPhongMaterial( { map: map } );

const mapUrl2 = "../textures/nubes.png";   // The file used as texture
const textureLoader2 = new THREE.TextureLoader( );  // The object used to load textures
const map2 = textureLoader2.load( mapUrl2,( loaded ) => { renderer.render( scene, camera ); } );
var nubes = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: map2, transparent: true } );

const moonMapUrl = "../textures/luna.jpg";
const moonMap = textureLoader.load( moonMapUrl,(loaded) => { renderer.render( scene, camera ); } );
const materialLuna = new THREE.MeshLambertMaterial( { map: moonMap, color: 0x888888 } );


const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphere = new THREE.Mesh( geometry, material );

const geometry2 = new THREE.SphereGeometry( 5.2, 32, 32 );
const atmosfera = new THREE.Mesh( geometry2, nubes );

const geometry3 = new THREE.SphereGeometry( 1.35, 8.64, 8.64 );
const luna = new THREE.Mesh( geometry3, materialLuna );

luna.position.set( Math.sqrt( 100 / 2 ), 0, -Math.sqrt( 100 / 2 ) );
luna.rotation.y = Math.PI;

var tierYatmo = new THREE.Object3D();
tierYatmo.add( sphere );
tierYatmo.add( atmosfera );
tierYatmo.rotation.set( 0, 0, 0.36 );

scene.add( tierYatmo );

var moonGroup = new THREE.Object3D( );
moonGroup.add( luna );
moonGroup.rotation.set = (0.089,0,0);

scene.add( moonGroup );

const light = new THREE.PointLight();
light.position.set( 50, 0, 50 );
scene.add( light );

renderer.render( scene, camera );


window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );



const clock = new THREE.Clock( );

function animate( ) {
    const OrbitaLuna=35;
    const TiempoOrbita=60;//2.419.200

    const delta = clock.getDelta( ); // Elapsed time in seconds
    const elapsed=clock.getElapsedTime();

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
    const rotation = ( delta * Math.PI * 2 ) / 24;
    sphere.rotation.y += rotation;
    atmosfera.rotation.y += rotation * 0.95;
    //
    const rotation2 = ( delta * Math.PI * 2 ) / 10;
    luna.rotation.y += rotation2;
    //
    const rot=( elapsed * Math.PI * 2 ) / (TiempoOrbita);
    luna.position.set(Math.sin(rot)*OrbitaLuna,0,Math.cos(rot)*OrbitaLuna)

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();
