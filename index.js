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

module.exports = function hapiProxyServer(config) {
    const server = new Hapi.Server();
    const opts = Object.assign({}, defaults, config);

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

    const routeOpts = opts.proxy.map(function(proxy) {
        return {
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
        };
    });
    server.route(routeOpts);
};
