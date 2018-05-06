function Conversation(){
	this.lines = {}
	this.choices = {}
}

Conversation.prototype.get = function(id){
	if(typeof id == 'string' && this.lines[id]){
		return this.lines[id]
	} else if(this.openingLine && this.lines[this.openingLine]){
		return this.lines[this.openingLine]
	} else {
		return '...'
	}
}

Conversation.prototype.getChoices = function(id){
	if(typeof id == 'string' && this.lines[id] && this.choices[id]){
		return this.choices[id]
	} else if(this.openingLine && this.lines[this.openingLine] && this.choices[this.openingLine]){
		return this.choices[this.openingLine]
	} else {
		return {'yes': {'id': false, 'text': '...'}}
	}
}

Conversation.prototype.setOpeningLine = function(id){
	this.openingLine = id
}

Conversation.prototype.addLine = function(id, text){
	this.lines[id] = text
}

Conversation.prototype.setChoice = function(id, choice, next, text){
	if(typeof this.choices[id] == 'undefined'){
		this.choices[id] = {}
	}
	this.choices[id][choice] = {'id': next, 'text': text}
}

Conversation.prototype.addEvent = function(id, name, args){
	this.lines[id] = {'type': 'event', 'name': name, 'args': args}
}