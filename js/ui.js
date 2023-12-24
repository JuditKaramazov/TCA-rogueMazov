var STATE = {
	GAME: 1,
	LOOK: 2,
	SHOOT: 3,
	SHOP: 4,
	MENU: 5
}

var infoMessages = [
    `They said it wouldn't be so much of a hassle. "Rest".
    Some rest. It's going to take you some rest. That's it: rest.<br><br>
    When you close your eyes, how do things around you taste?
    Can you see the sparkling figures shining, and vanishing, and...?<br><br>
    Can you, too? What's the sound of iron when the rest of the eyes can't be closed?<br><br>
	Some rest.`,
    `They said - who did? Was it me, was it someone else in a...?
	Someone told me to rest. Rest, rest, rest... but that's not how the water flows, is it? <br><br>
	I am afraid I am becoming dangerous to myself - and others. We are.
	Dangerous to ourselves. The many, multiple "us". <br><br>
	There's no difference between day and night anymore. Are my, our eyes closed?`,
    `Rest. Rest. Rest. Easier said than done. Was this my skin of yesterday?
	Iron tastes like lithium, and then the lightning strikes again.<br><br>
	I am not myself. We are not under this heavy, tedious skin of past days.
	Or nights. No difference. We've been blinded by the lights again.`,
    `It's all about endless nights. Did you manage to die already?
	I can feel some drops of shame rolling down my face. A face. Whose?<br><br>
	"No one disturbs her sleep", but that wasn't quite the right state or word.
	No one. Under the gazing lights, days roll back to their center again.<br><br>
	I don't remember the last time I fell asleep. Rest. Just...`,
	`Tonight's skin is full of flowers, like a distant grave no one remembers anymore.
	I've seen a light, somewhere. Distant, too. Light is supposed to rest comfortably in...<br><br>
	Light. Day and night, day and night, day and night - all the same.
	This time, I touched my skin. A blooming, wounded warsong of...`,
	`I can't remember that specific word anymore.<br><br>
	Open your eyes.`,
	`It's getting loud here, right? Silence can be indeed a loud knife, sometimes.
	Then, some echoes. Then, an electric hum. The bitterness of a pill.<br><br>
	It's getting loud out there. I feel tempted to say "here", but I don't know where I am - nor when I am.
	Still, it's unbearably loud. All of you, each one of you... what did you say? `,
	`I used to believe that all these buildings would eventually fall dawn and become one.
	"Did you rest?" I assume I still did, back then. Although they never did fall, I used to...<br><br>
	But they never did. Isn't it terrifying, somehow? What's so normal to our eyes - is it truly normal?
	All those buildings - do they make any sense, under objective analysis?`,
	`I feel in one single language. Whenever I think, I do so in two different ones.
	Dreams, they never speak. It's more like a disturbing, metallic, or crystalline echo.<br><br>
	Dreams, they do terrify me. But we are meant to dream before we close our eyes.`,
	`Yes, indeed. It must be a twisted joke created by a sick, twisted mind.
	I didn't ask for this. I didn't ask for this. No, stop it - I did not ask for this.<br><br>
	What do you even call "rest"? Continuing to be shackled here? Some pills?
	What a twisted joke. Whoever you are, you must be a cruel, deranged...`,
	`I lost count of the many times we died. No matter where I am, it's always the same.
	I don't know when it started, but what's sure is that it never stopped.<br><br>
	My hands - they do not feel like an extension of myself but someone else's. They move.
	They shake. They grab, hold, push, open, close. I see them from above. "I" see.<br><br>
	Someone said you can only exit the labyrinth from above. That's where we are now.
	Above. Like a cruel God, we observe how they shake, grab, hold, push...`,
	`Are you sure? Did it ever stop, or was it simply a blink of an eye?
	Now, let me tell you a secret: is it "you" the only "you"? What is "you"? Who is it?<br><br>
	Right. Those are concepts shackling us to earth as we belong to it, I suppose.
	Did it ever stop? Rest now. Close your eyes and I'll tell you...<br><br>
	Are you sure, though? Ah, right...`,
	`We set some modest goals that couldn't be achieved. That's our biggest problem.
	Modesty, ordinary vanity. They told us about the healing fields once, too.<br><br>
	Do not worry at all, please. Nothing feels quite real anymore to me.
	Once you reach that state, there is no loss, no more worries, no unpaid vital bills.<br><br>
	That, I could achieve it. A small, humble victory amidst the ashes of what's considered "real".
	Now, hush. Up, down... breathe. Left, right... breathe.`,
	`The more you turn your back on them, the larger the shadow they cast.
	I am stronger now, as I learned the hard way. But it's not enough. Was it ever enough?<br><br>
	Perhaps dreams are indeed visions of our memories, but I can't truly see anymore.
	These are not the answers I asked for. This never-ending day, or night... no one asked for it.<br><br>
	Soon, we'll all rest, though. Medically or not, we will all simply....`,
	`The Gods they worshiped died with them - and so did they, after all.
	Who is the dreamer now? I'll ask again: who is the dreamer when there is no dream anymore?`,
	`They emptied our stare. A gaze averted from life; that's what it is now. Ashes to ashes.
	You can try to run, but you've been touched already. Something bigger than you touched you, irremediably.<br><br>
	Perhaps you'd want to find something in the hollows of others' eyes, but it touched you, too.
	Bigger than life. Longer than nights. They emptied our stare, and now...<br><br>
	Come here in the sun. Will they have no power over us here? In the sun. Fading, blank.`,
	`In life's domain, we are nothing but guests. I am warning you.
	Nothing but guests. This is a warning. It is a warning.<br><br>
	Rest. Rest. That's what guests would do. Be my guest, then.<br><br>
	It knows no beginning, no end. Rest. Rest. Rest. Rest. Rest. Rest. Rest. Rest.`,
	`Here we are again: free. Shackled, too.<br><br>
	Free. I assume freedom tastes and smells like iron, after all. Then, we will fall again.<br><br>
	Even words did.`,
	`Welcome back, stranger. Did you ever leave? Ha. Those words still chasing us...
	Do you still hear them, too? With their shapes, and colors, and bleeding teeth, and...`,
	`Again, you and I. It's getting late, but please, do not worry: it'll only take us an entire life.<br><br>
	The question is: how long would you want it to be this time? Don't you remember? Oh, well...
	Let's find out together, then.`,
	`Can you see them, too? The eyes, always watching over. From the sky. From the walls.
	Always watching over. What a peculiar companion we found ourselves.<br><br>
	I can't close mine. They won't close. However, the roof keeps watching.
	The sound keeps watching. And that terrible air.`,
	`I did become a song, and I thought I have found peace. I became all possible words and combinations.
	I closed my eyes, and so did they. But they couldn't heal me in my dream. They couldn't find me in my slumber.`,
	`But it was never meant to be a "goodbye". Would you like it that way?
	Perhaps I would like it, too. "See you tomorrow", well. Can you tell what "tomorrow" is, at this point?<br><br>
	I guess I can't either.`,
	`We can't touch what can be seen; that's why we will never reach each other.
	It is fine like this. It must be, according to...<br><br>
	Tiring. I am tired. Could we please try to see each other? Open, close your...<br><br>
	I am tired.`,
	`No. No, of course not. Didn't you notice? Of course not. Open your eyes: it's not a loop.
	Please, open your eyes. It's not a loop, it's a spiral. Didn't you...? It's not a loop.<br><br>
	It's not a loop. A spiral. Not a loop. It's a spiral. It's not a loop. It is a spiral.`
]


