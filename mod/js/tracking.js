module.exports = (function (open) {
  window.XMLHttpRequest.prototype.open = function (a, url, b, c, d) {
    console.log(url)
    if (url.toString().includes('/science' || '/track' || "sentry.io")) {
      return open.apply(this, null);
    }
    return open.apply(this, arguments);
  };
}(XMLHttpRequest.prototype.open))