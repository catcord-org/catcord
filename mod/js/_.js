module.exports = function (config) {
    document.addEventListener("DOMContentLoaded", function () {
        require("./theme")(config)
        require("./custom_js")(config)
    });
}