//Function for creating a heightmap
//It will use shaders and render to texture

function createHeightMap(width, height, tempCamera){
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
    vertexShader: $("#skyBoxVertexShader").text(),
    fragmentShader: $("#skyBoxFragmentShader").text(),
  });

  //Create a temporary orthographic camera
  tempCamera.updateCubeMap(renderer, tempScene);

  var textureGeometry = new THREE.CubeGeometry(10000, 10000, 10000, 1, 1, 1);
  var textureMesh = new THREE.Mesh(textureGeometry, tempShaderMaterial);
  tempScene.add(textureMesh);

  renderer.render(tempCamera, tempCamera.renderTarget);

  return tempTexture;
}
