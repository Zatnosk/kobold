function World(map, PC, screen){
	this.screen = screen
	this.PC = PC
	this.PC.world = this
	this.screenObject = new TileMap()
	this.screenObject.setTerrain(this.map)
	this.screen.addObject(this.screenObject)
	this.setMap(map)
}

World.prototype.text = function(conversation, callback){
	function fillOverlay(id){
		overlay.textContent = conversation.get(id)
		var choices = conversation.getChoices(id)
		for(var key in choices){
			var keybind = controller.keyMap[key] || ' '
			overlay.innerHTML += '<br>['+keybind+']: '+choices[key].text
		}
	}
	function next(resolve, id){
		fillOverlay(id)
		if(id === false){
			end(resolve)
		} else {
			var choices = conversation.getChoices(id)
			var actions = {}
			for(var key in choices){
				if(typeof choices[key].id != undefined){
					actions[key] = function(){pop(); next(resolve, choices[key].id)}
				}
			}
			var pop = controller.shadowActions(actions)
		}
	}
	function end(resolve){
		resolve(callback())
		document.getElementById('overlay').classList.add('hidden')
	}
	var controller = this.controller
	var overlay = document.getElementById('overlayContent')
	document.getElementById('overlay').classList.remove('hidden')
	var promise = new Promise(function(resolve, reject){
		next(resolve, undefined)
	})
	return promise
}

World.prototype.prompt = function(query, callback){
	var controller = this.controller
	var prompt = document.getElementById('overlayContent')
	prompt.innerHTML = query + '<br>Yes: ['+controller.keyMap.yes+'] | No: ['+controller.keyMap.no+']'
	document.getElementById('overlay').classList.remove('hidden')
	var end = function(result, resolve){
		resolve(callback(result))
		document.getElementById('overlay').classList.add('hidden')
	}
	var promise = new Promise(function(resolve, reject){
		var pop = controller.shadowActions({
			'yes': function(){pop(); end(true, resolve) },
			'no':  function(){pop(); end(false, resolve) }
		})
	})
	
	return promise
}
World.prototype.getScreenObject = function(){
	return this.screenObject
}
World.prototype.setController = function(c){
	this.controller = c
}
World.prototype.setMap = function(map){
	if(this.map){
		var oldNPCs = this.map.getNPCs()
		for(var i in oldNPCs){
			this.screen.removeObject(oldNPCs[i].getScreenObject())
		}
	}
	map.world = this
	this.map = map
	this.screenObject.setTerrain(map)
	var newNPCs = map.getNPCs()
	for(var i in newNPCs){
		var npc = newNPCs[i].getScreenObject()
		npc.hasChanged = true
		this.screen.addObject(npc)
	}
}

