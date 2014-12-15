function QuadTree(node){
	// Member variables
	console.log(node);

	this.parentNode = null;

	//The child nodes	
	this.children = {
		"NW": null,
		"NE": null,
		"SW": null,
		"SE": null
	};

	//Neighbouring nodes
	this.neighbors = {
		"N": null,
		"E": null,
		"S": null,
		"W": null
	};
	this.centerPoint = node.vertices[2];

	//The bounding vertices
	this.leftUp = node.vertices[0];
	this.rightUp = node.vertices[1];
	this.leftDown = node.vertices[3];
	this.rightDown = node.vertices[4];

	this.enabled = true;
}


QuadTree.prototype.insertNode = function(){
	//Calculate north west
	var tempGeometry = new THREE.Geometry();
	
};

QuadTree.prototype.getChild = function(){

};