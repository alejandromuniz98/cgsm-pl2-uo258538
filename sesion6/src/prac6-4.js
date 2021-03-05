import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 1500 );


const video = document.querySelector( 'video' );
const constraints = {
    audio: false,
    video: { width: { exact: 640 }, height: { exact: 480 } }
};

navigator.mediaDevices.getUserMedia( constraints )
    // Called when we get the requested streams
    .then( ( stream ) => {

        // Video tracks (usually only one)
        const videoTracks = stream.getVideoTracks( );
        console.log( 'Stream characteristics: ', constraints );
        console.log( 'Using device: ' + videoTracks[0].label );

        // End of stream handler
        stream.onended = () => {

            console.log( 'End of stream' );
        };

        // Bind the stream to the html video element
        video.srcObject = stream;
})
    // Called in case of error
    .catch( ( error ) => {

        if ( error.name === 'ConstraintNotSatisfiedError' ) {

            console.error( 'The resolution ' + constraints.video.width.exact + 'x' +
                          constraints.video.width.exact + ' px is not supported by the camera.' );
        } else if ( error.name === 'PermissionDeniedError' ) {

            console.error( 'The user has not allowed the access to the camera and the microphone.' );
        }
        console.error( ' Error in getUserMedia: ' + error.name, error );
});



//const video = document.getElementById( 'video' );

const image = document.createElement( 'canvas' );
image.width = 854;  // Video width
image.height = 480; // Video height
const imageContext = image.getContext( '2d' );
imageContext.fillStyle = '#000000';
imageContext.fillRect( 0, 0, 854 - 1, 480 - 1 );
const texture = new THREE.Texture( image );

const material = new THREE.MeshBasicMaterial( { map: texture } );
const wall = new THREE.Mesh( new THREE.PlaneGeometry( 854, 480, 4, 4 ), material );

scene.add(wall);

renderer.render( scene, camera );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );


const clock = new THREE.Clock( );
function animate( ) {
    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

        imageContext.drawImage( video, 0, 0 );
        if ( texture ) texture.needsUpdate = true;
    }
    const delta = clock.getDelta( );
    const rotation = ( delta * Math.PI * 2 ) / 5;
    wall.rotation.y += rotation;
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};
animate();


