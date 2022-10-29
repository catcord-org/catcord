const { readdirSync } = require('fs');
const { join } = require("path");
const catcord = require('../catcord');

module.exports = function () {
    const path = join(__dirname, "..", "..", "themes")
    readdirSync(path).forEach(function (themeFile) {
        console.log(themeFile)
        console.log(join(path, themeFile))
        if (themeFile.endsWith('.json')) {
            const theme = require(join(path, themeFile));
            window.catcord.managers.theme.initTheme(theme.url, theme.name)
        }
    });
}