var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.001, 100000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );


/************* CAMERA ***************/

camera.position.z = 250;
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
//Size of planet
var planetSize = 200;
//Actual size of plane
var planeSize = 2;
//Create six faces of lod planes?
var face1 = new LOD.Plane(planeSize, 7, 32);
face1.geometry(camera.position).computeFaceNormals();
face1.geometry(camera.position).computeVertexNormals();
var face2 = new LOD.Plane(planeSize, 7, 32);
face2.geometry(camera.position).computeFaceNormals();
face2.geometry(camera.position).computeVertexNormals();
var face3 = new LOD.Plane(planeSize, 7, 32);
face3.geometry(camera.position).computeFaceNormals();
face3.geometry(camera.position).computeVertexNormals();
var face4 = new LOD.Plane(planeSize, 7, 32);
face4.geometry(camera.position).computeFaceNormals();
face4.geometry(camera.position).computeVertexNormals();
var face5 = new LOD.Plane(planeSize, 7, 32);
face5.geometry(camera.position).computeFaceNormals();
face5.geometry(camera.position).computeVertexNormals();
var face6 = new LOD.Plane(planeSize, 7, 32);
face6.geometry(camera.position).computeFaceNormals();
face6.geometry(camera.position).computeVertexNormals();

//TestMaterial
//var testMaterial = createHeightMap(194, 194);


//Shaders
var planetShaders = new THREE.ShaderMaterial({
  vertexShader: $("#planetVertexShader").text(),
  fragmentShader: $("#planetFragmentShader").text(),
  wireframe: false
});

//Create meshes from the faces
var mesh1 = new THREE.Mesh(face1.geometry(camera.position), planetShaders);
var mesh2 = new THREE.Mesh(face2.geometry(camera.position), planetShaders);
var mesh3 = new THREE.Mesh(face3.geometry(camera.position), planetShaders);
var mesh4 = new THREE.Mesh(face4.geometry(camera.position), planetShaders);
var mesh5 = new THREE.Mesh(face5.geometry(camera.position), planetShaders);
var mesh6 = new THREE.Mesh(face6.geometry(camera.position), planetShaders);


//Add the meshes to the scene
//Special loop because of buffergeometry
for(var i = 0; i < face1.attributePosition.array.length; i++){
  var tempVector = new THREE.Vector3(face1.attributePosition.array[i*3], face1.attributePosition.array[i*3+2], -1);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  tempVector.normalize().multiplyScalar(planetSize);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  face1.attributePosition.setX(i, tempVector.x);
  face1.attributePosition.setY(i, tempVector.y);
  face1.attributePosition.setZ(i, tempVector.z);
}
for(var i = 0; i < face2.attributePosition.array.length; i++){
  var tempVector = new THREE.Vector3(face2.attributePosition.array[i*3+2], face2.attributePosition.array[i*3], 1);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  tempVector.normalize().multiplyScalar(planetSize);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  face2.attributePosition.setX(i, tempVector.x);
  face2.attributePosition.setY(i, tempVector.y);
  face2.attributePosition.setZ(i, tempVector.z);
}
for(var i = 0; i < face3.attributePosition.array.length; i++){
  var tempVector = new THREE.Vector3(-1, face3.attributePosition.array[i*3], face3.attributePosition.array[i*3+2]);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  tempVector.normalize().multiplyScalar(planetSize);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  face3.attributePosition.setX(i, tempVector.x);
  face3.attributePosition.setY(i, tempVector.y);
  face3.attributePosition.setZ(i, tempVector.z);
}
for(var i = 0; i < face4.attributePosition.array.length; i++){
  var tempVector = new THREE.Vector3(1, face4.attributePosition.array[i*3+2], face4.attributePosition.array[i*3]);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  tempVector.normalize().multiplyScalar(planetSize);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  face4.attributePosition.setX(i, tempVector.x);
  face4.attributePosition.setY(i, tempVector.y);
  face4.attributePosition.setZ(i, tempVector.z);
}
for(var i = 0; i < face5.attributePosition.array.length; i++){
  var tempVector = new THREE.Vector3(face5.attributePosition.array[i*3], 1, face5.attributePosition.array[i*3+2]);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  tempVector.normalize().multiplyScalar(planetSize);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  face5.attributePosition.setX(i, tempVector.x);
  face5.attributePosition.setY(i, tempVector.y);
  face5.attributePosition.setZ(i, tempVector.z);
}
for(var i = 0; i < face6.attributePosition.array.length; i++){
  var tempVector = new THREE.Vector3(face6.attributePosition.array[i*3+2], -1, face6.attributePosition.array[i*3]);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  tempVector.normalize().multiplyScalar(planetSize);

  //console.log(tempVector.x, tempVector.y, tempVector.z);

  face6.attributePosition.setX(i, tempVector.x);
  face6.attributePosition.setY(i, tempVector.y);
  face6.attributePosition.setZ(i, tempVector.z);
}


scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);
scene.add(mesh6);

console.log(mesh1);

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
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var clock = new THREE.Clock();
update();



/********* FUNCTIONS ***********/

function lodUpdate() {
  /*var geometry = terrain.geometry(camera.position);
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  if(geometry !== terrainMesh.geometry){
    scene.remove(terrainMesh);
    terrainMesh = new THREE.Mesh(terrain.geometry(camera.position), planetShaders);
    scene.add(terrainMesh);
  }*/


}

function update() {

  var delta = clock.getDelta();
  controls.update(delta);

  //lodUpdate();

  requestAnimationFrame(update);
  render();

}

function render(){
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
}
