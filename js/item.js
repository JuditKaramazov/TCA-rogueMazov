function Item(def) {
	"use strict"
	this.id = def.id || null
	this.name = def.name || "Unknown item"
	this.desc = def.desc || ""
	this.ch = def.ch || "?"
	this.color = def.color || "#ccc"
	this.pos = [0, 0]
	this.canCarry = def.canCarry === undefined ? true : def.canCarry
	this.canEquip = def.canEquip || false
	this.canUse = def.canUse || false
	this.canConsume = def.canConsume || false
	this.canDrop = def.canDrop === undefined ? true : def.canDrop
	this.resource = def.resource || null
	this.amount = def.amount || 0
	this.shop = def.shop || false
	this.cost = def.cost || 0
	this.weapon = !def.weapon ? null : {
		accuracy: 0.5,
		range: 0,
		damage: [0,0],
		energy: 0
	}
	for (var i in def.weapon) { this.weapon[i] = def.weapon[i] }
}

Item.prototype.getDescription = function() {
	var desc = this.name
	if (this.desc) desc += ": " + this.desc + " "
	else desc += ". "
	if (this.resource) {
		if (this.amount) desc += "Contains " + this.amount + " units."
		else desc += "Empty."
	}
	return desc
}
