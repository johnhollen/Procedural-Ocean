var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );


/************* CAMERA ***************/

camera.position.z = 200;
camera.position.x = 0;
camera.position.y = 0;


var controls = new THREE.FirstPersonControls(camera);


/******** LIGHT SOURCE ****************/

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;

spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 30;

scene.add( spotLight );


/****** PLANET ***********/

var terrain = new LOD.Plane(300, 7, 32);
terrain.geometry(camera.position).computeFaceNormals();
terrain.geometry(camera.position).computeVertexNormals();
//Shaders
var planetShaders = new THREE.ShaderMaterial({
  vertexShader: $("#planetVertexShader").text(),
  fragmentShader: $("#planetFragmentShader").text(),
  //wireframe: true
});



var terrainMesh = new THREE.Mesh(terrain.geometry(camera.position), planetShaders);
scene.add(terrainMesh);

//controls.domElement.addEventListener('change', lodUpdate);


/***************Atmosphere **************/


//var atmosphereGeometry = new THREE.SphereGeometry(240, 200, 200);

// atmosphere = new THREE.Mesh(atmosphereGeometry, THREE.Material({color: 0xff0000}));
//scene.add(atmosphere)




/*** SKY BOX ***************/

/*var skyBoxShaderMaterial = new THREE.ShaderMaterial({
  vertexShader:   $("#skyBoxVertexShader").text(),
  fragmentShader: $('#skyBoxFragmentShader').text(),
  side: THREE.BackSide
});


var skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry(10000, 10000, 10000, 1, 1, 1, null, true ), skyBoxShaderMaterial);
//skyboxMesh.doubleSided = true;
// add it to the scene
scene.add(skyboxMesh);*/

var clock = new THREE.Clock();

/****** FUNCTIONS ********/

function lodUpdate() {
  var geometry = terrain.geometry(camera.position);
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  if(geometry !== terrainMesh.geometry){
    scene.remove(terrainMesh);
    terrainMesh = new THREE.Mesh(terrain.geometry(camera.position), planetShaders);
    scene.add(terrainMesh);
  }
}

update();
function update() {
  var delta = clock.getDelta();
  controls.update(delta);

  lodUpdate();

  requestAnimationFrame(update);
  render();
}

function render(){

  renderer.render(scene, camera);
}