function UI(actor) {
	"use strict"
	var this_ = this
	this.actor = actor
	this.state = STATE.GAME
	this.display = null
	this.messages = []
	this.messagesDirty = false
	this.infoMessageIndex = 0
    this.updateInfoMessage()
	this.selectedInvItem = null
	this.inventoryElems = []
	this.shopInv = [
		new Item(ITEMS.oxygentank), new Item(ITEMS.pill),
		new Item(ITEMS.medikit), new Item(ITEMS.bandage)
	]
	this.shopInv[0].amount = 0
	this.shopInv[1].amount = 0
	this.shop = null
	this.warnings = ["suit", "health", "oxygen", "energy"]
	this.warningsGiven = [false, false, false, false]
	this.won = false

	if (!CONFIG.touch) {
		[].forEach.call(document.querySelectorAll(".btn"), function(elem) {
			elem.addClass("btn-no-touch")
		})
	}

	$("#equipped").addEventListener("click", function() {
		if (this_.state == STATE.SHOOT) {
			$("#equipped").removeClass("btn-selected")
			this_.state = STATE.GAME
			playEquipEffect()
		} else if (this_.actor.equipped) {
			if (this_.actor.equipped.weapon) {
				this_.state = STATE.SHOOT
				$("#equipped").addClass("btn-selected")
				$("#look-button").removeClass("btn-selected")
				$("#look-button").innerHTML = "☌"
				this_.msg("Select target for " + this_.actor.equipped.name + "...")
				playEquipEffect()
			} else this_.actor.use(this_.actor.equipped)
		} else (enterMenu.bind($("#inventory-open")))()
	}, true)

	$("#look-button").addEventListener("click", function() {
		if (this_.state != STATE.LOOK) {
			this_.msg((CONFIG.touch ? "Touch" : "Click") + " and examine, wasn't it?")
			$("#equipped").removeClass("btn-selected")
			$("#look-button").addClass("btn-selected")
			$("#look-button").innerHTML = "✕"
			this_.state = STATE.LOOK
		} else {
			$("#look-button").removeClass("btn-selected")
			$("#look-button").innerHTML = "☌"
			this_.state = STATE.GAME
		}
	}, true)

	function enterMenu() {
		this_.state = STATE.MENU
		this.addClass("btn-selected")
		$("#look-button").removeClass("btn-selected")
		$("#look-button").innerHTML = "☌"
		$(this.dataset.open).style.display = "block"
		this_.updateInventoryScreen()
		this_.updateStatsScreen()
	}
	function exitMenu() {
		this_.state = STATE.GAME
		$("#stats-open").removeClass("btn-selected")
		$("#inventory-open").removeClass("btn-selected")
		$("#mainmenu-open").removeClass("btn-selected")
		$("#look-button").removeClass("btn-selected")
		$(this.dataset.close).style.display = ""
	}

	$("#stats-open").addEventListener("click", enterMenu, true)
	$("#inventory-open").addEventListener("click", enterMenu, true)
	$("#mainmenu-open").addEventListener("click", enterMenu, true)

	$("#stats-close").addEventListener("click", exitMenu, true)
	$("#inventory-close").addEventListener("click", exitMenu, true)
	$("#mainmenu-close").addEventListener("click", exitMenu, true)
	$("#shop-close").addEventListener("click", exitMenu, true)

	$("#info-close").addEventListener("click", function() {
		$("#info").style.display = ""
		window.location.hash = "#game"
		ui.infoMessageIndex = (ui.infoMessageIndex + 1) % infoMessages.length
		ui.updateInfoMessage()
	}, true)
	$("#info-ok").addEventListener("click", function() {
		$("#info").style.display = ""
		window.location.hash = "#game"
		ui.infoMessageIndex = (ui.infoMessageIndex + 1) % infoMessages.length
		ui.updateInfoMessage()
	}, true)
	$("#mainmenu-howto").addEventListener("click", function() {
		$("#info").style.display = "block"
	}, true)
	$("#mainmenu-credits").addEventListener("click", function() {
		window.open("LICENSE.md", "_blank")
	}, true)
	$("#mainmenu-code").addEventListener("click", function() {
		window.open("https://github.com/JuditKaramazov/TCA-rogueMazov", "_blank")
	}, true)
	$("#mainmenu-bugs").addEventListener("click", function() {
		window.open("https://github.com/JuditKaramazov/TCA-rogueMazov/issues", "_blank")
	}, true)
	$("#mainmenu-restart").addEventListener("click", function() {
		window.location.reload()
	}, true)
	$("#death-restart").addEventListener("click", function() {
		window.location.reload()
	}, true)
	$("#win-restart").addEventListener("click", function() {
		window.location.reload()
	}, true)
	$("#win-continue").addEventListener("click", function() {
		this_.state = STATE.GAME
		$("#win-screen").style.display = "none"
	}, true)

	$("#inventory-equip").addEventListener("click", function() {
		this_.actor.equip(this_.selectedInvItem)
	}, true)
	$("#inventory-use").addEventListener("click", function() {
		this_.actor.use(this_.selectedInvItem)
		this_.updateInventoryScreen()
	}, true)
	$("#inventory-drop").addEventListener("click", function() {
		this_.actor.drop(this_.selectedInvItem)
		this_.updateInventoryScreen()
	}, true)
	$("#shop-ok").addEventListener("click", function() {
		if (this_.actor.inv.length < this_.actor.maxItems &&
			this_.shop.amount >= this_.selectedInvItem.cost)
		{
			this_.actor.inv.push(new Item(ITEMS[this_.selectedInvItem.id]))
			this_.shop.amount -= this_.selectedInvItem.cost
		}
		this_.updateShopScreen(this_.actor)
	}, true)

	function toggleFullscreen() {
		if (!document.fullscreenElement && !document.mozFullScreenElement &&
			!document.webkitFullscreenElement && !document.msFullscreenElement)
		{
			var d = document.documentElement
			if (d.requestFullscreen) d.requestFullscreen()
			else if (d.msRequestFullscreen) d.msRequestFullscreen()
			else if (d.mozRequestFullScreen) d.mozRequestFullScreen()
			else if (d.webkitRequestFullscreen) d.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
		} else {
			if (document.exitFullscreen) document.exitFullscreen()
			else if (document.msExitFullscreen) document.msExitFullscreen()
			else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
			else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
		}
	}
	$("#info-fullscreen").addEventListener("click", toggleFullscreen, true)
	$("#mainmenu-fullscreen").addEventListener("click", toggleFullscreen, true)

	if (!window.location.hash.contains("game"))
		$("#info").style.display = "block"

	window.addEventListener('resize', function() { ui.resetDisplay(); ui.render(); })
}

