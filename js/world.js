let debugDisplay

function World() {
	"use strict"
	this.camera = { pos: [0, 0], center: [0, 0] }
	this.maps = {
		base: new Dungeon("base", "base"),
		overworld: new Dungeon("overworld", "overworld")
	}
	this.dungeon = this.maps.base
	this.currentActorIndex = 0
	this.roundTimer = 0
	this.running = true

	if (debugDisplay)
		for (let j = 0; j < this.dungeon.height; ++j)
			for (let i = 0; i < this.dungeon.width; ++i)
				if (!this.dungeon.map[i + j * this.dungeon.width].walkable)
					debugDisplay.draw(i, j, "#")
}

World.prototype.update = function() {
	if (Date.now() < this.roundTimer || !this.running)
		return
	while (this.dungeon.actors.length) {
		if (this.currentActorIndex >= this.dungeon.actors.length)
			this.currentActorIndex = 0
		var actor = this.dungeon.actors[this.currentActorIndex]
		if (!actor.act()) break
		actor.stats.turns++
		if (actor.health <= 0) {
			this.dungeon.actors.splice(this.currentActorIndex, 1)
			if (actor == ui.actor) {
				this.running = false
				ui.die()
				return
			}
		} else this.currentActorIndex++
		this.dungeon.update()
		if (actor == ui.actor) {
			actor.updateVisibility()
			break
		}
	}
	this.roundTimer = Date.now() + 100
}

World.prototype.changeMap = function(actor, entrance) {
	removeElem(this.dungeon.actors, actor)
	this.dungeon.start = clone(actor.pos)
	this.dungeon.playerFov = actor.fov
	if (!this.maps[entrance.mapId]) {
		this.maps[entrance.mapId] = new Dungeon(entrance.mapId, entrance.mapType)
	}
	this.dungeon = this.maps[entrance.mapId]
	this.dungeon.actors.push(actor)
	actor.pos[0] = this.dungeon.start[0]
	actor.pos[1] = this.dungeon.start[1]
	actor.fov = this.dungeon.playerFov
	actor.updateVisibility()
	playEntranceEffect()
	this.currentActor = null
	if (this.dungeon.mobProtos.length && this.dungeon.actors.length < 5) {
		this.dungeon.spawnMobs(randInt(4, 7))
	}
}
