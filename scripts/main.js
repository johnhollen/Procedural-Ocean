
var scene = new THREE.Scene();

var fullscreen = false;

var sceneHeight = 400;
var sceneWidth = 880;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneWidth, sceneHeight);
document.getElementById("canvasWrapper").appendChild( renderer.domElement );
$("#canvasWrapper").append("<span id='fullscreen'><i class='fa fa-expand'></i></span>");

/************* CAMERA ***************/

var cubeCamera = new THREE.CubeCamera(1, 100000, 64);
cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
cubeCamera.renderTarget.stencilBuffer = false;
cubeCamera.renderTarget.depthBuffer = false;
scene.add(cubeCamera);

var camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

camera.position.z = 0;
camera.position.x = -1000;
camera.position.y = 70;


var controls = new THREE.FirstPersonControls(camera);

/*** Light Source ***/
var light = new THREE.PointLight( 0xffcc99, 1.9, 10000 );
light.position.set(0, 20, 0);
scene.add(light);

var waterSurface = new THREE.PlaneGeometry(2000, 4000, 50, 100);
waterSurface.needsUpdate = true;

//Shaders
var waterUniforms = THREE.UniformsLib['lights'];

waterUniforms.time = {type: "f", value: 1.0};
waterUniforms.skyTexture = {type: "t", value: cubeCamera.renderTarget};
waterUniforms.normalMap = {type: "t", value: THREE.ImageUtils.loadTexture('./waternormals.jpg')};

var waterShaders = new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: $("#oceanVertexShader").text(),
  fragmentShader: $("#oceanFragmentShader").text(),
  wireframe: false,
  lights: true
});


//Add the meshes to the scene
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

//For toggling full screen
$("#fullscreen").on("click", function(event){

  fullscreen = !fullscreen;

  if(fullscreen){
    sceneHeight = window.innerHeight;
    sceneWidth = window.innerWidth;
    camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

    camera.position.z = 0;
    camera.position.x = -1000;
    camera.position.y = 70;
    $("#canvasWrapper").css({
      "position": "absolute", 
      "left": 0, "top": 0, 
      "height": sceneHeight, 
      "width": sceneWidth,
      "padding": "0px"
    });
    $("body").css({"overflow": "hidden"});
    renderer.setSize(sceneWidth, sceneHeight);
    controls = new THREE.FirstPersonControls(camera);
    $("#fullscreen").html("<i class='fa fa-compress'></i>");
  }
  else if(!fullscreen){ //Reset styles and renderer
    sceneHeight = 400;
    sceneWidth = 880;
    camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

    camera.position.z = 0;
    camera.position.x = -1000;
    camera.position.y = 70;

    $("#canvasWrapper").removeAttr('style');
    $("body").removeAttr('style');
    renderer.setSize(sceneWidth, sceneHeight);
    controls = new THREE.FirstPersonControls(camera);
    $("#fullscreen").html("<i class='fa fa-expand'></i>");
  }
});

window.onresize = function(event){
  if(fullscreen){
    sceneHeight = window.innerHeight;
    sceneWidth = window.innerWidth;
    camera = new THREE.PerspectiveCamera(75, sceneWidth/sceneHeight, 0.001, 10000);

    camera.position.z = 0;
    camera.position.x = -1000;
    camera.position.y = 70;
    $("#canvasWrapper").css({ 
      "height": sceneHeight, 
      "width": sceneWidth,
    });
    $("body").css({"overflow": "hidden"});
    renderer.setSize(sceneWidth, sceneHeight);
    controls = new THREE.FirstPersonControls(camera);
  }
};