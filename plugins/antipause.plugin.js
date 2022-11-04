(function() {
    let origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(data) {
        let url = this.__sentry_xhr__.url;
        let popit = url.split('/').pop().split('?')[0];
        if (['pause'].includes(popit)) {
            return false;
        }
        return origSend.apply(this, arguments);
    };
})();