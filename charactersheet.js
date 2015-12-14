function CharacterSheet(health, stamina){
	this.inventory = inventory
	this.health = new NumericStat(health)
	this.stamina = new NumericStat(stamina)
	this.elem = document.createElement('segment')
	this.elem.appendChild(document.createTextNode('Health: '))
	this.elem.appendChild(this.health.elem)
	this.elem.appendChild(document.createElement('br'))
	this.elem.appendChild(document.createTextNode('Stamina: '))
	this.elem.appendChild(this.stamina.elem)
}

function NumericStat(max){
	this.max = max
	this.current = max
	this.elem = document.createElement('progress')
	this.elem.setAttribute('value', 1)
}

NumericStat.prototype.alter = function(amount){
	amount = Number(amount)
	this.current = Math.max(0, Math.min(this.max, this.current+amount))
	this.elem.setAttribute('value', this.current/this.max)
}