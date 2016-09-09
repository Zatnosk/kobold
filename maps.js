function g(){return {'type': 'grass', 'variant': undefined}}
function t(){return {'type': 'tree', 'variant': undefined}}
function w(){return {'type': 'water', 'variant': undefined}}
function h1(){return {'type': 'hill', 'variant': 'southwest'}}
function h2(){return {'type': 'hill', 'variant': 'south'}}
function h4(){return {'type': 'hill', 'variant': 'west'}}
function hut(n){return {'type': 'hut', 'variant': n_to_dir(n)}}
function door(){return {'type': 'hutdoor', 'variant': 'closed'}}
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
A.prototype.hutmid = function(d, c, l){
	if(c){
		this.array.push(chim())
	} else {
		this.array.push(hut(8))
	}
	if(d){
		this.array.push(door())
	} else {
		if(l) this.array.push(winl())
		else this.array.push(wind())
	}
	return this
}
A.prototype.huteast = function(){
	this.array.push(hut(9))
	this.array.push(hut(3))
	return this
}


var area1 = new Map(25,25, 'area1')
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


var area2 = new Map(25,25, 'area2')
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


var area3 = new Map(25, 25, 'area3')
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

var area4 = new Map(25,25, 'area4')
area4.terrain = [[{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95}],[{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"grass","variant":88},{"type":"grass","variant":2},{"type":"grass","variant":99},{"type":"grass","variant":47},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64},{"type":"tree","variant":64}],[{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"grass","variant":43},{"type":"grass","variant":30},{"type":"grass","variant":83},{"type":"grass","variant":44},{"type":"grass","variant":1},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25},{"type":"tree","variant":25}],[{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"grass","variant":81},{"type":"grass","variant":66},{"type":"grass","variant":91},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10},{"type":"tree","variant":10}],[{"type":"grass","variant":30},{"type":"grass","variant":75},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"grass","variant":24},{"type":"grass","variant":39},{"type":"grass","variant":92},{"type":"grass","variant":48},{"type":"grass","variant":66},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"grass","variant":7},{"type":"grass","variant":45},{"type":"grass","variant":61},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47},{"type":"tree","variant":47}],[{"type":"grass","variant":11},{"type":"grass","variant":0},{"type":"grass","variant":93},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"grass","variant":99},{"type":"grass","variant":64},{"type":"grass","variant":48},{"type":"grass","variant":85},{"type":"grass","variant":16},{"type":"grass","variant":27},{"type":"grass","variant":4},{"type":"grass","variant":34},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"grass","variant":90},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8},{"type":"tree","variant":8}],[{"type":"grass","variant":87},{"type":"grass","variant":24},{"type":"grass","variant":34},{"type":"grass","variant":31},{"type":"grass","variant":31},{"type":"grass","variant":57},{"type":"grass","variant":83},{"type":"grass","variant":65},{"type":"grass","variant":40},{"type":"grass","variant":78},{"type":"grass","variant":90},{"type":"grass","variant":90},{"type":"grass","variant":20},{"type":"grass","variant":70},{"type":"grass","variant":58},{"type":"grass","variant":67},{"type":"grass","variant":94},{"type":"tree","variant":57},{"type":"tree","variant":57},{"type":"tree","variant":57},{"type":"grass","variant":37},{"type":"tree","variant":57},{"type":"tree","variant":57},{"type":"tree","variant":57},{"type":"tree","variant":57}],[{"type":"grass","variant":34},{"type":"grass","variant":98},{"type":"grass","variant":92},{"type":"grass","variant":76},{"type":"grass","variant":58},{"type":"grass","variant":39},{"type":"grass","variant":62},{"type":"grass","variant":45},{"type":"tree","variant":36},{"type":"tree","variant":36},{"type":"grass","variant":56},{"type":"grass","variant":50},{"type":"grass","variant":44},{"type":"grass","variant":11},{"type":"grass","variant":83},{"type":"grass","variant":53},{"type":"grass","variant":2},{"type":"grass","variant":27},{"type":"tree","variant":36},{"type":"grass","variant":96},{"type":"grass","variant":12},{"type":"tree","variant":36},{"type":"tree","variant":36},{"type":"tree","variant":36},{"type":"tree","variant":36}],[{"type":"grass","variant":92},{"type":"grass","variant":78},{"type":"grass","variant":27},{"type":"grass","variant":99},{"type":"grass","variant":49},{"type":"grass","variant":18},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"grass","variant":45},{"type":"grass","variant":20},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"grass","variant":44},{"type":"grass","variant":86},{"type":"grass","variant":38},{"type":"tree","variant":95},{"type":"grass","variant":93},{"type":"grass","variant":83},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95},{"type":"tree","variant":95}],[{"type":"tree","variant":9},{"type":"grass","variant":44},{"type":"grass","variant":39},{"type":"grass","variant":78},{"type":"grass","variant":43},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"grass","variant":69},{"type":"grass","variant":13},{"type":"grass","variant":2},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"grass","variant":59},{"type":"grass","variant":62},{"type":"grass","variant":51},{"type":"grass","variant":15},{"type":"grass","variant":23},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"tree","variant":9},{"type":"tree","variant":9}],[{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"grass","variant":84},{"type":"grass","variant":64},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"grass","variant":49},{"type":"grass","variant":28},{"type":"grass","variant":67},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18},{"type":"tree","variant":18}],[{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"grass","variant":73},{"type":"grass","variant":52},{"type":"grass","variant":5},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"grass","variant":91},{"type":"grass","variant":61},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81},{"type":"tree","variant":81}],[{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"grass","variant":35},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"grass","variant":57},{"type":"grass","variant":90},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61},{"type":"tree","variant":61}],[{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"grass","variant":59},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"grass","variant":58},{"type":"grass","variant":69},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54},{"type":"tree","variant":54}],[{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"grass","variant":40},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"grass","variant":45},{"type":"grass","variant":77},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"grass","variant":39},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42},{"type":"tree","variant":42}],[{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"grass","variant":47},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"grass","variant":29},{"type":"grass","variant":57},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"grass","variant":33},{"type":"grass","variant":88},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4},{"type":"tree","variant":4}],[{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"grass","variant":59},{"type":"grass","variant":95},{"type":"grass","variant":96},{"type":"grass","variant":3},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"grass","variant":19},{"type":"grass","variant":30},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11},{"type":"tree","variant":11}],[{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"grass","variant":68},{"type":"grass","variant":48},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85},{"type":"tree","variant":85}],[{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"grass","variant":52},{"type":"grass","variant":63},{"type":"grass","variant":20},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2},{"type":"tree","variant":2}],[{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"grass","variant":50},{"type":"grass","variant":47},{"type":"grass","variant":40},{"type":"grass","variant":58},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7},{"type":"tree","variant":7}],[{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"grass","variant":58},{"type":"grass","variant":88},{"type":"grass","variant":7},{"type":"grass","variant":40},{"type":"grass","variant":60},{"type":"grass","variant":80},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17},{"type":"tree","variant":17}],[{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"grass","variant":68},{"type":"grass","variant":88},{"type":"grass","variant":72},{"type":"grass","variant":39},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63},{"type":"tree","variant":63}],[{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16},{"type":"tree","variant":16}],[{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88},{"type":"tree","variant":88}],[{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69},{"type":"tree","variant":69}]]

