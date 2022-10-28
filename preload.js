let { ipcRenderer } = require('electron');

let originalPreload = ipcRenderer.sendSync('catcord_preload');
if (originalPreload) {
  console.debug('Running original preload');
  require(originalPreload);
}

require(__dirname + "/mod/catcord")(fetch)