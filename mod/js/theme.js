module.exports = function (config) {
if (!config.theme_type) return;
window.catcord[config.theme_type || "theme"].initTheme(config[config.theme_type]);
}