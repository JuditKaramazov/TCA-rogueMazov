// Map elements.
var TILES = {
	empty: {
		ch: "",
		color: "#000",
		walkable: false,
		transparent: false
	},
	floor: {
		ch: "·",
		color: "#666",
		walkable: true,
		transparent: true,
		desc: "Empty (just like the rest) floor."
	},
	wall: {
		ch: "#", // █
		color: "#7f97a1",
		walkable: false,
		transparent: false,
		desc: "Sturdy mental wall."
	},
	door_open: {
		ch: "/",
		color: "#064",
		walkable: true,
		transparent: true,
		desc: "Open door."
	},
	door_closed: {
		ch: "+",
		color: "#830",
		walkable: true,
		transparent: false,
		desc: "Closed door. How about getting closer?"
	},
	door_locked: {
		ch: "+",
		color: "#d00",
		walkable: false,
		transparent: false,
		desc: "Locked door."
	},
	airlock: {
		ch: "☖",
		color: "#c65967",
		walkable: true,
		transparent: true,
		desc: "Passage between these seconds of calm and... the other world. I don't even know how to describe that place."
	},
	sand: {
		ch: [":",";"],
		color: [[204, 102, 0], 20],
		walkable: true,
		transparent: true,
		desc: "Sandy ground."
	},
	rockground: {
		ch: [":",";"],
		color: [[128, 128, 128], 20],
		walkable: true,
		transparent: true,
		desc: "Rock ground."
	},
	rockwall: {
		ch: "#",
		color: [[100, 100, 100], 10],
		walkable: false,
		transparent: false,
		desc: "Rocky wall."
	},
	iceground: {
		ch: "∷",
		color: [[200, 255, 255], 20],
		walkable: true,
		transparent: true,
		desc: "Icy ground."
	},
	icewall: {
		ch: "#",
		color: [[44, 163, 163], 20],
		walkable: false,
		transparent: false,
		desc: "Icy wall."
	},
	rock: {
		ch: "○",
		color: "#f40",
		walkable: true,
		transparent: true,
		desc: "Crater."
	},
	rock2: {
		ch: "▰",
		color: "#c50",
		walkable: false,
		transparent: true,
		desc: "Rock."
	},
	rock3: {
		ch: "◾",
		color: "#c50",
		walkable: false,
		transparent: true,
		desc: "Big boulder."
	},
	rock4: {
		ch: ["▟","▙"],
		color: "#d00",
		walkable: false,
		transparent: false,
		desc: "Large rock formation. Spikes, spikes, spikes..."
	},
	cave: {
		ch: "☖",
		color: "#7f97a1",
		walkable: true,
		transparent: true,
		desc: "Mental entrance. A real entrance? What's the difference?"
	},
	hill: {
		ch: "▴",
		color: [[255, 100, 0], 20],
		walkable: true,
		transparent: true,
		desc: "Hills. Calming, somehow."
	},
	mountain: {
		ch: "▲",
		color: [[255, 50, 0], 10],
		walkable: false,
		transparent: false,
		desc: "Impassable mountains."
	},
	// Devices.
	oxygenator: {
		name: "Oxygenator", ch: "♼", color: "#12b9dd",
		resource: "oxygen", amount: 200, intake: "ice", device: true,
		walkable: false,
		transparent: true,
		desc: "Oxygenator. Produces oxygen from ice, or so they told you once."
	},
	dispensator: {
		name: "Lithium dispensator", ch: "☢", color: "#fc0",
		resource: "energy", amount: 200, intake: "lithium", device: true,
		walkable: false,
		transparent: true,
		desc: "Lithium dispensator. The resulting material alters your brain chemicals, making you feel 'better'. Bring lithium."
	},
	bench: {
		name: "Bench", ch: "⚒", color: "#40c",
		shop: true, amount: 0, intake: "distantmemories", device: true,
		walkable: false,
		transparent: true,
		desc: "A humble, working bench. You might want to craft something here. Something different. Better."
	},
	generateInstance: function(proto) {
		var tile = clone(proto);
		if (tile.ch instanceof Array)
			tile.ch = tile.ch.random();
		if (tile.color instanceof Array)
			tile.color = ROT.Color.toHex(ROT.Color.randomize(tile.color[0], tile.color[1]));
		return tile;
	}
};