UI.prototype.msg = function(msg, source) {
	if (source === undefined || source == this.actor) {
		this.messages.push(msg)
		this.messagesDirty = true
	}
}

UI.prototype.update = function() {
	if (this.messagesDirty) {
		var msgBuf = ""
		var firstMsg = Math.max(this.messages.length-5, 0)
		var classes = ["msg4", "msg3", "msg2", "msg1", "msg0"]
		if (this.messages.length <= 4) classes.shift()
		if (this.messages.length <= 3) classes.shift()
		if (this.messages.length <= 2) classes.shift()
		if (this.messages.length <= 1) classes.shift()
		for (var i = firstMsg; i < this.messages.length; ++i)
			msgBuf += '<span class="' + classes.shift() + '">' + this.messages[i] + '</span><br/>'
		$("#messages").innerHTML = msgBuf
		this.messagesDirty = false
	}
	$("#hud-suit").innerHTML = Math.ceil(this.actor.suit)
	$("#hud-health").innerHTML = Math.ceil(this.actor.health)
	$("#hud-oxygen").innerHTML = Math.ceil(this.actor.oxygen)
	$("#hud-energy").innerHTML = Math.ceil(this.actor.energy)

	var wThres = 30
	for (var i = 0; i < this.warnings.length; ++i) {
		if (this.actor[this.warnings[i]] > wThres)
			this.warningsGiven[i] = false
		else if (this.actor[this.warnings[i]] <= wThres && !this.warningsGiven[i]) {
			this.warningsGiven[i] = true
			this.msg("Low %s; stay focused!".format(this.warnings[i]))
		}
	}

	if (this.state == STATE.SHOOT) {
		$("#equipped").innerHTML = "✕"
		$("#equipped").style.color = ""
	} else {
		var equipped = this.actor.equipped
		$("#equipped").innerHTML = equipped ? equipped.ch : "⬚"
		$("#equipped").style.color = equipped ? equipped.color : ""
	}
	var cursor = "crosshair"
	if (this.state == STATE.LOOK) cursor = "help"
	else if (this.actor.path.length) cursor = "wait"
	this.display.getContainer().style.cursor = cursor
}

