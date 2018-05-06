function Item(name){
	this.name = name
}

Item.prototype.toString = function(){
	return this.name
}