var ITEMS = {
	// Weapons.
	bottle: {
		name: "Broken bottle", ch: "⚱", color: "#92dad0", canEquip: true,
		weapon: { accuracy: 0.7, damage: [20,30] },
		desc: "Can be used as a desperate melee weapon."
	},
	bow: {
		name: "Rudimentary bow", ch: "⚴", color: "#e7eef4", canEquip: true,
		weapon: { accuracy: 0.8, damage: [40,70], energy: 5, range: 8 },
		desc: "Quite accurate considering its state. Requires energy to use."
	},
	// Items.
	bandage: {
		name: "Dirty bandage", ch: "⊗", color: "#a66973",
		resource: "suit", amount: 40, canUse: true, canEquip: true, canConsume: true,
		desc: "Patches leaking suits and other imaginary, nocturnal types of skin.",
		cost: 2
	},
	oxygentank: {
		name: "O₂ tank", ch: "✇", color: "#6fc0db",
		resource: "oxygen", amount: 80, canUse: true, canEquip: true,
		desc: "Provides portable oxygen reserves.",
		cost: 7
	},
	pill: {
		name: "Pills", ch: "☷", color: "#06f",
		resource: "energy", amount: 40, canUse: true, canEquip: true,
		desc: "Portable energy source.",
		cost: 5
	},
	medikit: {
		name: "Medikit", ch: "✙", color: "#6aa84f",
		resource: "health", amount: 40, canUse: true, canEquip: true, canConsume: true,
		desc: "Can heal wounds. Not all of them, though.",
		cost: 3
	},
	lithium: {
		name: "Lithium", ch: "▥", color: "#c6a",
		resource: "lithium", amount: 100,
		desc: "Soothing material that the dispensator can transform into the mental energy you so desperately need."
	},
	cryosphere: {
		name: "Frozen water", ch: "▧", color: "#8dd",
		resource: "ice", amount: 100,
		desc: "So cold that it burns. An oxygenator can turn it into oxygen; good for your brain, huh?"
	},
	distantmemories: {
		name: "Distant memories", ch: "✣", color: "#cc4",
		resource: "distantmemories", amount: 1,
		desc: "Visions of better days, allowing you to still create something out of them."
	},
	goalitem: {
		name: "Relieving artifact", ch: "♘", color: "#43a699",
		resource: "goal", amount: 1,
		desc: "Magnificent, tragic object that makes you feel slightly better. Drop 3 of them to the base, and see if it helps."
	},
	// Mobs weapons.
	remorsemelee: {
		name: "Rat bite", canEquip: true, canDrop: false,
		weapon: { accuracy: 0.5, damage: [3,10] }
	},
	compulsionmelee: {
		name: "Coyote bite", canEquip: true, canDrop: false,
		weapon: { accuracy: 0.6, damage: [7,12] }
	},
	withdrawalmelee: {
		name: "Wolf bite", canEquip: true, canDrop: false,
		weapon: { accuracy: 0.6, damage: [10,20] }
	},
	burnoutmelee: {
		name: "Burnout glimpse", canEquip: true, canDrop: false,
		weapon: { accuracy: 0.7, damage: [15,40] }
	},
	ptsdmelee: {
		name: "PTSD episode", canEquip: true, canDrop: false,
		weapon: { accuracy: 0.5, damage: [17,41] }
	}
}

// MOBS
var MOBS = {
	remorse: {
		name: "Remorse", ch: "r", color: "#425", ai: "hunter",
		health: 30, weapon: ITEMS.remorsemelee, vision: 5 },
	compulsion: {
		name: "Old compulsion", ch: "c", color: "#973", ai: "hunter",
		health: 60, weapon: ITEMS.compulsionmelee, vision: 8 },
	withdrawal: {
		name: "Withdrawal", ch: "w", color: "#987", ai: "hunter",
		health: 80, weapon: ITEMS.withdrawalmelee, vision: 8 },
	burnout: {
		name: "Burnout ashes", ch: "B", color: "#633", ai: "hunter",
		health: 180, weapon: ITEMS.burnoutmelee, vision: 9 },
	ptsd: {
		name: "PTSD waves", ch: "P", color: "#ffccaa", ai: "hunter",
		health: 200, weapon: ITEMS.ptsdmelee, vision: 9 }
};


// Create ids.
(function() {
	for (var i in TILES)
		TILES[i].id = i;
	for (var i in MOBS)
		MOBS[i].id = i;
	for (var i in ITEMS)
		ITEMS[i].id = i;
})()
