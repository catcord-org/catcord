// Updating checking
(async () => {
    let cv = await fetch(catcord.utility.catcord_dir + "\\package.json")
    cv = await cv.json()

    let nv = await fetch(`https://raw.githubusercontent.com/catcord-org/catcord/main/package.json?${Date.now()}`)
    nv = await nv.json()

    if (nv.version > cv.version) {
        catcord.utility.ipc.sendSync("catcord_update")
        location.reload()
    }
})()
