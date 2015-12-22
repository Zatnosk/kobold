(function(parent){
	var config = {
		'tileWidth' : 20,
		'tileHeight' : 20,
		'mapWidth' : 25,
		'mapHeight' : 25,
		'textureHeight' : 128,
		'textureWidth' : 128,
		'textureTileWidth' : 20/128,
		'textureTileHeight' : 20/128,
	}

	function TileMap(){
		this.hasChanged = true
		this.dirty = true
		this.config = config
	}

	TileMap.prototype.getTexCoords = function(x,y){
		var type = ''
		var variant = 0
		if(this.terrain && typeof this.terrain.getTerrain == 'function'){
			var tile = this.terrain.getTerrain(x,y)
			type = tile.type
			variant = tile.variant
		}
		var x = 0
		var y = 0
		if(type == 'grass'){
			x = variant % 6
			y = 0
		} else if(type == 'hill'){
			if(variant == 'west'){
				x = 0
				y = 3
			} else if(variant == 'southwest'){
				x = 1
				y = 3
			} else if(variant == 'south'){
				x = 2
				y = 3
			}
		} else if(type == 'tree'){
			x = variant % 4
			y = 1
		} else if(type == 'water'){
			x = variant % 6
			y = 2
		} else if(type == 'char'){
			x = 0
			y = 3
		} else if(type == 'hut'){
			console.log(variant)
			switch(variant){
				case 'northwest':
					x = 3; y = 3; break
				case 'west':
					x = 3; y = 4; break
				case 'southwest':
					x = 3; y = 5; break
				case 'north':
					x = 4; y = 3; break
				case 'south':
					x = 4; y = 5; break
				case 'northeast':
					x = 5; y = 3; break
				case 'east':
					x = 5; y = 4; break
				case 'southeast':
					x = 5; y = 5; break
				case 'chimney':
					x = 2; y = 5; break
				case 'window-light':
					x = 1; y = 5; break
				case 'window-dark':
					x = 0; y = 5; break
				default:
					x = 4; y = 4; break
			}
		} else if(type == 'hutdoor'){
			switch(variant){
				case 'closed':
					x = 2; y = 4; break;
				case 'open-light':
					x = 1; y = 4; break;
				case 'open-dark':
					x = 0; y = 4; break;
			}
		}
		var width = this.config.textureTileWidth
		var height = this.config.textureTileHeight
		return rectangle(x * width, y * height, width, height)
	}
	TileMap.prototype.setTerrain = function(terrain){
		this.terrain = terrain
		this.hasChanged = true
		this.dirty = true
	}
	TileMap.prototype.calculateCoords = function(){
		if(this.dirty){
			this.vertexCoords = []
			this.textureCoords = []
			for(var x = 0; x < this.config.mapWidth; x++){
				for(var y = 0; y < this.config.mapHeight; y++){
					var vertices = rectangle(x * this.config.tileWidth,
											 y * this.config.tileHeight,
											 this.config.tileWidth,
											 this.config.tileHeight)
					this.vertexCoords = this.vertexCoords.concat(vertices)
					this.textureCoords = this.textureCoords.concat(this.getTexCoords(x,y))
				}
			}
			this.dirty = false
		}
	}
	TileMap.prototype.getVertexCoordinates = function(){
		this.calculateCoords()
		return this.vertexCoords
	}
	TileMap.prototype.getTextureCoordinates = function(){
		this.calculateCoords()
		return this.textureCoords
	}

	

	function Character(textureX, textureY){
		this.hasChanged = true
		this.config = config
		this.x = 0
		this.y = 0
		this.tX = textureX
		this.tY = textureY
	}

	Character.prototype.setPosition = function(x, y){
		this.x = x * this.config.tileWidth
		this.y = y * this.config.tileHeight
		this.hasChanged = true
	}

	Character.prototype.getVertexCoordinates = function(){
		return rectangle(
			this.x,
			this.y,
			this.config.tileWidth,
			this.config.tileHeight
		)
	}

	Character.prototype.getTextureCoordinates = function(){
		return rectangle(
			this.tX * this.config.textureTileWidth,
			this.tY * this.config.textureTileHeight,
			this.config.textureTileWidth,
			this.config.textureTileHeight
		)
	}

	function gfx(scrobjs, url, canvas){
		var s = new Screen(canvas)
		var key = s.addShaders(findShader('shader-vs'), findShader('shader-fs'))
		s.setUniform('u_resolution', '2f', [500, 500])
		loadTexture(url).then(function(image){
			s.addTexture(image)
			for(var i in scrobjs){
				s.addObject(scrobjs[i])
			}
			setInterval(function(){s.render()}, 100)
		})
		return s
	}

	function loadTexture(url){
		var image = new Image()
		return new Promise(function(resolve, reject){
			image.onload = function(){
				resolve(image)
			}
			image.src = url
		})
	}

	function findShader(id){
		var shaderScript = document.getElementById(id)
		return shaderScript.innerHTML
	}

	function rectangle(x, y, w, h){
		var left   = x
		var right  = x + w
		var top    = y
		var bottom = y + h
		var vertices = [
			left, top,
			left, bottom,
			right, top,

			left, bottom,
			right, bottom,
			right, top
		]
		return vertices
	}

	parent.TileMap = TileMap
	parent.gfx = gfx
	parent.Sprite = Character
})(window)