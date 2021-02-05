import * as THREE from 'three';
import { SrcColorFactor } from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 180 );

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


const NOISEMAP = "../textures/noisesun.png";
const SUNMAP = "../textures/sun.jpg";
const textureLoadersun = new THREE.TextureLoader( );
const uniforms = {
    "fogDensity": { value: 0 },
    "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
    "time": { value: 1.0 },
    "uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
    "texture1": { value: textureLoadersun.load( NOISEMAP ) },
    "texture2": { value: textureLoadersun.load( SUNMAP ) }
};

uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

const vertexShader = require( "../shaders/vertex.glsl" );
const fragmentShader = require( "../shaders/fragment.glsl" );


const materialsun = new THREE.ShaderMaterial( {
    uniforms,
    vertexShader,
    fragmentShader
} );


const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const sphere = new THREE.Mesh( geometry, material );

const geometry2 = new THREE.SphereGeometry( 5.2, 32, 32 );
const atmosfera = new THREE.Mesh( geometry2, nubes );

const geometry3 = new THREE.SphereGeometry( 1.35, 8.64, 8.64 );
const luna = new THREE.Mesh( geometry3, materialLuna );

const geometry4 = new THREE.SphereGeometry( 30,120,120);
const sol = new THREE.Mesh( geometry4, materialsun );

sol.position.set( 60, 0, 50 );
scene.add( sol );

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
light.position.set( 60, 0, 50 );
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
    const OrbitaLuna=20;
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


    //
    uniforms[ "time" ].value += 0.2 * delta;
    sol.rotation.y+=rotation*0.05;

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();
