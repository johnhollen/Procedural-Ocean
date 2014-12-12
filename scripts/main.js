var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );


// create the sphere's material

camera.position.z = 1000;
camera.position.x = -100;
camera.position.y = 100;


var controls = new THREE.FirstPersonControls(camera);


/******Things for sphere ***********/

var shaderMaterial = new THREE.ShaderMaterial({

  vertexShader:   $('#planetVertexShader').text(),
  fragmentShader: $('#planetFragmentShader').text()
});

var geometry = [

  [ new THREE.SphereGeometry(100, 200, 200), 50 ],
  [ new THREE.SphereGeometry(100, 150, 150), 300 ],
  [ new THREE.SphereGeometry(100, 100, 100), 1000 ],
  [ new THREE.SphereGeometry(100, 50, 50), 2000 ],
  [ new THREE.SphereGeometry(100, 25, 25), 8000 ]

];

lod = new THREE.LOD();

for ( i = 0; i < geometry.length; i ++ ) {

  mesh = new THREE.Mesh( geometry[ i ][ 0 ], shaderMaterial );
  mesh.scale.set( 1.5, 1.5, 1.5 );
  mesh.updateMatrix();
  mesh.matrixAutoUpdate = false;
  lod.addLevel( mesh, geometry[ i ][ 1 ] );
  scene.add( lod );
}

//var sphere = new THREE.Mesh(geometry, shaderMaterial);
//scene.add(sphere);


var skyBoxShaderMaterial = new THREE.ShaderMaterial({
  vertexShader:   $("#skyBoxVertexShader").text(),
  fragmentShader: $('#skyBoxFragmentShader').text(),
  side: THREE.BackSide
});


var skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry(10000, 10000, 10000, 1, 1, 1, null, true ), skyBoxShaderMaterial);
//skyboxMesh.doubleSided = true;
// add it to the scene
scene.add(skyboxMesh);

var clock = new THREE.Clock();
animate();
function animate() {
  var delta = clock.getDelta();
  requestAnimationFrame( animate );
  controls.update(delta);
  render();
}

function render(){
  scene.updateMatrixWorld();
  scene.traverse( function ( object ) {

    if ( object instanceof THREE.LOD ) {

      object.update( camera );

    }

  } );
  renderer.render(scene, camera);
}

render();
