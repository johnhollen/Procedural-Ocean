var scene = new THREE.Scene();

var sceneHeight = 300;
var sceneWidth = 700;

var camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWidth, sceneHeight);
document.getElementById("canvasWrapper").appendChild( renderer.domElement );


/************* CAMERA ***************/

camera.position.z = -800;
camera.position.x = 0;
camera.position.y = 130;


var controls = new THREE.FirstPersonControls(camera);


var waterSurface = new THREE.PlaneGeometry(4000, 2000, 150, 75);
waterSurface.needsUpdate = true;

//Shaders

var waterUniforms = {
  time: {type: "f", value: 1.0},
  heightMap: {type: "t", value: createHeightMap(256, 256)},
  normalMap: {type: "t", value: THREE.ImageUtils.loadTexture('../waternormals.jpg')}
};

var waterShaders = new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: $("#planetVertexShader").text(),
  fragmentShader: $("#planetFragmentShader").text(),
  wireframe: true
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



//console.log(face1.geometry(camera.position));

scene.add(waterMesh);


/*************** ATMOSPHERE **************/


//var atmosphereGeometry = new THREE.SphereGeometry(240, 200, 200);

// atmosphere = new THREE.Mesh(atmosphereGeometry, THREE.Material({color: 0xff0000}));
//scene.add(atmosphere)




/************** SKY BOX ***************/

var skyBoxShaderMaterial = new THREE.ShaderMaterial({
  vertexShader:   $("#skyBoxVertexShader").text(),
  fragmentShader: $('#skyBoxFragmentShader').text(),
  side: THREE.BackSide
});


var skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry(10000, 10000, 10000, 1, 1, 1, null, true ), skyBoxShaderMaterial);
//skyboxMesh.doubleSided = true;
// add it to the scene
scene.add(skyboxMesh);


var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'fixed';
stats.domElement.style.left = '7%';
stats.domElement.style.top = '10%';

document.body.appendChild( stats.domElement );

var clock = new THREE.Clock();
var worker = new Worker("scripts/lodworker.js");

update();


/********* FUNCTIONS ***********/

/*function lodUpdate(){
  var tempGeometry = face1.geometry(camera.position);
  if(tempGeometry !== mesh1.geometry){
    scene.remove(mesh1);
    mesh1 = new THREE.Mesh(face1.geometry(camera.position), planetShaders);
    //mesh1.rotation.x = Math.PI/2;
    scene.add(mesh1);
    //console.log("In if in lodUpdate()")
    //worker.postMessage(face1.geometry(camera.position));
  }
}*/

/*worker.onmessage = function(e){
  console.log("In worker.onmessage()");
  console.log(e.data);

  var tempGeometry = new THREE.BufferGeometry();

  tempGeometry.attributes = e.data.attributes;
  tempGeometry.attributesKeys = e.data.attributesKeys;

  scene.remove(mesh1);
  mesh1 = new THREE.Mesh(tempGeometry, planetShaders);
  scene.add(mesh1);

};*/

function update(){
  var delta = clock.getDelta();
  controls.update(delta);
  waterUniforms.time.value += delta;
  //worker.postMessage(face1.geometry(camera.position).clone());

  requestAnimationFrame(update);
  render();

}

function render(){
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
}