UI.prototype.updateInfoMessage = function () {
    $("#info-main h1").innerHTML = "Again?"
    
    if (this.infoMessageIndex === 0) {
        $("#info-main p").innerHTML = infoMessages[this.infoMessageIndex]
    } else {
        var randomIndex = Math.floor(Math.random() * (infoMessages.length - 1)) + 1
        $("#info-main p").innerHTML = infoMessages[randomIndex]
    }
}

UI.prototype.render = function() {
	this.display.clear()
	var camera = world.camera
	camera.pos[0] = this.actor.pos[0] - camera.center[0]
	camera.pos[1] = this.actor.pos[1] - camera.center[1]
	world.dungeon.draw(camera, this.display, this.actor)
}

UI.prototype.closeMenus = function() {
	$("#stats-close").click()
	$("#inventory-close").click()
	$("#mainmenu-close").click()
}

UI.prototype.resetDisplay = function() {
	var landscape = window.innerWidth >= window.innerHeight
	var spacing = landscape ? 0.8 : 0.9
	var w = Math.floor(window.innerWidth / (landscape ? 50 : 30) / spacing)
	var h = Math.floor(window.innerHeight / 50 / spacing)
	world.camera.center = [(w/2)|0, (h/2)|0]

	if (this.display)
		$("#game").removeChild(this.display.getContainer())

	this.display = new ROT.Display({
		width: w,
		height: h,
		bg: "#111",
		fontSize: 48,
		layout: "rect",
		spacing: spacing,
		fontFamily: CONFIG.fontFamily,
		forceSquareRatio: landscape
	})
	$("#game").appendChild(this.display.getContainer())
	this.display.getContainer().addEventListener("click", input.onClick, true)
}

