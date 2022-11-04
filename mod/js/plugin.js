const { readdirSync } = require('fs');
const { join } = require("path");

module.exports = function () {
    const path = join(__dirname, "..", "..", "plugins")
    readdirSync(path).forEach(function (pluginFile) {
        const pluginPath = join(path, pluginFile)
        if (pluginFile.endsWith('.plugin.js')) {
            window.catcord.managers.plugin.initPlugin(`file://${pluginPath}`, pluginFile.replace(".plugin.js",""))
        }
    });
}