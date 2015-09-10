var scene = new THREE.Scene();

var sceneHeight = 400;
var sceneWidth = 900;

var camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWidth, sceneHeight);
document.getElementById("canvasWrapper").appendChild( renderer.domElement );


/************* CAMERA ***************/

camera.position.z = -400;
camera.position.x = 0;
camera.position.y = 130;


var controls = new THREE.FirstPersonControls(camera);

/*** Light Source ***/
var light = new THREE.PointLight( 0xffcc99, 1.5, 10000 );
light.position.set(0, 200, 2000);
scene.add(light);

/*var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 100, 0);

spotLight.castShadow = true;

spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;

spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 30;

scene.add( spotLight );*/


var waterSurface = new THREE.PlaneGeometry(4000, 2000, 150, 75);
waterSurface.needsUpdate = true;

//Shaders
var waterUniforms = THREE.UniformsLib['lights'];

waterUniforms.time = {type: "f", value: 1.0};
waterUniforms.heightMap = {type: "t", value: createHeightMap(256, 256)};
waterUniforms.normalMap = {type: "t", value: THREE.ImageUtils.loadTexture('./waternormals.jpg')};

  /*time: {type: "f", value: 1.0},
  heightMap: {type: "t", value: createHeightMap(256, 256)},
  normalMap: {type: "t", value: THREE.ImageUtils.loadTexture('./waternormals.jpg')},
};*/

var waterShaders = new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: $("#planetVertexShader").text(),
  fragmentShader: $("#planetFragmentShader").text(),
  wireframe: false,
  lights: true
});

waterUniforms.normalMap.value.wrapS = waterUniforms.normalMap.value.wrapT = THREE.RepeatWrapping;
waterUniforms.normalMap.value.repeat.set( 4000, 2000 );


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
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var clock = new THREE.Clock();
var worker = new Worker("scripts/lodworker.js");

update();

function update(){
  var delta = clock.getDelta();
  controls.update(delta);
  waterUniforms.time.value += delta;
  skyboxUniforms.time.value += delta;

  requestAnimationFrame(update);
  render();

}

function render(){
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
}
