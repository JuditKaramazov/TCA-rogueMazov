var backgroundMusic = document.getElementById("main-music")
var menuMusic = document.getElementById("menu-music")
var menuEffect = document.getElementById("menu-effect")
var isBackgroundMusicPlaying = false
var isMenuMusicPlaying = false

function playBackgroundMusic() {
    if (!isBackgroundMusicPlaying) {
        backgroundMusic.volume = 0.3

        backgroundMusic.play().then(() => {
            backgroundMusic.addEventListener('ended', function () {
                fadeOut(backgroundMusic, 0.5, 5000, function () {
                    backgroundMusic.volume = 0.3
                    fadeIn(backgroundMusic, 1, 1000)
                })
            })

            isBackgroundMusicPlaying = true
        }).catch(error => {
            console.error("Error playing background music:", error)
        })
    }
}

function pauseBackgroundMusic() {
    backgroundMusic.pause()
    isBackgroundMusicPlaying = false
}

function playMenuMusic() {
    menuMusic.currentTime = 0
    menuMusic.volume = 0.2

    menuMusic.play().then(() => {
        menuMusic.addEventListener('ended', function () {
            fadeOut(menuMusic, 0.4, 9000, function () {
                menuMusic.volume = 0.3
                fadeIn(menuMusic, 1, 1000)
            })
        })

        isMenuMusicPlaying = true
    }).catch(error => {
        console.error("Error playing menu music:", error)
    })
}

var buttonIds = [
    "mainmenu-fullscreen",
    "mainmenu-howto",
    "mainmenu-code",
    "mainmenu-bugs",
    "mainmenu-credits",
    "mainmenu-restart"
]

buttonIds.forEach(function (buttonId) {
    var button = document.getElementById(buttonId)
    if (button) {
        button.addEventListener("click", function () {
            if (!isMenuMusicPlaying) {
                playMenuMusic()
            }
            playMenuEffect()
        })
    }
})

function pauseMenuMusic() {
    menuMusic.pause()
    isMenuMusicPlaying = false
}

function playMenuEffect() {
    menuEffect.volume = 0.3
    menuEffect.play().catch(error => {
        console.error("Error playing menu effect:", error)
    })
}

function playEntranceEffect() {
    var entranceEffect = document.getElementById("entrance-effect")
    if (entranceEffect) {
        entranceEffect.volume = 0.5
        entranceEffect.play().catch(error => {
            console.error("Error playing entrance effect:", error)
        })
    }
}

function playItemEffect() {
    var itemEffect = document.getElementById("item-effect")
    if (itemEffect) {
        itemEffect.volume = 0.5
        itemEffect.play().catch(error => {
            console.error("Error playing item effect:", error)
        })
    }
}

function playEquipEffect() {
    var equipEffect = document.getElementById("equip-effect")
    if (equipEffect) {
        equipEffect.volume = 0.5
        equipEffect.play().catch(error => {
            console.error("Error playing equip effect:", error)
        })
    }
}

function playAttackEffect() {
    var attackEffect = document.getElementById("attack-effect")
    if (attackEffect) {
        attackEffect.volume = 0.5
        attackEffect.play().catch(error => {
            console.error("Error playing attack effect:", error)
        })
    }
}

function playAttackedEffect() {
    var attackedEffect = document.getElementById("attacked-effect")
    if (attackedEffect) {
        attackedEffect.volume = 0.5
        attackedEffect.play().catch(error => {
            console.error("Error playing attacked effect:", error)
        })
    }
}

function playDeathEffect() {
    var deathEffect = document.getElementById("death-effect")
    if (deathEffect) {
        deathEffect.volume = 0.1
        deathEffect.play().catch(error => {
            console.error("Error playing death effect:", error)
        })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    backgroundMusic.load()

    document.addEventListener("keydown", function () {
        playBackgroundMusic()
    })

    var gameElement = document.getElementById("game")
    if (gameElement) {
        gameElement.addEventListener("touchstart", function () {
            playBackgroundMusic()
        })
    }

    var mainMenuButton = document.getElementById("mainmenu-open")
    if (mainMenuButton) {
        mainMenuButton.addEventListener("click", function () {
            pauseBackgroundMusic()
            playMenuMusic()
        })
    }

    var mainMenuClose = document.getElementById("mainmenu-close")
    if (mainMenuClose) {
        mainMenuClose.addEventListener("click", function (event) {
            if (event.target.id === "mainmenu-close") {
                pauseMenuMusic()
                playBackgroundMusic()
            }
        })
    }

    var buttonIds = [
        "info-ok", "info-close", "mainmenu-open", "mainmenu", "inventory-open",
        "inventory-close", "look-button", "mainmenu-fullscreen",
        "mainmenu-howto", "mainmenu-code", "mainmenu-bugs",
        "mainmenu-credits", "mainmenu-restart", "stats-open",
        "stats-close", "shop-close", "death-restart"
    ]

    buttonIds.forEach(function (buttonId) {
        var button = document.getElementById(buttonId)
        if (button) {
            button.addEventListener("click", playMenuEffect)
        }
    })
})

// Helper function to fade out.
function fadeOut(audio, targetVolume, duration, callback) {
    var startVolume = audio.volume
    var deltaVolume = targetVolume - startVolume
    var startTime = performance.now()

    function updateVolume() {
        var elapsed = performance.now() - startTime
        if (elapsed < duration) {
            audio.volume = startVolume + (deltaVolume * (elapsed / duration))
            requestAnimationFrame(updateVolume)
        } else {
            audio.volume = targetVolume
            if (callback) callback()
        }
    }

    updateVolume()
}

// Helper function to fade in.
function fadeIn(audio, targetVolume, duration, callback) {
    var startVolume = audio.volume
    var deltaVolume = targetVolume - startVolume
    var startTime = performance.now()

    function updateVolume() {
        var elapsed = performance.now() - startTime
        if (elapsed < duration) {
            audio.volume = startVolume + (deltaVolume * (elapsed / duration))
            requestAnimationFrame(updateVolume)
        } else {
            audio.volume = targetVolume
            if (callback) callback()
        }
    }

    updateVolume()
}
