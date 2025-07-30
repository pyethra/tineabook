const path = require('path');

module.exports = {
  watchFolders: [
    path.resolve(__dirname, '../'), // inclui a pasta 'app' para o Metro monitorar
  ],
  resolver: {
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(__dirname, `../node_modules/${name}`),
    }),
  },
};
