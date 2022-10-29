module.exports = function () {
    document.addEventListener("DOMContentLoaded", function () {
        require("./theme")()
        require("./tracking")
    });
}