var village_south = new Map(25,25,'village_south')
village_south.terrain = [
new A().w(25).end(),
new A().w(25).end(),
new A().g(9).w(16).end(),
new A().g(11).w(14).end(),
new A().g(12).w(13).end(),
new A().g(12).w(13).end(),
new A().g(13).w(12).end(),
new A().g(13).w(12).end(),
new A().g(8).hutwest().g(3).w(12).end(),
new A().g(8).hutmid(0,1,1).g(3).w(12).end(),
new A().g(8).hutmid(1).g(3).w(12).end(),
new A().g(4).hutwest().g(2).huteast().g(3).w(12).end(),
new A().g(4).hutmid(1).g(8).w(11).end(),
new A().g(4).huteast().g(8).w(11).end(),
new A().g(14).w(11).end(),
new A().g(15).w(10).end(),
new A().g(5).hutwest().g(8).w(10).end(),
new A().g(5).hutmid(0,0,1).g(9).w(9).end(),
new A().g(5).hutmid(1).g(10).w(8).end(),
new A().g(5).hutmid(0,1,1).g(12).w(6).end(),
new A().g(1).hutwest().g(2).huteast().g(5).hutwest().g(6).t(2).w(3).end(),
new A().g(1).hutmid(0,0,1).g(9).hutmid(1,1).g(6).t(5).end(),
new A().g(1).hutmid(1,1).g(9).hutmid(0).g(5).t(6).end(),
new A().g(1).huteast().g(9).huteast().t(11).end(),
new A().t(25).end()
]

