const whiteList = [
    'PATCH',                                       // Mute/Unmute/notification/cosmetic guild changes
    'DELETE',                                      // Leaving a guild / Deleting messages
    'https://discord.com/api/v9/channels/',        // Text channel address
    'https://discord.com/api/v9/auth/login',       // Login address
    'https://discord.com/api/v9/invites/',         // Accepting guild invite
    'https://discord.com/api/v9/voice/regions',    // Required when creating new guild
    'https://discord.com/api/v9/guilds',           // Creating a guild
    'https://discord.com/api/v9/gateway',          // This may be required to get past login screen if not cached locally
    'https://discord.com/api/v9/interactions',     // Slash Commands
    'https://discord.com/api/v9/applications/',
    'https://discord.com/api/v9/users/'
]

const _whiteList = convertObjToString(whiteList)

document.addEventListener('DOMContentLoaded', () => {

    for (const method in console) {
        if (!console[method].__sentry_original__) continue;
        console[method] = console[method].__sentry_original__;
    }

    (function(open, send) {
        let whiteList = _whiteList
        
        let xhrOpenRequestUrl
        let xhrSendResponseUrl
        let xhrMethod
        let responseData
        let _done = false
        let _block = true
        let _isWhitelisted = false
        const Logger = window.__SENTRY__.logger
        Logger.disable()
        const SentryHub =  window.DiscordSentry.getCurrentHub()
        SentryHub.getClient().close(0)
        SentryHub.getStackTop().scope.clear()
        XMLHttpRequest.prototype.open = function(method, url, async, x, y) {
            xhrMethod = method.toString()
            xhrOpenRequestUrl = url.toString()
            if (xhrOpenRequestUrl.includes("science")) {
                const Logger = window.__SENTRY__.logger
                Logger.disable()
    
                const SentryHub =  window.DiscordSentry.getCurrentHub()
                SentryHub.getClient().close(0)
                SentryHub.getStackTop().scope.clear()
                return open.apply(this, false)
            }
            if (xhrOpenRequestUrl.includes("pause")) {
                return open.apply(this, false)
            }
            whiteList.forEach( wl => {
                if (xhrOpenRequestUrl.includes(wl) || xhrMethod.includes(wl)) {
                    _done = true
                    _block = false
                    _isWhitelisted = true
                    return open.apply(this, arguments)
                }
            })
            if (_done === false) {
                return open.apply(this, false)
            }
        }
        
        XMLHttpRequest.prototype.send = function(data) {
            if (_block === true || _isWhitelisted === false) {
                return send.apply(this, false)
            }
            if (_block === false && _isWhitelisted === true) {
                return send.apply(this, arguments)
            }
        }
    })(XMLHttpRequest.prototype.open, XMLHttpRequest.prototype.send)

});

function convertObjToString(arr) {
    let arrStr = `[`
    arr.forEach(function(i, idx, array){
        let _subStr = i.toString()
        arrStr = arrStr.concat("'").concat(_subStr).concat("'")
        if (idx !== array.length - 1){ 
          arrStr = arrStr.concat(`,`)
        }
    })
    arrStr = arrStr.concat(`]`).toString()
    return arrStr
}