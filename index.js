'use strict';
const Hapi = require('hapi');
const h2o2 = require('h2o2');
const fromPairs = require('./lib/prelude').fromPairs;
const defaultTo = require('./lib/prelude').defaultTo;

const defaults = {
    host: 'localhost',
    port: 0,
    proxy: []
};

const buildOptions = opts => opts.proxy.map(proxy => ({
    method: proxy.method,
    path: proxy.path,
    handler: {
        proxy: {
            passThrough: defaultTo(true, proxy.passThrough),
            mapUri: function(request, callback) {
                const proxiedURI = proxy.mapRequest(request);
                callback(null, proxiedURI, fromPairs(defaultTo([], proxy.headers)));
            }
        }
    }
}));

const startServer = function startServer(opts, routeOpts) {
    const server = new Hapi.Server();

    server.connection({
        host: opts.host,
        port: opts.port
    });

    server.register({
            register: h2o2
        },
        function startProxy(err) {
            if (err) {
                throw err;
            }
            server.start(() => console.log('server started at:', server.info.uri));
        });

    server.route(routeOpts);
    return server;
};

module.exports = function hapiProxyServer(config) {
    const opts = Object.assign({}, defaults, config);
    const routeOpts = buildOptions(opts);

    return startServer(opts, routeOpts);
};