function Map(width, height){
	this.width = width
	this.height = height
	this.npcs = []
}
Map.prototype.getReaction = function(event){
	function wait(promise){
		if(typeof promise != 'undefined'){
			return {'x': event.x, 'y': event.y, delayed: promise}
		} else {
			return {'x': event.x, 'y': event.y}
		}
	}
	var x = event.x + event.dx
	var y = event.y + event.dy
	var npc = this.getNPC(x,y)
	if(npc){
		var world = this.world
		var promise = world.text(npc.conversation, function(){
			return wait()
		})
		return wait(promise)
	}
	var tile = this.getTerrain(x, y)
	if(event.type == 'climb'){
		if(tile.type == 'grass'){
			var promise = this.world.prompt("Climb?", function(success){
				if(success){
					return {x: x, y: y, 'stamina': -10}
				} else {
					return nop()
				}
			})
			return {x: event.x, y: event.y, delayed: promise}
		}
	} else if(event.type == 'walk'){
		if(tile.type == 'grass'){
			return {x: x, y: y, 'stamina': -1}
		}
		if(tile.type == 'hill'){
			var dx2 = event.dx + event.dx / Math.abs(event.dx) || 0 // event.dx = 11 => dx + 1
			var dy2 = event.dy + event.dy / Math.abs(event.dy) || 0 // event.dy = -3 => dy - 1
			return this.getReaction({'type': 'climb', 'x': event.x, 'y': event.y, 'dx': dx2, 'dy': dy2})
		}
		if(tile.type == 'edge'){
			var dir = tile.variant
			if(dir == 'east' && this.east){
				this.world.setMap(this.east)
				return {x: 0, y: y, 'stamina': -1}
			} else if(dir == 'west' && this.west){
				this.world.setMap(this.west)
				return {x: this.west.width - 1, y: y, 'stamina': -1}
			} else if(dir == 'north' && this.north){
				this.world.setMap(this.north)
				return {x: x, y: this.north.height - 1, 'stamina': -1}
			} else if(dir == 'south' && this.south){
				this.world.setMap(this.south)
				return {x: x, y: 0, 'stamina': -1}
			}
		}
		if(tile.type == 'hutdoor'){
			console.log('door!')
		}
	} else if(event.type == 'rest'){
		return {x:event.x, y:event.y, 'stamina': 100, 'health': 100}
	}
	return false
}
Map.prototype.getTerrain = function(x,y){
	if(x < 0){
		return {type: 'edge', variant: 'west'}
	} else if(x >= this.width){
		return {type: 'edge', variant: 'east'}
	} else if(y < 0){
		return {type: 'edge', variant: 'north'}
	} else if(y >= this.height){
		return {type: 'edge', variant: 'south'}
	}
	var type = this.terrain[x] ? this.terrain[x][y] : undefined
	var seed = Math.random()*100
	var variant = Math.floor(seed)
	if(typeof type == 'object'){
		if(isNaN(type.variant) && typeof type.variant != 'string'){
			type.variant = variant
		}
		return type
	} else {
		return {type: type, variant: variant}
	}
}
Map.prototype.createNPC = function(x, y){
	var npc = new NonPlayerCharacter(x,y, 4, 1)
	this.npcs.push(npc)
	this.npcmap = this.npcmap || []
	this.npcmap[x] = this.npcmap[x] || []
	this.npcmap[x][y] = npc
	return npc
}
Map.prototype.getNPCs = function(){
	return this.npcs
}
Map.prototype.getNPC = function(x,y){
	if(this.npcmap && this.npcmap[x] && this.npcmap[x][y]){
		return this.npcmap[x][y]
	}
	return false
}

function Character(x, y, sx, sy){
	this.x = x
	this.y = y
	sx = sx || 5
	sy = sy || 1
	this.screenObject = new Sprite(sx,sy)
	this.screenObject.setPosition(this.x, this.y)
}
Character.prototype.getScreenObject = function(){
	return this.screenObject
}
Character.prototype.act = function(e){
	reaction = this.world.map.getReaction(e)
	if(!this.waiting && reaction){
		if(reaction.delayed){
			this.waiting = true
			self = this
			reaction.delayed.then(function(reaction){
				self.receiveReaction(reaction)
				self.waiting = false
			})
		} else {
			this.receiveReaction(reaction)
		}
	}
}
Character.prototype.receiveReaction = function(reaction){
	this.x = reaction.x
	this.y = reaction.y
	if(this.screenObject){
		this.screenObject.setPosition(this.x, this.y)
	}
	if(this.stats){
		if(reaction.health){
			this.stats.health.alter(reaction.health)
		}
		if(reaction.stamina){
			this.stats.stamina.alter(reaction.stamina)
		}
	}
}
Character.prototype.up = function(){
	if(this.stats.stamina.current == 0) return;
	this.act({'type': 'walk', 'x': this.x, 'y': this.y, 'dx': 0, 'dy': -1})
}
Character.prototype.down = function(){
	if(this.stats.stamina.current == 0) return;
	this.act({'type': 'walk', 'x': this.x, 'y': this.y, 'dx': 0, 'dy': 1})
}
Character.prototype.left = function(){
	if(this.stats.stamina.current == 0) return;
	this.act({'type': 'walk', 'x': this.x, 'y': this.y, 'dx': -1, 'dy': 0})
}
Character.prototype.right = function(){
	if(this.stats.stamina.current == 0) return;
	this.act({'type': 'walk', 'x': this.x, 'y': this.y, 'dx': 1, 'dy': 0})
}
Character.prototype.rest = function(){
	this.act({'type': 'rest', 'x': this.x, 'y': this.y})
}
Character.prototype.getInventory = function(size){
	if(!this.inventory){
		this.inventory = new Inventory(size)
	}
	return this.inventory
}
Character.prototype.setSheet = function(sheet){
	this.stats = sheet
}

