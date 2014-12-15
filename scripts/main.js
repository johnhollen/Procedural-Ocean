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

/*var origin = new THREE.Vector3(0.0, 0.0, 0.0);
var distanceVector = oridgin.sub(camera.position);

var planetUniforms = {
  "distanceVector": {"type": "v3", "value": distanceVector}
};


var shaderMaterial = new THREE.ShaderMaterial({
  uniforms: planetUniforms,
  vertexShader:   $('#planetVertexShader').text(),
  fragmentShader: $('#planetFragmentShader').text()

});


var planetGeometry = new THREE.SphereGeometry(1000, 200, 200);

var planet = new THREE.Mesh(planetGeometry, shaderMaterial);
scene.add(planet); */

//Some testing 

//Starting geometry
//Maybe this will be sent into the quadtree?
var geometry = new THREE.Geometry();

geometry.vertices.push(
  // Main vertices
  //NW
  new THREE.Vector3( -20,  0, 0 ),
  //NE
  new THREE.Vector3(  20,  0, 0 ),
  //Center one
  new THREE.Vector3(   0, -20, 0 ),
  //SW
  new THREE.Vector3( -20, -40, 0),
  //SE
  new THREE.Vector3( 20, -40, 0)

  //Sub vertices
  //new THREE.Vector3(-20, -20, 0),
  //new THREE.Vector3( 0, -40, 0),
  //new THREE.Vector3( 20, -20, 0),
  //new THREE.Vector3( 0, 0, 0)
);

//Adding the main vertices
geometry.faces.push( new THREE.Face3( 0, 2, 1 ) );
geometry.faces.push( new THREE.Face3( 0, 3, 2 ) );

geometry.faces.push( new THREE.Face3( 4, 2, 3 ) );
geometry.faces.push( new THREE.Face3( 2, 4, 1 ) );

//Adding the sub vertices
/*geometry.faces.push( new THREE.Face3( 5, 2, 0 ) );
geometry.faces.push( new THREE.Face3( 5, 3, 2 ) );

geometry.faces.push( new THREE.Face3( 6, 2, 3 ) );
geometry.faces.push( new THREE.Face3( 4, 2, 6 ) );
geometry.faces.push( new THREE.Face3( 7, 2, 4 ) );

geometry.faces.push( new THREE.Face3( 0, 2, 8 ) );
geometry.faces.push( new THREE.Face3( 8, 2, 1 ) );
geometry.faces.push( new THREE.Face3( 1, 2, 7 ) );*/


var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({wireframe:true}));
scene.add(mesh);



var quadtree = new QuadTree(geometry);

quadtree.insertNode();

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
update();
function update() {
  var delta = clock.getDelta();  
  controls.update(delta);

  //Check for LoD, update the quadtree

  

  requestAnimationFrame(update);
  render();
}

function render(){
  
  renderer.render(scene, camera);
}

