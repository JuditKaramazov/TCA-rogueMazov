function Actor(x, y, def) {
	"use strict"
	def = def || {}
	this.id = def.id || null
	this.name = def.name || "Don't you recognize yourself?"
	this.pos = [x || 0, y || 0]
	this.ch = def.ch || "@"
	this.color = def.color || "#88bec8"
	this.path = []
	this.fov = []
	this.vision = def.vision || 8
	this.inv = []
	if (def.weapon) this.inv.push(new Item(def.weapon))
	this.maxItems = 12
	this.equipped = this.inv.length ? this.inv[0] : null
	this.oxygen = 100
	this.health = def.health || 100
	this.suit = def.ai ? null : 100
	this.suitLeakage = 0
	this.energy = 100
	this.ai = !def.ai ? null : {
		type: def.ai,
		target: null
	}
	this.stats = {
		turns: 0,
		kills: 0,
		oxygen: 0,
		energy: 0
	}
	this.faction = def.ai ? 0 : 1
	this.done = false
}

Actor.prototype.visibility = function(x, y) {
	return this.fov[x + y * world.dungeon.width]
}

Actor.prototype.updateVisibility = function() {
	var dungeon = world.dungeon
	if (this.fov.length != dungeon.map.length)
		this.fov = new Array(dungeon.width * dungeon.height)
	for (var i = 0, l = this.fov.length; i < l; ++i)
		if (this.fov[i] == 1) this.fov[i] = 0.5
		else if (this.fov[i] === undefined) this.fov[i] = 0
	function callback(x, y, r, visibility) {
		if (visibility > 0)
			this.fov[x + y * dungeon.width] = 1
	}
	var fov = new ROT.FOV.PreciseShadowcasting(dungeon.getTransparent.bind(dungeon))
	fov.compute(this.pos[0], this.pos[1], Math.ceil(this.vision * dungeon.env.visionMult), callback.bind(this))
}

Actor.prototype.moveTo = function(x, y) {
	if (x == this.pos[0] && y == this.pos[1]) {
		this.done = true // Skip turn
		return
	}
	var tile = world.dungeon.getTile(x, y)
	if (!tile.walkable && !tile.device) return
	world.dungeon.findPath(x, y, this)
}

Actor.prototype.move = function(dx, dy) {
	this.moveTo(this.pos[0] + dx, this.pos[1] + dy)
}

Actor.prototype.equip = function(item) {
	this.equipped = item
	playItemEffect()
	ui.msg("Equipped " + item.name + ".", this)
}

Actor.prototype.unequip = function(item) {
	if (!item || this.equipped == item)
		this.equipped = null
}

Actor.prototype.use = function(item) {
	if (item.resource) {
		var maxAmount = 100
		if (this[item.resource] >= maxAmount) {
			ui.msg("Skin already full of %s.".format(item.resource), this)
			return
		}
		this[item.resource] += item.amount
		if (this[item.resource] > maxAmount) {
			item.amount = this[item.resource] - maxAmount
			this[item.resource] = maxAmount
		} else item.amount = 0
		if (item.amount <= 0) {
			ui.msg("Emptied %s to skin.".format(item.name), this)
			this.unequip(item)
			if (item.canConsume)
				removeElem(this.inv, item)
		} else {
			ui.msg("Filled skin's %s.".format(item.resource), this)
		}
	}
}

Actor.prototype.drop = function(item) {
	if (!item.canDrop)
		return
	this.unequip(item)
	playItemEffect()
	removeElem(this.inv, item)
	item.pos = clone(this.pos)
	world.dungeon.items.push(item)
	ui.msg("Dropped " + item.name + ".", this)
}

Actor.prototype.unloadResource = function(resource) {
	var i = 0, amount = 0
	while (i < this.inv.length) {
		if (this.inv[i].resource == resource) {
			amount += this.inv[i].amount
			this.inv.splice(i, 1)
		} else i++
	}
	return amount
}

function playAttackSound(isPlayer) {
    if (isPlayer) {
        playAttackedEffect()
    } else {
        playAttackEffect()
    }
}

Actor.prototype.shoot = function(x, y) {
	if (!this.equipped || !this.equipped.weapon) {
		ui.msg("Equip something you can fight with.", this)
		return
	}
	var wp = this.equipped.weapon
	// Range.
	var r = wp.range ? wp.range : 1
	var d = dist(x, y, this.pos[0], this.pos[1])
	if (Math.floor(d) > r) {
		ui.msg("Out of range...", this)
		return
	}
	// Energy.
	if (wp.energy && this.energy < wp.energy) {
		ui.msg("Not enough mental energy to shoot " + this.equipped.name + "; needs at least ⚡" + wp.energy + ".", this)
		return
	}
	this.energy -= wp.energy
	this.stats.energy += wp.energy
	var target = x instanceof Actor ? x : world.dungeon.collide([x, y])
	if (target instanceof Actor) {
		playAttackSound(target === ui.actor)
		// Accuracy.
		if (Math.random() <= this.equipped.weapon.accuracy) {
			var damage = randInt(wp.damage[0], wp.damage[1])
			if (target.suit) {
				var ratio = 0.25 + Math.random() * 0.5
				target.health -= Math.floor((1-ratio) * damage)
				target.suit -= Math.ceil(ratio * damage)
				if (target.suit < 0) target.suit = 0
			} else target.health -= damage
			if (target.health <= 0) {
				target.health = 0
				this.stats.kills++
				ui.msg("You got rid of " + target.name + ".", this)
				ui.msg(this.name + " 'killed' you. In this world, at least.", target)
			} else {
				ui.msg("You hit " + target.name + " for " + damage + "!", this)
				ui.msg(this.name + " hit you for " + damage + "!", target)
			}
		} else {
			ui.msg("You missed " + target.name + ".", this)
			ui.msg(this.name + " missed you.", target)
		}
	} else ui.msg("You didn't hit anything... do something. Do something!", this)
}

