
(function (open) {
    window.XMLHttpRequest.prototype.open = function (a, url, b, c, d) {
        if (url.toString().includes('https://api.spotify.com/v1/me/player/pause')) {
            return open.apply(this, null);
        }
        return open.apply(this, arguments);
    };
}(XMLHttpRequest.prototype.open))