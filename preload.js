let { ipcRenderer, contextBridge } = require('electron');

let originalPreload = ipcRenderer.sendSync('catcord_preload');
if (originalPreload) {
  require(originalPreload);
}

require(__dirname + "/mod/catcord")(contextBridge)