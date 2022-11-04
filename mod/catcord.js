module.exports = function async(contextBridge) {
    const catcord = {
        managers: {
            theme: {
             initTheme: function (url, name) {
                const element = document.createElement("style")
                element.id = `catcord.theme.manager.${name.toString().toLowerCase().replace(/ /, "-")}`
                element.innerHTML = `@import url('${url}');`
                document.head.appendChild(element)
             },
             deleteTheme: function (name) {
                document.getElementById(`catcord.theme.manager.${name.toString().toLowerCase().replace(/ /, "-")}`).remove()
             }
            },
            plugin: {
                initPlugin: function (url, name) {
                   const element = document.createElement("script")
                   element.id = `catcord.script.manager.${name.toString().toLowerCase().replace(/ /, "-")}`
                   element.src = url
                   element.setAttribute("defer", true)
                   document.head.appendChild(element)
                }
               }
        },
        utility: {
            misc: {
                convertToRGB: function (code = "") {
                    var aRgbHex = code.toString().replace("#", "").match(/.{1,2}/g);
                    var aRgb = [
                        parseInt(aRgbHex[0], 16),
                        parseInt(aRgbHex[1], 16),
                        parseInt(aRgbHex[2], 16)
                    ];
                    return aRgb;
                }
            }
        }
    }

    window.catcord = catcord

    contextBridge.exposeInMainWorld('catcord', catcord)

    require("./js/_")()
}