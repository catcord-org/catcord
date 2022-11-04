catcordWebpack.getByProps("AnalyticEventConfigs").default.track = function () { }

__SENTRY__ = {}

const Logger = window.__SENTRY__.logger;
Logger.disable();

const SentryHub = window.DiscordSentry.getCurrentHub();
SentryHub.getClient().close(0);
SentryHub.getStackTop().scope.clear();

for (const method in console) {
    if (!console[method].__sentry_original__) continue;
    console[method] = console[method].__sentry_original__;
}

(function() {
    let origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(data) {
        let url = this.__sentry_xhr__.url;
        let popit = url.split('/').pop().split('?')[0];
        if (['science'].includes(popit) || ['track'].includes(popit)) {
            return false;
        }
        let newurl = new URL(url).hostname;
        if (['sentry.io'].includes(newurl)) {
            return false;
        }
        return origSend.apply(this, arguments);
    };


    let origsetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(data) {
        if (['X-Track', 'X-Fingerprint'].includes(arguments[0])) {
            return false;
        }
        return origsetRequestHeader.apply(this, arguments);
    };

})();