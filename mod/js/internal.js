const { readdirSync } = require('fs');
const { join } = require("path");

module.exports = function () {
    const path = join(__dirname, "..", "internal")
    readdirSync(path).forEach(function (pluginFile) {
        const pluginPath = join(path, pluginFile)
        console.log(pluginFile)
        if (pluginFile.endsWith('.js')) {
            console.log(pluginFile)
            window.catcord.managers.plugin.initPlugin(`file://${pluginPath}`, pluginFile.replace("js","internal"))
        }
    });
}