var input = {
    pressed: [],
    onClick: function(e) {
        var coords = ui.display.eventToPosition(e)
        var x = coords[0] + world.camera.pos[0]
        var y = coords[1] + world.camera.pos[1]

        if (ui.state == STATE.GAME) {
            if (ui.actor.visibility(x, y) > 0.1)
                ui.actor.moveTo(x, y)
        } else if (ui.state == STATE.SHOOT) {
            if (ui.actor.visibility(x, y) > 0.9) {
                ui.actor.shoot(x, y)
                ui.actor.done = true
            }
        } else if (ui.state == STATE.LOOK) {
            if (ui.actor.visibility(x, y) > 0.1) {
                var thing = world.dungeon.collide([x, y])
                var desc = thing.getDescription ? thing.getDescription() : thing.desc
                ui.msg(desc ? desc : (thing.name ? thing.name : "Nothing interesting..."))
            }
        }
    },
    onKeyDown: function(e) {
        input.pressed[e.keyCode] = true
        if (input.pressed[ROT.VK_CONTROL] || input.pressed[ROT.VK_ALT])
            return
        if (e.keyCode >= ROT.VK_F1 && e.keyCode <= ROT.VK_F12)
            return

        if (e.keyCode == ROT.VK_ESCAPE && ui.state == STATE.LOOK)
            $("#look-button").click()
        else if (e.keyCode == ROT.VK_ESCAPE && ui.state != STATE.GAME)
            ui.closeMenus()
        else if (e.keyCode == ROT.VK_ESCAPE)
            $("#mainmenu-open").click()

        if (e.keyCode == ROT.VK_SPACE) {
            ui.closeMenus()
            $("#stats-open").click()
        }
        if (e.keyCode == ROT.VK_I) {
            ui.closeMenus()
            $("#inventory-open").click()
        }

        if (ui.state == STATE.GAME || ui.state == STATE.LOOK || ui.state == STATE.SHOOT) {
            if (e.keyCode == ROT.VK_LEFT || e.keyCode == ROT.VK_NUMPAD4 || e.keyCode == ROT.VK_H)
                ui.actor.move(-1, 0)
            else if (e.keyCode == ROT.VK_RIGHT || e.keyCode == ROT.VK_NUMPAD6 || e.keyCode == ROT.VK_L)
                ui.actor.move(1, 0)
            else if (e.keyCode == ROT.VK_UP || e.keyCode == ROT.VK_NUMPAD8 || e.keyCode == ROT.VK_K)
                ui.actor.move(0, -1)
            else if (e.keyCode == ROT.VK_DOWN || e.keyCode == ROT.VK_NUMPAD2 || e.keyCode == ROT.VK_J)
                ui.actor.move(0, 1)
            else if (e.keyCode == ROT.VK_INSERT || e.keyCode == ROT.VK_NUMPAD7 || e.keyCode == ROT.VK_Y)
                ui.actor.move(-1, -1)
            else if (e.keyCode == ROT.VK_PAGE_UP || e.keyCode == ROT.VK_NUMPAD9 || e.keyCode == ROT.VK_U)
                ui.actor.move(1, -1)
            else if (e.keyCode == ROT.VK_DELETE || e.keyCode == ROT.VK_NUMPAD1 || e.keyCode == ROT.VK_B)
                ui.actor.move(-1, 1)
            else if (e.keyCode == ROT.VK_PAGE_DOWN || e.keyCode == ROT.VK_NUMPAD3 || e.keyCode == ROT.VK_N)
                ui.actor.move(1, 1)
        }
        e.preventDefault()
    },
    onKeyUp: function(e) {
        input.pressed[e.keyCode] = false
    },

    updateKeys: function(actor) { }
}
document.addEventListener('keydown', input.onKeyDown, false)
document.addEventListener('keyup', input.onKeyUp, false)
