function g(){return {'type': 'grass', 'variant': undefined}}
function t(){return {'type': 'tree', 'variant': undefined}}
function w(){return {'type': 'water', 'variant': undefined}}
function h1(){return {'type': 'hill', 'variant': 'southwest'}}
function h2(){return {'type': 'hill', 'variant': 'south'}}
function h4(){return {'type': 'hill', 'variant': 'west'}}
function hut(n){return {'type': 'hut', 'variant': n_to_dir(n)}}
function door(){return {'type': 'hutdoor', 'variant': 'open-dark'}}
function chim(){return {'type': 'hut', 'variant': 'chimney'}}
function winl(){return {'type': 'hut', 'variant': 'window-light'}}
function wind(){return {'type': 'hut', 'variant': 'window-dark'}}

function n_to_dir(n){
	var dir = ''
	if(n / 3 > 2){
		dir += 'north'
	} else if(n / 3 <= 1){
		dir += 'south'
	}
	if(n % 3 == 0){
		dir += 'east'
	} else if(n % 3 == 1){
		dir += 'west'
	}
	return dir || 'mid'
}

function line(f, num, l){
	l = l || []
	for(var i = 0; i < num; i++){
		l.push(f())
	}
	l.l = function(f, num){return line(f, num, this)}
	return l
}

function A(){
	this.array = [];
}
A.prototype.repeat = function(f, n){
	n = n || 1
	for(var i = 0; i < n; i++){
		this.array.push(f())
	}
}

A.prototype.g = function(n){this.repeat(g,n);return this}
A.prototype.t = function(n){this.repeat(t,n);return this}
A.prototype.w = function(n){this.repeat(w,n);return this}
A.prototype.h1 = function(n){this.repeat(h1,n);return this}
A.prototype.h2 = function(n){this.repeat(h2,n);return this}
A.prototype.h4 = function(n){this.repeat(h4,n);return this}
A.prototype.end = function(){return this.array}
A.prototype.hutwest = function(){
	this.array.push(hut(7))
	this.array.push(hut(1))
	return this
}
A.prototype.hutmid = function(d, c){
	if(c){
		this.array.push(chim())
	} else {
		this.array.push(hut(8))
	}
	if(d){
		this.array.push(door())
	} else {
		this.array.push(wind())
	}
	return this
}
A.prototype.huteast = function(){
	this.array.push(hut(9))
	this.array.push(hut(3))
	return this
}


var area1 = new Map(25,25)
area1.terrain = [
new A().w(25).end(),
new A().w(25).end(),
new A().g(9).w(16).end(),
new A().g(11).w(14).end(),
new A().g(12).w(13).end(),
new A().g(12).w(13).end(),
new A().g(13).w(12).end(),
new A().g(13).w(12).end(),
new A().g(13).w(12).end(),
new A().g(13).w(12).end(),
new A().g(13).w(12).end(),
new A().g(13).w(12).end(),
new A().h4(6).h1(1).g(7).w(11).end(),
new A().g(6).h2(1).g(7).w(11).end(),
new A().g(6).h2(1).g(7).w(11).end(),
new A().g(6).h2(1).g(8).w(10).end(),
new A().g(6).h2(1).g(8).w(10).end(),
new A().g(6).h2(1).g(9).w(9).end(),
new A().g(6).h2(1).g(10).w(8).end(),
new A().g(6).h2(1).g(12).w(6).end(),
new A().g(6).h2(1).g(13).t(2).w(3).end(),
new A().g(6).h2(1).g(13).t(5).end(),
new A().g(6).h2(1).g(12).t(6).end(),
new A().g(6).h2(1).g(7).t(11).end(),
new A().t(25).end()
]


var area2 = new Map(25,25)
area2.terrain = [
new A().w(25).end(),
new A().w(25).end(),
new A().w(10).g(15).end(),
new A().w(8).g(17).end(),
new A().w(6).g(19).end(),
new A().w(5).g(20).end(),
new A().w(4).g(21).end(),
new A().w(4).g(21).end(),
new A().w(3).g(22).end(),
new A().w(3).g(9).t(5).g(8).end(),
new A().w(3).g(8).t(7).g(7).end(),
new A().w(3).g(7).t(9).g(6).end(),
new A().w(3).g(7).t(9).h4(6).end(),
new A().w(4).g(6).t(9).g(6).end(),
new A().w(4).g(5).t(10).g(6).end(),
new A().w(5).g(4).t(10).g(6).end(),
new A().w(6).g(3).t(10).g(6).end(),
new A().w(7).g(2).t(7).g(9).end(),
new A().w(7).g(2).t(6).g(2).t(2).g(6).end(),
new A().w(8).g(1).t(6).g(1).t(3).g(6).end(),
new A().w(8).g(1).t(6).g(1).t(3).g(6).end(),
new A().w(8).g(2).t(5).g(1).t(4).g(5).end(),
new A().w(9).g(1).t(5).g(1).t(4).g(5).end(),
new A().w(9).g(1).t(5).g(1).t(5).g(4).end(),
new A().w(9).g(1).t(5).g(1).t(5).g(2).t(2).end()
]


var area3 = new Map(25, 25)
area3.terrain = [
new A().w(9).g(1).t(5).g(1).t(5).g(2).t(2).end(),
new A().w(9).g(1).t(5).g(1).t(5).g(3).t(1).end(),
new A().w(9).g(1).t(5).g(1).t(5).g(3).t(1).end(),
new A().w(9).g(1).t(5).g(1).t(6).g(2).t(1).end(),
new A().w(9).g(1).t(5).g(1).t(6).g(3).end(),
new A().w(10).t(5).g(1).t(6).g(3).end(),
new A().w(10).t(5).g(1).t(7).g(2).end(),
new A().w(10).t(5).g(1).t(7).g(2).end(),
new A().w(10).t(5).g(1).t(8).g(1).end(),
new A().w(10).t(5).g(1).t(9).end(),
new A().w(10).t(5).g(3).t(7).end(),
new A().w(10).t(3).g(7).t(5).end(),
new A().w(10).t(2).g(9).t(4).end(),
new A().w(10).t(2).g(9).t(4).end(),
new A().w(10).t(2).g(3).hutwest().g(4).t(4).end(),
new A().w(10).t(2).g(3).hutmid(false, true).g(4).t(4).end(),
new A().w(10).t(2).g(3).hutmid(true).g(4).t(4).end(),
new A().w(10).t(2).g(3).huteast().g(4).t(4).end(),
new A().w(10).t(2).g(9).t(4).end(),
new A().w(10).t(2).g(9).t(4).end(),
new A().w(10).t(3).g(7).t(5).end(),
new A().w(10).t(5).g(3).t(7).end(),
new A().w(10).t(16).end(),
new A().w(10).t(16).end(),
new A().w(10).t(16).end()
]

area1.north = area2
area2.south = area1
area2.east = area3
area3.west = area2

var npc1 = area1.createNPC(10,10)
npc1.conversation.addLine('greeting', 'Greetings traveller!');
npc1.conversation.setOpeningLine('greeting');
npc1.conversation.setChoice('greeting', 'yes', 'takethis', 'Hello. Who are you?')
npc1.conversation.addLine('takethis', 'Who I am is not important. But it is dangerous to go alone! Take... Wait. Where did I put that sword?')
npc1.conversation.setChoice('takethis', 'yes', false, 'Eh...')

var npc2 = area2.createNPC(20,15)