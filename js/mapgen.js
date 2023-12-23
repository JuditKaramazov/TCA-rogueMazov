Dungeon.prototype.generateBase = function() {
	"use strict"
	this.width = randInt(25, 30)
	this.height = randInt(15, 20)
	this.map = new Array(this.width * this.height)
	var gen = new ROT.Map.Digger(this.width, this.height, {
		roomWidth: [5, 6],
		roomHeight: [4, 5],
		corridorLength: [2, 4],
		dugPercentage: 0.3,
		timeLimit: 3000
	})

	// General base layout.
	gen.create((function(x, y, wall) {
		this.setTile(x, y, wall ? TILES.wall : TILES.floor)
	}).bind(this))
	var rooms = gen.getRooms()
	if (rooms.length < 5 || rooms.length > 6)
		return this.generateBase()
	// Devices
	this.setTile(rooms[1].getCenter()[0], rooms[1].getCenter()[1], clone(TILES.oxygenator))
	this.setTile(rooms[2].getCenter()[0], rooms[2].getCenter()[1], clone(TILES.dispensator))
	this.setTile(rooms[3].getCenter()[0], rooms[3].getCenter()[1], clone(TILES.bench))
	// Doors
	this.doors = []
	for (var i = 0; i < rooms.length; i++) {
		rooms[i].getDoors((function(x, y) {
			this.setTile(x, y, TILES.door_closed)
			this.doors.push({ pos: [x, y], open: false })
		}).bind(this))
	}
	this.start = [ rooms[0].getCenter()[0]-1, rooms[0].getCenter()[1]-1 ]
	// Air lock.
	var airlock = clone(TILES.airlock)
	airlock.entrance = { mapId: "overworld", mapType: "overworld" }
	this.setTile(this.start[0]+1, this.start[1]+1, airlock)
	var gun = new Item(ITEMS.bow)
	gun.pos = [ rooms[0].getRight(), rooms[0].getTop() ]
	this.items.push(gun)

	var freeTiles = []
	for (var y = 0; y < this.height; ++y) {
		for (var x = 0; x < this.width; ++x) {
			if (this.getTile(x, y).ch == TILES.floor.ch)
				freeTiles.push([x, y])
		}
	}
	shuffle(freeTiles)

	// Items.
	var itemChoices = [ ITEMS.oxygentank, ITEMS.medikit, ITEMS.bandage, ITEMS.pill ]
	this.generateItems(randInt(5,6), itemChoices, freeTiles)

	// Main music.
	playBackgroundMusic()
}

Dungeon.prototype.generateOverworld = function() {
	this.env.oxygenCost = 1
	this.env.weatherString = "clear"
	this.env.weatherEnabled = true
	this.width = randInt(80, 100)
	this.height = randInt(60, 80)
	this.map = new Array(this.width * this.height)

	var gen = new ROT.Map.Arena(this.width, this.height)
	// General layout.
	var rocks = [ TILES.rock, TILES.rock2, TILES.rock2, TILES.rock3, TILES.rock3, TILES.rock4 ]
	var noise = new ROT.Noise.Simplex()
	var freeTiles = []
	var caveCandidates = []
	gen.create((function(x, y, wall) {
		var mountainNoise = noise.get(x/20, y/20)
		if (wall || mountainNoise > 0.5) {
			this.setTile(x, y, TILES.generateInstance(TILES.mountain))
		} else if ((x <= 1 || y <= 1 || x >= this.width-2 || y >= this.height-2) && Math.random() < 0.667) {
			this.setTile(x, y, TILES.generateInstance(TILES.mountain))
		} else if ((x <= 2 || y <= 2 || x >= this.width-3 || y >= this.height-3) && Math.random() < 0.333) {
			this.setTile(x, y, TILES.generateInstance(TILES.mountain))
		} else if (mountainNoise > 0.3) {
			this.setTile(x, y, TILES.generateInstance(TILES.hill))
		} else if (mountainNoise > 0.2) {
			this.setTile(x, y, TILES.generateInstance(TILES.hill))
			caveCandidates.push([x, y])
		} else if (rnd() > 0.95) {
			this.setTile(x, y, TILES.generateInstance(rocks.random()))
		} else {
			this.setTile(x, y, TILES.generateInstance(TILES.sand))
			freeTiles.push([x, y])
		}
	}).bind(this))

	shuffle(caveCandidates)
	var caveCount = Math.min(randInt(40, 45), caveCandidates.length)
	for (var i = 0; i < caveCount; ++i) {
		var cave = TILES.generateInstance(TILES.cave)
		var id = this.id + "_cave_" + i
		cave.entrance = { mapId: id, mapType: "cave" }
		var cavePos = caveCandidates.pop()
		this.setTile(cavePos[0], cavePos[1], cave)
	}

	shuffle(freeTiles)
	this.start = freeTiles.pop()
	// Air lock.
	var airlock = clone(TILES.airlock)
	airlock.entrance = { mapId: "base", mapType: "base" }
	this.setTile(this.start[0], this.start[1], airlock)
	// Items & mobs.
	this.mobProtos = [ MOBS.remorse, MOBS.compulsion, MOBS.withdrawal ]
	this.generateItems(randInt(10,15), [ ITEMS.distantmemories ], freeTiles)
	this.generateMobs(randInt(15,25), this.mobProtos, freeTiles)
}