var village_north = new Map(25,25,'village_north')
village_north.terrain = [
new A().w(25).end(),
new A().w(25).end(),
new A().w(10).g(15).end(),
new A().w(8).g(17).end(),
new A().w(6).g(19).end(),
new A().w(5).g(20).end(),
new A().w(4).g(21).end(),
new A().w(4).g(21).end(),
new A().w(3).g(15).hutwest().g(5).end(),
new A().w(3).g(9).t(5).g(1).hutmid(1).g(5).end(),
new A().w(3).g(8).t(7).huteast().g(5).end(),
new A().w(3).g(7).t(9).g(6).end(),
new A().w(3).g(7).t(9).hutwest().g(4).end(),
new A().w(4).g(6).t(9).hutmid(0,1,1).g(4).end(),
new A().w(4).g(5).t(10).hutmid(1).g(4).end(),
new A().w(5).g(4).t(10).hutmid(0,0,1).g(4).end(),
new A().w(6).g(3).t(10).huteast().g(4).end(),
new A().w(7).g(2).t(7).g(9).end(),
new A().w(7).g(2).t(6).g(2).t(2).g(6).end(),
new A().w(8).g(1).t(6).g(1).t(3).g(3).hutwest().g(1).end(),
new A().w(8).g(1).t(6).g(1).t(3).g(3).hutmid(1).g(1).end(),
new A().w(8).g(2).t(5).g(1).t(4).g(2).hutmid(0,1,1).g(1).end(),
new A().w(9).g(1).t(5).g(1).t(4).g(2).huteast().g(1).end(),
new A().w(9).g(1).t(5).g(1).t(5).g(4).end(),
new A().w(9).g(1).t(5).g(1).t(5).g(2).t(2).end()
]

area1 = village_south
area2 = village_north

area1.north = area2
area2.south = area1
area2.east = area3
area3.west = area2
area3.south = area4
area4.north = area3
area1.east = area4
area4.west = area1

var npc1 = area1.createNPC(11,10)
var conv = npc1.conversation
conv.addLine('youreawake', "Ah, you're awake!")
conv.setOpeningLine('youreawake')
conv.setChoice('youreawake','yes','where',"I seem to be. Where am I?")
conv.setChoice('youreawake','no','what',"I think so. What happened?")
conv.addLine('where',"You're in [south_village]. You washed up on the shore here, a few days ago. You and two others.")
conv.setChoice('where','yes','who',"Oh. My twin and me obviously survived. Who's the third?")
conv.setChoice('where','no',false,"Ok ...")
conv.addLine('what',"You were in a shipwreck. We rescued you and two others.")
conv.setChoice('what','yes','who',"Oh! I saw my twin back inside, who's the third?")
conv.setChoice('what','no',false,"Ok ...")
conv.addLine('who',"Your twin, eh? You do look alike, now that you mention it. No matter, the third was a young woman, pretty if I might say so. She woke up the day before yesterday and wanted to help out around here.")
conv.setChoice('who','yes','whereisshe',"That sounds like our younger sister! Where is she now?")
conv.setChoice('who','no',false,"That must be our sister...")
conv.addLine('whereisshe',"Siblings all of you? Who would have guessed. Unfortunately she disappeared last night - along with a few young people from around here")
conv.setChoice('whereisshe','yes',false,"I'd better see if I can find her...")

var npc2 = area2.createNPC(20,15)
npc2.conversation.addLine('greeting', '😑');
npc2.conversation.setOpeningLine('greeting');