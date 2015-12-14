function err(msg) { console.error(msg) ; alert(msg) }

function Screen(canvas, vsSource, fsSource){
	this.canvas = canvas
	this.gl = initWebGL(canvas)
	setContants(this.gl)
	this.shaders = []
	this.textures = []
	this.objects = []
	this.unusedBuffers = []
}

Screen.prototype.addShaders = function(vsSource, fsSource, useNow){
	var gl = this.gl
	var prog = createShaderProgram(gl, vsSource, fsSource)
	if(useNow || useNow === undefined){
		gl.useProgram(prog)
		this.activeShader = prog
	}
	return this.shaders.push(prog) - 1
}

Screen.prototype.addTexture = function(image){
	var gl = this.gl
	var texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
	return this.textures.push(texture) - 1
}

Screen.prototype.setUniform = function(name, type, value){
	var location = this.gl.getUniformLocation(this.activeShader, name)
	this.gl['uniform'+type](location, value[0], value[1], value[2], value[3])	
}

Screen.prototype.addObject = function(obj){
	var vBuf, tBuf
	for(var i in this.unusedBuffers){
		if(this.unusedBuffers[i]
		&& this.unusedBuffers[i].vertexBuffer
		&& this.unusedBuffers[i].textureBuffer){
			vBuf = this.unusedBuffers[i].vertexBuffer
			tBuf = this.unusedBuffers[i].textureBuffer
			delete this.unusedBuffers[i]
			break
		}
	}
	var o = {
		vertexBuffer: vBuf || this.gl.createBuffer(),
		textureBuffer: tBuf || this.gl.createBuffer(),
		data: obj
	}
	var k = storeInList(this,'objects',o)
}

Screen.prototype.removeObject = function(obj){
	for(var i in this.objects){
		if(obj === this.objects[i].data){
			var k = storeInList(this, 'unusedBuffers', {
				vertexBuffer: this.objects[i].vertexBuffer,
				textureBuffer: this.objects[i].textureBuffer
			})
			delete this.objects[i]
			return
		}
	}
}

Screen.prototype.render = function(){
	this.gl.clear(this.gl.COLOR_BUFFER_BIT)
	for(i in this.objects){
		var o = this.objects[i]
		if(o.data.hasChanged){
			var vertexCoords = o.data.getVertexCoordinates()
			o.size = vertexCoords.length / 2
			var textureCoords = o.data.getTextureCoordinates()
			fillBuffer(this.gl, o.vertexBuffer, vertexCoords)
			fillBuffer(this.gl, o.textureBuffer, textureCoords)
			o.data.hasChanged = false
		}
		if(o.data.hasMoved){
			// TODO: position matrix ?
		}
		activateBuffer(this.gl, this.activeShader, 'a_position', o.vertexBuffer)
		activateBuffer(this.gl, this.activeShader, 'a_texCoord', o.textureBuffer)
		this.gl.drawArrays(this.gl.TRIANGLES, 0, o.size)
	}
}

function setContants(gl){
	gl.clearColor(0,0,0,1)
	gl.enable(gl.BLEND)
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
}

function storeInList(host, name, item){
	for(var i = 0; i < host[name].length; i++){
		if(host[name][i] === undefined){
			host[name][i] = item
			return i
		}
	}
	host[name] = host[name] || []
	return host[name].push(item) - 1
}

function initWebGL(canvas){
	var gl = null
	try {
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
	}
	catch(e){
		err("Unable to initialize WebGL. Your browser may not support it.\nError: "+e)
	}
	return gl
}

function createShaderProgram(gl, vsSource, fsSource){
	var prog = gl.createProgram()
	compileShader(gl, prog, gl.createShader(gl.VERTEX_SHADER), vsSource)
	compileShader(gl, prog, gl.createShader(gl.FRAGMENT_SHADER), fsSource)
	gl.linkProgram(prog)
	if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
		err("Unable to initialize the shader program: " + gl.getProgramInfoLog(prog))
		return null
	}
	return prog
}

function compileShader(gl, shaderProgram, shader, source){
	gl.shaderSource(shader, source)
	gl.compileShader(shader)
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		err("An error occurred compiling a shader: " + gl.getShaderInfoLog(shader))
		return
	}
	gl.attachShader(shaderProgram, shader)
}

function fillBuffer(gl, buffer, data){
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
}

function activateBuffer(gl, shader, attrib, buffer){
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	var location = gl.getAttribLocation(shader, attrib)
	gl.enableVertexAttribArray(location)
	gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)
}
