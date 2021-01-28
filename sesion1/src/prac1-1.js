import * as THREE from 'three';

import { WEBGL } from 'three/examples/jsm/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    alert("WebGLAvailable")
}else{
    alert("WebGL is not Available")
}