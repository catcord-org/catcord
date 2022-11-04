window.catcordWebpack = {
    cache: webpackChunkdiscord_app.push([[Symbol()], {}, e => e.c]),
 
    getModule: (filter, all = false, traverseExports = false) => {
       if (typeof filter !== 'function') {
          return void 0;
       }
 
       const found = [];
       const search = function (module, index) {
          try {
             return filter(module, index);
          } catch {
             return false;
          }
       };
 
       for (const id in catcordWebpack.cache) {
          const mdl = catcordWebpack.cache[id].exports;
          if (!mdl || mdl === window) continue;
 
          if (typeof mdl === 'object') {
             if (search(mdl, id)) {
                if (!all) return mdl;
                found.push(mdl);
             }
 
             if (mdl.__esModule && mdl.default && search(mdl.default, id)) {
                const value = mdl.default;
 
                if (!all) return value;
                found.push(value);
             }
 
             if (traverseExports && mdl.__esModule) {
                for (const key in mdl) {
                   if (!mdl[key]) continue;
 
                   if (search(mdl[key], id)) {
                      if (!all) return mdl[key];
                      found.push(mdl[key]);
                   }
                }
             }
          } else if (typeof mdl === 'function') {
             if (!search(mdl, id)) continue;
             if (!all) return mdl;
             found.push(mdl);
          }
       }
 
       return all ? found : found[0];
    },
 
    getByProps: (...mdls) => {
       return catcordWebpack.getModule(mdl => mdls.every(k => mdl[k] !== void 0));
    },
 
    getByDisplayName: (name) => {
       return catcordWebpack.getModule(m => m.default?.displayName === name);
    }
 };