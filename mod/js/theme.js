const { readdirSync } = require('fs');
const { join } = require("path");

module.exports = function () {
    const path = join(__dirname, "..", "..", "themes")
    readdirSync(path).forEach(function (themeFile) {
        if (themeFile.endsWith('.theme.json')) {
            const theme = require(join(path, themeFile));
            window.catcord.managers.theme.initTheme(theme.url, theme.name)
        }
    });
}