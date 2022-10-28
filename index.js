let path = require("path");
let electron = require("electron");
let Module = require("module");


let originalPreload;
let preloadEntry = path.join(__dirname, './preload.js');

class BrowserWindow extends electron.BrowserWindow {
    constructor(opts) {
        if (
            !opts ||
            !opts.webPreferences ||
            !opts.webPreferences.preload ||
            !opts.title
        ) return super(opts);

        originalPreload = opts.webPreferences.preload;

        opts.webPreferences.nodeIntegration = true;
        opts.webPreferences.preload = preloadEntry;
        opts.webPreferences.webSecurity = false

        super(opts);

        this.webContents.session
            .webRequest
            .onHeadersReceived(({ responseHeaders }, cb) => {
                for (let key in responseHeaders) {
                    if (!responseHeaders.hasOwnProperty(key)) continue;

                    if (key.startsWith('content-security-policy'))
                        delete responseHeaders[key];
                }

                cb({ responseHeaders });
            });
    }
}

Object.assign(BrowserWindow, electron.BrowserWindow);


electron.ipcMain.on('catcord_preload', (ev) => {
    ev.returnValue = originalPreload;
});

electron.ipcMain.on('catcord_fetch', (ev, url) => {
    fetch(args[0])
        .then(_ => _[args[1]]())
        .then(ev.returnValue)
});



let onReady = () => {
    Object.assign(BrowserWindow, electron.BrowserWindow);

    let electronPath = require.resolve('electron');
    let electronExports = Object.assign({}, electron, { BrowserWindow });

    require.cache[electronPath].exports = electronExports;

    if (require.cache[electronPath].exports !== electronExports) {
        delete require.cache[electronPath].exports;
        require.cache[electronPath].exports = electronExports;
    };
};


let { filename } = module.parent;

if (filename.includes('discord_desktop_core')) {
    onReady();
} else {
    let discordPath = path.join(path.dirname(filename), '../app.asar');
    let discordPkg = require(path.join(discordPath, './package.json'));

    electron.app.setAppPath(discordPath);
    electron.app.name = discordPkg.name;

    electron.app.once('ready', onReady);

    Module._load(path.join(discordPath, discordPkg.main), null, true);
}

const containsAds = (url) => {
    if (/sentry.io/.test(url) || /science/.test(url) || /typing/.test(url)) {
        return false
    } else {
        return false
    }
} 