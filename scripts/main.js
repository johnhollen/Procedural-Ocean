var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry(20, 100, 100);
// create the sphere's material
var shaderMaterial = new THREE.ShaderMaterial({

  vertexShader:   $('#vertexshader').text(),
  fragmentShader: $('#fragmentshader').text()
});
camera.position.z = 100;
camera.position.x = -100;
camera.position.y = 100;


var controls = new THREE.FirstPersonControls(camera);

var sphere = new THREE.Mesh(geometry, shaderMaterial);
scene.add(sphere);


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

  renderer.render(scene, camera);
}

render();