// Inventory.
UI.prototype.onClickInventoryItem = function(e) {
	ui.inventoryElems.forEach(function(elem) { elem.removeClass("btn-selected") })
	this.addClass("btn-selected")
	var item = ui.selectedInvItem = ui.actor.inv[this.dataset.index]
	if (!item) return
	var desc = item.getDescription()
	if (item == ui.actor.equipped)
		desc += " Currently equipped."
	$("#inventory-details").innerHTML = desc
	$("#inventory-actions").style.display = "block"
	if (item.canEquip) $("#inventory-equip").removeClass("btn-disabled")
	else $("#inventory-equip").addClass("btn-disabled")
	if (item.canUse) $("#inventory-use").removeClass("btn-disabled")
	else $("#inventory-use").addClass("btn-disabled")
	if (item.canDrop) $("#inventory-drop").removeClass("btn-disabled")
	else $("#inventory-drop").addClass("btn-disabled")
}

UI.prototype.updateInventoryScreen = function() {
	var itemsElem = $("#inventory-items")
	itemsElem.innerHTML = ""
	$("#inventory-actions").style.display = "none"
	ui.selectedInvItem = null
	var inv = this.actor.inv
	if (!inv.length) {
		$("#inventory-capacity").innerHTML = "Empty Inventory."
		$("#inventory-details").innerHTML = ""
		return
	}
	$("#inventory-capacity").innerHTML = "Capacity " + inv.length + "/" + this.actor.maxItems
	$("#inventory-details").innerHTML = "Select an item to see further details and actions."

	ui.inventoryElems = []
	for (var i = 0; i < inv.length; ++i) {
		var item = inv[i]
		var elem = document.createElement("div")
		elem.className = "btn btn-square"
		if (!CONFIG.touch) elem.className += " btn-no-touch"
		elem.innerHTML = item.ch
		elem.title = item.name
		elem.style.color = item.color
		elem.dataset.index = i
		elem.addEventListener("click", this.onClickInventoryItem)
		itemsElem.appendChild(elem)
		ui.inventoryElems.push(elem)
	}
}