Dungeon.prototype.generateCave = function() {
	this.env.oxygenCost = 1
	this.width = randInt(40, 60)
	this.height = this.width - randInt(5, 15)
	this.map = new Array(this.width * this.height)

	var theme = randInt(0, 2)
	var groundTile = [TILES.iceground, TILES.rockground, TILES.sand][theme]
	var wallTile = [TILES.icewall, TILES.rockwall, TILES.rockwall][theme]
	var items = [[ITEMS.cryosphere], [ITEMS.lithium], [ITEMS.distantmemories]][theme]
	this.mobProtos = [
		[ MOBS.remorse, MOBS.remorse, MOBS.remorse, MOBS.ptsd ],
		[ MOBS.remorse, MOBS.remorse, MOBS.remorse, MOBS.remorse, MOBS.burnout ],
		[ MOBS.remorse, MOBS.remorse, MOBS.remorse, MOBS.compulsion, MOBS.compulsion ]
	][theme]
	var freeTiles = []
	// Basic borders.
	var gen0 = new ROT.Map.Arena(this.width, this.height)
	gen0.create((function(x, y, wall) {
		if (wall) {
			this.setTile(x, y, TILES.generateInstance(wallTile))
		} else if ((x <= 1 || y <= 1 || x >= this.width-2 || y >= this.height-2) && Math.random() < 0.667) {
			this.setTile(x, y, TILES.generateInstance(wallTile))
		} else if ((x <= 2 || y <= 2 || x >= this.width-3 || y >= this.height-3) && Math.random() < 0.333) {
			this.setTile(x, y, TILES.generateInstance(wallTile))
		} else {
			this.setTile(x, y, TILES.generateInstance(groundTile))
		}
	}).bind(this))
	// Cellular middle part.
	var offset = 4
	var numGen = 1
	var gen = new ROT.Map.Cellular(this.width - offset*2, this.height - offset*2, { connected: true })
	gen.randomize(0.5)
	for (var i = 0; i < numGen; ++i)
		gen.create(null)
	gen.create((function(x, y, wall) {
		x += offset; y += offset
		if (wall) {
			this.setTile(x, y, TILES.generateInstance(wallTile))
		} else {
			this.setTile(x, y, TILES.generateInstance(groundTile))
			freeTiles.push([x, y])
		}
	}).bind(this))
	shuffle(freeTiles)
	this.start = freeTiles.pop()
	// Exit.
	var caveExit = clone(TILES.cave)
	caveExit.entrance = { mapId: "overworld", mapType: "overworld" }
	this.setTile(this.start[0], this.start[1], caveExit)
	// Items & mobs.
	this.generateItems(randInt(10,20), items, freeTiles)
	this.generateMobs(randInt(8,20), this.mobProtos, freeTiles)
	// Artifact.
	if (Math.random() <= 0.3) {
		var goalitem = new Item(ITEMS.goalitem)
		goalitem.pos = freeTiles.pop()
		this.items.push(goalitem)
	}
}

Dungeon.prototype.generateItems = function(amount, choices, freeTiles) {
	for (var i = 0; i < amount; ++i) {
		var item = new Item(choices.random())
		item.pos = freeTiles.pop()
		this.items.push(item)
	}
}

Dungeon.prototype.generateMobs = function(amount, choices, freeTiles) {
	for (var i = 0; i < amount; ++i) {
		var pos = freeTiles.pop()
		var mob = new Actor(pos[0], pos[1], choices.random())
		this.actors.push(mob)
	}
}

Dungeon.prototype.spawnMobs = function(count) {
	for (var m = 0; m < count; ++m) {
		for (var i = 0; i < this.map.length; ++i) {
			var x = randInt(3, this.width-3)
			var y = randInt(3, this.height-3)
			if (this.getTile(x, y).walkable) {
				var mob = new Actor(x, y, this.mobProtos.random())
				this.actors.push(mob)
				break
			}
		}
	}
}