function NonPlayerCharacter(x, y, sx, sy){
	Character.call(this, x, y, sx, sy)
	this.conversation = new Conversation();
}

NonPlayerCharacter.prototype = Object.create(Character.prototype)
NonPlayerCharacter.prototype.constructor = NonPlayerCharacter

function Controller(target, actions, keyMap){
	this.target = target
	this.actions = actions
	this.shadowedActions = []
	this.keyMap = keyMap || Controller.arrows
	this.keyboard(true)
	var controller = this
	this.target.onkeydown = function(event){
		if(controller.keyboardEnabled){
			var action = controller.keyMap[event.keyCode]
			if(action && typeof controller.actions[action] == 'function'){
				controller.actions[action]()
			}
		}
	}
}

Controller.prototype.keyboard = function(enable){
	this.keyboardEnabled = enable != undefined ? enable : !this.keyboardEnabled
	return this.keyboardEnabled
}

Controller.prototype.shadowActions = function(actions){
	var oldActions = this.actions
	var index = this.shadowedActions.push(oldActions) - 1
	this.actions = actions
	var self = this
	return function(){
		if(self.shadowedActions[index] === oldActions){
			self.actions = oldActions
			self.shadowedAction = self.shadowedActions.slice(0, index)
		}
	}
}

Controller.arrows = {
	37: 'left',
	'left': '←',
	38: 'up',
	'up': '↑',
	39: 'right',
	'right': '→',
	40: 'down',
	'down': '↓',
	90: 'yes',
	'yes': 'Z',
	88: 'no',
	'no': 'X',
	82: 'rest',
	'rest': 'R'
}

Controller.wasd = {
	65: 'left',
	'left': 'A',
	87: 'up',
	'up': 'W',
	68: 'right',
	'right': 'D',
	83: 'down',
	'down': 'S',
	70: 'yes',
	'yes': 'F',
	71: 'no',
	'no': 'G',
	82: 'rest',
	'rest': 'R'
}

function Inventory(size){
	this.size = size || 10
	this.emptyspaces = this.size
	this.items = new Array(this.size)
	this.getDOM()
}
Inventory.prototype.add = function(item){
	for(var i = 0; i < this.size; i++){
		if(!this.items[i]){
			this.items[i] = item
			this.repaintDOM(i)
			this.emptyspaces--
			return true
		}
	}
	console.error('inventory full')
	return false
}
Inventory.prototype.remove = function(item){
	for(var i = 0; i < this.size; i++){
		if(this.items[i] == item){
			this.items[i] = undefined
			this.repaintDOM(i)
			this.emptyspaces++
			return true
		}
	}
	console.error('inventory empty')
	return false
}
Inventory.prototype.isFull = function(){
	return this.emptyspaces == 0
}
Inventory.prototype.contains = function(item){
	for(var i = 0; i < this.size; i++){
		if(this.items[i] == item){
			return true
		}
	}
	return false
}
Inventory.prototype.getDOM = function(){
	if(!this.DOM){
		var dom = {}
		this.DOM = dom
		dom.root = document.createElement('ul')
		var text = document.createTextNode('Inventory:')
		dom.root.appendChild(text)
		dom.slots = []
		for(var i = 0; i < this.items.length; i++){
			var li = document.createElement('li')
			dom.root.appendChild(li)
			dom.slots[i] = li
			this.repaintDOM(i)
		}
	}
	return this.DOM
}
Inventory.prototype.repaintDOM = function(index){
	if(this.DOM.slots[index]){
		var li = this.DOM.slots[index]
		li.innerHTML = ''
		li.appendChild(this.getDOMRepresentation(this.items[index]))
	}
}
Inventory.prototype.getDOMRepresentation = function(item){
	var element = document.createElement('div')
	element.innerHTML = "[ " + (item || "")
	return element
}