// Bench (shop).
UI.prototype.onClickShopItem = function(e) {
	ui.inventoryElems.forEach(function(elem) { elem.removeClass("btn-selected") })
	this.addClass("btn-selected")
	var item = ui.selectedInvItem = ui.shopInv[this.dataset.index]
	if (!item) return
	var desc = item.getDescription() + " Cost: " + item.cost
	$("#shop-details").innerHTML = desc
	$("#shop-actions").style.display = "block"
	var canCreate = ui.actor.inv.length < ui.actor.maxItems && item.cost <= ui.shop.amount
	if (canCreate) $("#shop-ok").removeClass("btn-disabled")
	else $("#shop-ok").addClass("btn-disabled")
}

UI.prototype.updateShopScreen = function() {
	$("#shop-actions").style.display = "none"
	ui.selectedInvItem = null
	var itemsElem = $("#shop-items")
	itemsElem.innerHTML = ""
	$("#shop-money").innerHTML = this.shop.amount
	$("#shop-details").innerHTML = "Select an item to produce..."

	ui.inventoryElems = []
	for (var i = 0; i < this.shopInv.length; ++i) {
		var item = this.shopInv[i]
		var elem = document.createElement("div")
		elem.className = "btn btn-square"
		elem.innerHTML = item.ch
		elem.title = item.name
		elem.style.color = item.color
		elem.dataset.index = i
		elem.addEventListener("click", this.onClickShopItem)
		itemsElem.appendChild(elem)
		ui.inventoryElems.push(elem)
	}
}

UI.prototype.openShop = function(tile) {
	$("#shop").style.display = "block"
	this.state = STATE.SHOP
	this.shop = tile
	this.updateShopScreen()
}

// Stats.
UI.prototype.updateStatsScreen = function() {
	$("#stats-suit").innerHTML = Math.ceil(this.actor.suit)
	var leakage = "no leaks"
	if (this.actor.suitLeakage > 0)
		leakage = "leaking %s O₂".format(this.actor.suitLeakage.toFixed(1))
	$("#stats-suit-detail").innerHTML = leakage
	$("#stats-health").innerHTML = Math.ceil(this.actor.health)
	$("#stats-oxygen").innerHTML = Math.ceil(this.actor.oxygen)
	var o2cost = world.dungeon.env.oxygenCost
	//$("#stats-oxygen-usage").innerHTML = o2cost
	$("#stats-oxygen-time").innerHTML = Math.ceil(this.actor.oxygen / (o2cost + ui.actor.suitLeakage))
	$("#stats-energy").innerHTML = Math.ceil(this.actor.energy)
	// Environment
	$("#stats-weather").innerHTML = world.dungeon.env.weatherString
	$("#stats-atmosphere").innerHTML = o2cost ? (-o2cost + " O₂") : "Breathable"
}

UI.prototype.die = function() {
	var stats = ui.actor.stats
	$("#death-turns").innerHTML = Math.round(stats.turns)
	$("#death-kills").innerHTML = Math.round(stats.kills)
	$("#death-oxygen").innerHTML = Math.round(stats.oxygen)
	$("#death-energy").innerHTML = Math.round(stats.energy)
	$("#death-screen").style.display = "block"

	playDeathEffect()
}

UI.prototype.win = function() {
	this.state = STATE.MENU
	var stats = ui.actor.stats
	$("#win-turns").innerHTML = Math.round(stats.turns)
	$("#win-kills").innerHTML = Math.round(stats.kills)
	$("#win-oxygen").innerHTML = Math.round(stats.oxygen)
	$("#win-energy").innerHTML = Math.round(stats.energy)
	$("#win-screen").style.display = "block"
	this.won = true
}

// ROT.js extension.
ROT.Display.prototype.drawTextCentered = function(y, str) {
	var x = (this.getOptions().width * 0.5 - str.length * 0.5)|0
	this.drawText(x, y, str)
}
