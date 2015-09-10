var scene = new THREE.Scene();

var sceneHeight = 400;
var sceneWidth = 900;

var camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWidth, sceneHeight);
document.getElementById("canvasWrapper").appendChild( renderer.domElement );


/************* CAMERA ***************/

var cubeCamera = new THREE.CubeCamera(1, 10000, 256);
cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
cubeCamera.renderTarget.stencilBuffer = false;
cubeCamera.renderTarget.depthBuffer = false;
scene.add(cubeCamera);

camera.position.z = -400;
camera.position.x = 0;
camera.position.y = 130;


var controls = new THREE.FirstPersonControls(camera);

/*** Light Source ***/
var light = new THREE.PointLight( 0xffcc99, 1.5, 10000 );
light.position.set(-200, 200, 2000);
scene.add(light);

var waterSurface = new THREE.PlaneGeometry(4000, 2000, 150, 75);
waterSurface.needsUpdate = true;

//Shaders
var waterUniforms = THREE.UniformsLib['lights'];

waterUniforms.time = {type: "f", value: 1.0};
waterUniforms.skyTexture = {type: "t", value: cubeCamera.renderTarget};
waterUniforms.normalMap = {type: "t", value: THREE.ImageUtils.loadTexture('./waternormals.jpg')};

var waterShaders = new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: $("#planetVertexShader").text(),
  fragmentShader: $("#planetFragmentShader").text(),
  wireframe: false,
  lights: true
});


//Add the meshes to the scene
//Special loop because of buffergeometry
var waterMesh = new THREE.Mesh(waterSurface, waterShaders);
waterMesh.rotation.x = -Math.PI/2;
waterMesh.rotation.y = 0;
waterMesh.rotation.z = 0;
waterMesh.position.x = 0;
waterMesh.position.y = -20.0;
waterMesh.position.z = 0;

scene.add(waterMesh);

/************** SKY BOX ***************/

skyboxUniforms = {
  time: {type: "f", value: 1.0}
}

var skyBoxShaderMaterial = new THREE.ShaderMaterial({
  uniforms: skyboxUniforms,
  vertexShader:   $("#skyBoxVertexShader").text(),
  fragmentShader: $('#skyBoxFragmentShader').text(),
  side: THREE.BackSide
});

var skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry(10000, 10000, 10000, 1, 1, 1, null, true ), skyBoxShaderMaterial);
//skyboxMesh.doubleSided = true;
// add it to the scene
scene.add(skyboxMesh);

/*** Rendering ***/

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'fixed';
stats.domElement.style.right = '10px';
stats.domElement.style.top = '10px';

document.body.appendChild( stats.domElement );

var clock = new THREE.Clock();
var worker = new Worker("scripts/lodworker.js");

cubeCamera.updateCubeMap(renderer, scene);

update();

function update(){
  var delta = clock.getDelta();
  controls.update(delta);
  waterUniforms.time.value += delta;
  skyboxUniforms.time.value += delta;

  waterMesh.visible = false;

  cubeCamera.updateCubeMap(renderer, scene);

  waterMesh.visible = true;

  requestAnimationFrame(update);
  render();
}

function render(){
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
}
