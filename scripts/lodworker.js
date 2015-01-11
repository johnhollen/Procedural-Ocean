onmessage = function(e){
  var data = e.data;

  console.log("In worker script");

  self.importScripts("../libs/three.js");

  var planeSize = 40;

  //Optimize, do more iterations per iteration. Makes sense?

  for(var i = 0; i < data.attributes.position.array.length; i+=18){
    var tempVector1 = new THREE.Vector3(data.attributes.position.array[i], data.attributes.position.array[i+2], -planeSize);

    tempVector1.normalize().multiplyScalar(planeSize);

    data.attributes.position.array[i] = tempVector1.x;
    data.attributes.position.array[i+1] = tempVector1.y;
    data.attributes.position.array[i+2] = tempVector1.z;

    var tempVector2 = new THREE.Vector3(data.attributes.position.array[i+3], data.attributes.position.array[i+5], -planeSize);

    tempVector2.normalize().multiplyScalar(planeSize);

    data.attributes.position.array[i+3] = tempVector2.x;
    data.attributes.position.array[i+4] = tempVector2.y;
    data.attributes.position.array[i+5] = tempVector2.z;

    var tempVector3 = new THREE.Vector3(data.attributes.position.array[i+6], data.attributes.position.array[i+8], -planeSize);

    tempVector3.normalize().multiplyScalar(planeSize);

    data.attributes.position.array[i+6] = tempVector3.x;
    data.attributes.position.array[i+7] = tempVector3.y;
    data.attributes.position.array[i+8] = tempVector3.z;

    var tempVector4 = new THREE.Vector3(data.attributes.position.array[i+9], data.attributes.position.array[i+11], -planeSize);

    tempVector4.normalize().multiplyScalar(planeSize);

    data.attributes.position.array[i+9] = tempVector4.x;
    data.attributes.position.array[i+10] = tempVector4.y;
    data.attributes.position.array[i+11] = tempVector4.z;

    var tempVector5 = new THREE.Vector3(data.attributes.position.array[i+12], data.attributes.position.array[i+14], -planeSize);

    tempVector5.normalize().multiplyScalar(planeSize);

    data.attributes.position.array[i+12] = tempVector5.x;
    data.attributes.position.array[i+13] = tempVector5.y;
    data.attributes.position.array[i+14] = tempVector5.z;

    var tempVector6 = new THREE.Vector3(data.attributes.position.array[i+15], data.attributes.position.array[i+17], -planeSize);

    tempVector6.normalize().multiplyScalar(planeSize);

    data.attributes.position.array[i+15] = tempVector6.x;
    data.attributes.position.array[i+16] = tempVector6.y;
    data.attributes.position.array[i+17] = tempVector6.z;
  }
  postMessage(data);
};
