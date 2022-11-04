catcordWebpack.getByProps("AnalyticEventConfigs").default.track = function(){}

__SENTRY__ = {}

const Logger = window.__SENTRY__.logger;
Logger.disable();

const SentryHub =  window.DiscordSentry.getCurrentHub();
SentryHub.getClient().close(0);
SentryHub.getStackTop().scope.clear();

for (const method in console) {
    if (!console[method].__sentry_original__) continue;
    console[method] =  console[method].__sentry_original__;
} 