Actor.prototype.doPath = function(checkItems, checkWorldChange) {
	if (this.path.length) {
		var waypoint = this.path.shift()
		var thing = world.dungeon.collide(waypoint)
		// Checks enemy.
		if (thing instanceof Actor) {
			this.path = []
			var enemy = thing
			if (this.faction != enemy.faction) {
				this.shoot(thing)
				return true
			}
			return false
		}
		// Checks items.
		if (checkItems && thing instanceof Item && !this.path.length) {
			var item = thing
			if (this.inv.length < this.maxItems) {
				this.inv.push(item)
				removeElem(world.dungeon.items, item)
				playItemEffect()
				ui.msg("Picked up " + item.name + ".", this)
			} else {
				ui.msg("Can't pick up " + item.name + ". Inventory full.", this)
			}
			this.path = []
			return true
		}
		// Checks devices.
		if (checkItems && thing.device) {
			if (thing.resource) {
				this.path = []
				if (thing.intake) {
					var offloading = this.unloadResource(thing.intake)
					if (offloading) {
						thing.amount += offloading
						ui.msg("Offloaded %s %s units.".format(offloading, thing.resource), this)
					}
				}
				if (thing.amount <= 0) {
					ui.msg("%s needs resources to produce %s.".format(thing.name, thing.resource), this)
					return true
				}
				var filled = 0, foundContainer = false
				for (var i = 0; i < this.inv.length && thing.amount > 0; ++i) {
					var invItem = this.inv[i]
					if (invItem.resource == thing.resource) {
						foundContainer = true
						var maxAmount = ITEMS[invItem.id].amount
						var wantAmount = maxAmount - invItem.amount
						if (thing.amount >= wantAmount) {
							filled += wantAmount
							invItem.amount += wantAmount
							thing.amount -= wantAmount
						} else {
							filled += thing.amount
							invItem.amount += thing.amount
							thing.amount = 0
						}
					}
				}
				if (!foundContainer)
					ui.msg("No " + thing.resource + " containers to fill.", this)
				else if (!filled)
					ui.msg("All %s containers are already full. Units left %s.".format(thing.resource, thing.amount), this)
				else
					ui.msg("Refilled %s units of %s. Units left %s.".format(filled, thing.resource, thing.amount), this)
				return true
			} else if (this == ui.actor && thing.shop) {
				thing.amount += this.unloadResource(thing.intake)
				ui.openShop(thing)
				this.path = []
				return false
			}
		}
		this.pos[0] = waypoint[0]
		this.pos[1] = waypoint[1]
		// Checks for map change.
		if (checkWorldChange) {
			var tile = world.dungeon.getTile(this.pos[0], this.pos[1])
			if (tile.entrance && this.path.length === 0) {
				world.changeMap(this, tile.entrance)
			}
		}
		return true
	}
	return false
}

Actor.prototype.envTick = function() {
	var env = world.dungeon.env

	this.suit -= env.suitCost
	if (this.suit < 0)
		this.suit = 0
	if (this.suit < 50) {
		this.suitLeakage = (1 - (this.suit / 50)) * 5
	} else this.suitLeakage = 0

	var oldOxygen = this.oxygen
	if (env.oxygenCost > 0)
		this.oxygen -= env.oxygenCost + this.suitLeakage
	if (this.oxygen <= 0) {
		this.oxygen = 0
		this.health -= 2
		if (this.health <= 0) {
			this.health = 0
			ui.msg("You died due to lack of oxygen to the brain. Again.", this)
		}
	}
	this.stats.oxygen += oldOxygen - this.oxygen
}

Actor.prototype.act = function() {
	if (this.health <= 0)
		return true

	if (this.done) {
		this.done = false
		if (this == ui.actor)
			this.envTick()
		return true
	}

	if (this.ai)
		return this.hunterAI()

	if (this.doPath(true, true)) {
		this.updateVisibility()
		this.envTick()
		return true
	}
	return false
}

Actor.prototype.drunkAI = function() {
	var dx = randInt(-1, 1)
	var dy = randInt(-1, 1)
	var newPos = [this.pos[0] + dx, this.pos[1] + dy]
	if (world.dungeon.getTile(newPos[0], newPos[1]).walkable)
		this.path.push(newPos)
	return true
}

Actor.prototype.hunterAI = function() {
	if (!this.equipped || !this.equipped.weapon)
		return this.drunkAI()
	if (!this.ai.target) {
		var newTarget = ui.actor // TODO: Explore new possibilities.
		this.updateVisibility()
		if (this.visibility(newTarget.pos[0], newTarget.pos[1]) < 1)
			return this.drunkAI()
		this.ai.target = ui.actor
	}
	var target = this.ai.target
	var tx = target.pos[0], ty = target.pos[1]
	var wp = this.equipped.weapon
	var range = wp.range ? wp.range : 0
	if (distSq(this.pos[0], this.pos[1], tx, ty) > range * range) {
		// Pathing.
		this.moveTo(target.pos[0], target.pos[1])
		this.doPath(false, false)
	} else this.path = []
	return true
}
