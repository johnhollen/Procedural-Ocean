//Function for creating a heightmap
//It will use shaders and render to texture

function createHeightMap(width, height){
  //Create the temporary scene to render to.
  var tempScene = new THREE.Scene();

  var renderTargetParams = {
    minFilter:THREE.LinearFilter,
    stencilBuffer:false,
    depthBuffer:false
  };

  var textureWidth = width;
  var textureHeight = height;

  //Create the buffer
  var tempTexture = new THREE.WebGLRenderTarget(textureWidth, textureHeight, renderTargetParams);

  //Bind the shaders
  var tempShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: $("#heightMapVertexShader").text(),
    fragmentShader: $("#heightMapFragmentShader").text()
  });

  //Create a temporary orthographic camera
  var tempCamera = new THREE.OrthographicCamera(textureWidth/(-2), textureWidth/2, textureHeight/2, textureHeight/(-2), -10000, 10000);

  var textureGeometry = new THREE.PlaneGeometry(textureWidth, textureHeight);
  var textureMesh = new THREE.Mesh(textureGeometry, tempShaderMaterial);
  textureMesh.position.z = -100;

  tempScene.add(textureMesh);

  renderer.render(tempScene, tempCamera, tempTexture, true);

  return tempTexture;
}
