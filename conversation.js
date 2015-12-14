function Conversation(data){
	this.data = data
}

Conversation.prototype.get = function(id){
	if(typeof id == 'undefined'){
		return this.data['greeting']
	} else {
		return this.data[id]
	}
}