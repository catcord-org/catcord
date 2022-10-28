module.exports = function async(ftch) {
    window.catcord = {
        enmity: {
            createStyle: function (json) {
                const _ = json.theme_color_map
                const element = document.createElement("style")
                element.id = "catcord.theme.enmity"
                element.innerHTML = `@import url('https://mwittrien.github.io/BetterDiscordAddons/Themes/DiscordRecolor/DiscordRecolor.css');
    
                :root {
                  --accentcolor: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_ACCENT[0]).join()};
                  --accentcolor2: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_ACCENT[0]).join()};;
                  --linkcolor: ${catcord.utility.misc.convertToRGB(_.TEXT_NORMAL[0]).join()};;
                  --mentioncolor: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_ACCENT[0]).join()};;
                  --textbrightest: ${catcord.utility.misc.convertToRGB(_.TEXT_NORMAL[0]).join()};
                  --textbrighter: ${catcord.utility.misc.convertToRGB(_.TEXT_NORMAL[0]).join()};
                  --textbright: ${catcord.utility.misc.convertToRGB(_.TEXT_NORMAL[0]).join()};
                  --textdark: ${catcord.utility.misc.convertToRGB(_.TEXT_NORMAL[0]).join()};
                  --textdarker: ${catcord.utility.misc.convertToRGB(_.TEXT_NORMAL[0]).join()};
                  --textdarkest: ${catcord.utility.misc.convertToRGB(_.TEXT_MUTED[0]).join()};
                  --font: "Whitney";
                  --backgroundaccent: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_ACCENT[0]).join()};
                  --backgroundprimary: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_PRIMARY[0]).join()};
                  --backgroundsecondary: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_SECONDARY[0]).join()};
                  --backgroundsecondaryalt: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_SECONDARY_ALT[0]).join()};
                  --backgroundtertiary: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_TERTIARY[0]).join()};
                  --backgroundfloating: ${catcord.utility.misc.convertToRGB(_.BACKGROUND_FLOATING[0]).join()};
                  --settingsicons: 1;
                }
                .slateTextArea-27tjG0 {
                    color: var(--textbrightest)
                }`
                document.head.appendChild(element)
            },
            fetchTheme: async function (url) {
                let fetch = await ftch(url)
                return fetch.json()
            },
            initTheme: async function (url) {
                this.createStyle(await this.fetchTheme(url))
            },
            deleteTheme: function () {
                document.getElementById("catcord.theme.enmity").remove()
            }
        },
        theme: {
            initTheme: function (url) {
                const element = document.createElement("style")
                element.id = "catcord.theme.enmity"
                element.innerHTML = `@import url('${url}');`
                document.head.appendChild(element)
            },
            deleteTheme: function () {
                document.getElementById("catcord.theme.custom").remove()
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
    require("./js/_")(require("../config.json"))
}