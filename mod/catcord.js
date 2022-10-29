module.exports = function async() {
    window.catcord = {
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
    require("./js/_")()
}